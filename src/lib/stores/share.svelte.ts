type UserState = {
	name: string;
	age: number;
	/* ... */
};

export const userState: UserState = $state({
	name: 'name',
	age: 18
	/* ... */
});

export function setChangeAge(age: number) {
	userState.age = age;
}

export function setUserState(state: UserState) {
	// userState = { ...state };
	Object.assign(userState, state);
}
