import { browser } from '$app/environment';
import { getContext, setContext } from 'svelte';

export const ThemeEnum = {
	LIGHT: 'light',
	DARK: 'dark'
} as const;
export type ThemeEnum = (typeof ThemeEnum)[keyof typeof ThemeEnum];

export const THEME_CONTEXT_KEY = Symbol('theme');
export const THEME_CACHE_KEY = 'THEME_MODE';

type ThemeContext = {
	mode: ThemeEnum;
	setTheme: (mode: ThemeEnum) => void;
	toggleTheme: () => void;
};

export function createThemeContext(defaultMode: ThemeEnum): ThemeContext {
	let mode = $state<ThemeEnum>(defaultMode);

	// 设置主题
	function setTheme(newMode: ThemeEnum) {
		if (newMode !== ThemeEnum.LIGHT && newMode !== ThemeEnum.DARK) {
			throw new Error(`无效主题：${newMode}，仅支持 light/dark`);
		}
		mode = newMode;
		document.documentElement.setAttribute('data-theme', newMode);
		localStorage.setItem(THEME_CACHE_KEY, newMode);
	}

	// 切换主题
	function toggleTheme() {
		mode = mode === ThemeEnum.LIGHT ? ThemeEnum.DARK : ThemeEnum.LIGHT;
		setTheme(mode);
	}

	const context: ThemeContext = { mode, setTheme, toggleTheme };
	setContext(THEME_CONTEXT_KEY, context);

	return context;
}

export function useThemeContext() {
	if (!browser) {
		return null;
	}
	const context = getContext<ThemeContext>(THEME_CONTEXT_KEY);
	if (!context) {
		throw new Error('useThemeContext 必须在 createThemeContext 作用域内使用');
	}
	return context;
}
