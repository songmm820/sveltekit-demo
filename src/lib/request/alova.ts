/* eslint-disable @typescript-eslint/no-unused-vars */
import SvelteMessageBox from '$lib/components/message-box';
import type { HttpApiError } from '$lib/server/common/http-response';
import { createAlova } from 'alova';
import adapterFetch from 'alova/fetch';
import SvelteHook from 'alova/svelte';

// 创建 alova 实例
const alovaInstance = createAlova({
	requestAdapter: adapterFetch(),
	// 请求超时时间，单位为毫秒，默认为0，表示永不超时
	timeout: 10000,
	statesHook: SvelteHook,
	responded: {
		onError: (error) => {},
		onSuccess: async (response) => {
			const json = (await response.json()) as HttpApiError;
			if (response.status !== 200) {
				SvelteMessageBox.toast({
					message: json.message || '请求失败'
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
