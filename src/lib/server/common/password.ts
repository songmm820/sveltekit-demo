import bcrypt from 'bcryptjs'

// 密码盐
const PwdSalt = '$2b$10$wV3VX0x5sXJ8j9V6QZ6Z0u'

/**
 * hash 密码
 *
 * @param password 密码
 */
export async function hashPassword(password: string) {
  return await bcrypt.hash(password, PwdSalt)
}

/**
 * 校验密码
 *
 * @param password 明文密码
 * @param hashedPassword 加密后的密码
 */
export async function comparePassword(password: string, hashedPassword: string) {
  return await bcrypt.compare(password, hashedPassword)
}
