// 登录用户数据

export type LoginUserData = {
	id: string;
	nickName: string;
	email: string;
	remark?: string;
};

export const loginUserStore: {
	user: LoginUserData | null;
} = $state({
	user: null
});

/**
 * 设置登录用户数据
 *
 * @param loginUser 登录用户数据
 */
export function setLoginUser(loginUser: LoginUserData) {
	loginUserStore.user = loginUser;
}
