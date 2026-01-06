import { writable, type Writable } from 'svelte/store';
import { getContext, setContext } from 'svelte';

export const THEME_CONTEXT_KEY = Symbol('theme-mode');

export const ThemeMode = {
	LIGHT: 'light',
	DARK: 'dark'
} as const;

export type ThemeModeEnum = (typeof ThemeMode)[keyof typeof ThemeMode];

export type ThemeContext = {
	/**
	 * 主题模式
	 */
	mode: Writable<ThemeModeEnum>;
	/**
	 * 设置主题模式
	 */
	setTheme: (mode: ThemeModeEnum) => void;
	/**
	 * 切换主题模式
	 */
	toggleTheme: () => void;
	/**
	 * 重置主题模式为默认值
	 */
	resetTheme: () => void;
};

/**
 * 创建主题上下文
 *
 * @param defaultMode 默认主题模式
 * @returns 主题上下文
 */
export default function createThemeContext(
	defaultMode: ThemeModeEnum = ThemeMode.LIGHT
): ThemeContext {
	const mode = writable<ThemeModeEnum>(defaultMode);

	/**
	 * 设置主题模式
	 *
	 * @param newMode 主题模式
	 */
	function setTheme(newMode: ThemeModeEnum) {
		mode.set(newMode);
	}

	/**
	 * 切换主题模式
	 */
	function toggleTheme() {
		mode.update((current) => (current === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT));
	}

	/**
	 * 重置主题模式为默认值
	 */
	function resetTheme() {
		mode.set(defaultMode);
	}

	const context: ThemeContext = {
		mode,
		setTheme,
		toggleTheme,
		resetTheme
	};

	setContext<ThemeContext>(THEME_CONTEXT_KEY, context);

	return context;
}

/**
 * 使用主题上下文
 *
 * @returns 主题上下文
 */
export function useThemeContext() {
	const context = getContext<ThemeContext>(THEME_CONTEXT_KEY);

	if (!context) {
		throw new Error('useThemeContext 必须在 createThemeContext 创建的上下文范围内使用');
	}

	return context;
}
