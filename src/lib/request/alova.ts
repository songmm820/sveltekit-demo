/* eslint-disable @typescript-eslint/no-unused-vars */
import SvelteMessageBox from '$lib/components/message-box';
import { createAlova } from 'alova';
import adapterFetch from 'alova/fetch';
import SvelteHook from 'alova/svelte';
import type { HttpApiResponse } from '$lib/request/http-response';

// 创建 alova 实例
const alovaInstance = createAlova({
	requestAdapter: adapterFetch(),
	// 请求超时时间，单位为毫秒，默认为0，表示永不超时
	timeout: 10000,
	statesHook: SvelteHook,
	cacheFor: {
		// 当设置为`Infinity`，表示数据永不过期，设置为0或负数时表示不缓存
		expire: 0
	},
	responded: {
		onError: (error) => {},
		onSuccess: async (response) => {
			const json = (await response.json()) as HttpApiResponse;
			if (response.status !== 200) {
				SvelteMessageBox.toast({
					message: json?.message || '请求失败',
					status: 'error'
				});
			}
			return json;
		},

		onComplete: async (response) => {}
	},
	beforeRequest: (method) => {
		method.config.headers.token = 'Bearer ' + 'token';
	}
});

export default alovaInstance;
