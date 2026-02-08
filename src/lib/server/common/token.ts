import { SignJWT, jwtVerify, decodeJwt } from 'jose';

// JWT 密钥 min 32 bytes
const JWT_SECRET: string = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6';
// JWT 签名算法
const encodedKey = new TextEncoder().encode(JWT_SECRET);
// 访问令牌过期时间
const ACCESS_TOKEN_EXPIRES_IN: string = '1h';
// 刷新令牌过期时间 30d
const REFRESH_TOKEN_EXPIRES_IN: string = '30d';

// Token 载荷类型
export type JwtPayload = {
	userId: string;
	email: string;
};

/**
 * 生成 JWT 令牌
 *
 * @params payload 载荷
 */
export async function generateToken(payload: JwtPayload, expiresIn: string): Promise<string> {
	try {
		return new SignJWT(payload)
			.setProtectedHeader({ alg: 'HS256' })
			.setIssuedAt()
			.setExpirationTime(expiresIn)
			.sign(encodedKey);
	} catch (error) {
		throw new Error(`生成Token失败: ${error}`);
	}
}

/**
 * 生成刷新令牌
 *
 * @params payload 载荷
 */
export async function generateRefreshToken(payload: JwtPayload): Promise<string> {
	return generateToken(payload, REFRESH_TOKEN_EXPIRES_IN);
}

/**
 * 生成访问令牌
 *
 * @params payload 载荷
 */
export async function generateAccessToken(payload: JwtPayload): Promise<string> {
	return generateToken(payload, ACCESS_TOKEN_EXPIRES_IN);
}

/**
 * 验证 JWT 令牌
 *
 * @params token 令牌
 */
export async function verifyJwtToken(token: string): Promise<JwtPayload | null> {
	try {
		const { payload } = await jwtVerify(token, encodedKey, {
			algorithms: ['HS256']
		});
		return payload as JwtPayload;
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error('verify jwt token error:', error);
		return null;
	}
}

/**
 * 解析Token（不验证签名，仅解析载荷）
 *
 * @param token 令牌
 * @returns 载荷/null
 */
export function decodeToken(token: string): JwtPayload | null {
	try {
		const payload = decodeJwt(token) as JwtPayload;
		// 简单校验核心字段
		return payload.userId && payload.email ? payload : null;
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error('decode jwt token error:', error);
		return null;
	}
}

/**
 * 获取Token过期时间（MySQL datetime格式，直接存入你的expiresAt字段）
 *
 * @param token 令牌
 * @returns 格式化时间字符串/null
 */
export function getTokenExpDatetime(token: string): string | null {
	try {
		const { exp } = decodeJwt(token);
		if (!exp) return null;
		// 转MySQL datetime：YYYY-MM-DD HH:mm:ss
		return new Date(Number(exp) * 1000).toISOString().slice(0, 19).replace('T', ' ');
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error('获取Token过期时间失败:', error);
		return null;
	}
}
