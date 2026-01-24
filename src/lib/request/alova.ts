/* eslint-disable no-console */
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
		onError: (error) => {
			console.log(error, '请求失败');
		},
		onSuccess: async (response) => {
			const json = await response.json();
			return json.data;
		},

		onComplete: (response) => {
			console.log(response, '请求完成');
		}
	},
	beforeRequest: (method) => {
		method.config.headers.token = 'Bearer ' + 'token';
	}
});

export default alovaInstance;
