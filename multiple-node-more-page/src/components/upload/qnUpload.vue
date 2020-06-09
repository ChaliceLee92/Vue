<template>
	<div class="c-upload-root">
		<!-- 七牛对应空间的存储区域 ： https://developer.qiniu.com/kodo/manual/1671/region-endpoint -->
		<el-upload ref="upload" action="https://up-z2.qiniup.com" :multiple="true" :http-request="uploadFile" v-bind="$attrs">
			<slot></slot>

			<div class="el-upload__tip" slot="tip">
				<slot name="tip"></slot>
			</div>
		</el-upload>
	</div>
</template>

<script>
import * as qiniu from 'qiniu-js';

export default {
	name: 'qn-ele-upload',
	/**
	 * inheritAttrs: false,
	 * 在其它地方调用该组件时，
	 * 可以直接使用 el-upload 组件所提供的所有属性和方法，
	 * 只有 action 和 http-request 两个属性无法修改
	 */
	inheritAttrs: false,
	data() {
		return {};
	},
	props: {
		// 上传凭证
		// 七牛JavaScript SDK API: qiniu.upload(file: blob, key: string, token: string, putExtra: object, config: object) 里的 token
		// 具体参数查看 https://developer.qiniu.com/kodo/manual/1208/upload-token
		qnToken: {
			type: String,
			default: null
		},
		// 七牛JavaScript SDK API: qiniu.upload(file: blob, key: string, token: string, putExtra: object, config: object) 里的 config
		// 具体参数查看 https://developer.qiniu.com/kodo/sdk/1283/javascript#3
		qnConfig: {
			type: Object,
			default() {
				return {
					useCdnDomain: true, // 表示是否使用 cdn 加速域名，为布尔值，true 表示使用，默认为 false。
					disableStatisticsReport: false, // 是否禁用日志报告，为布尔值，默认为false。
					retryCount: 6, //上传自动重试次数
					concurrentRequestLimit: 3, // 分片上传的并发请求量，number，默认为3
					checkByMD5: false, // 是否开启 MD5 校验，为布尔值；默认false 上传视频可以开启
					region: null //选择上传域名区域；当为 null 或 undefined 时，自动分析上传域名区域
				};
			}
		},
		// 七牛JavaScript SDK API: qiniu.upload(file: blob, key: string, token: string, putExtra: object, config: object) 里的 putExtra
		// 具体参数查看 https://developer.qiniu.com/kodo/sdk/1283/javascript#3
		qnPutextra: {
			type: Object,
			default() {
				return {
					fname: '', // 文件原文件名
					params: {}, // 用来放置自定义变量
					mimeType: null // 用来限定上传文件类型，指定null时自动判断文件类型。
				};
			}
		}
	},
	methods: {
		/**
		 * 文件上传方法，使用 七牛SDK 进行上传，覆盖 el-upload 的默认上传方法
		 * @param {Object} option - 包含下列属性：
		 * {
		 *      headers: 使用 el-upload 组件提供的 headers 属性
		 *      withCredentials: 使用 el-upload 组件提供的 headers 属性
		 *      file: 添加到浏览器的 file 对象
		 *      data: 使用 el-upload 组件提供的 data 属性
		 *      filename: 使用 el-upload 组件提供的 name 属性
		 *      action: 使用 el-upload 组件提供的 action 属性
		 *      onProgress: 使用 el-upload 组件提供的 onProgress 属性
		 *      onSuccess: 使用 el-upload 组件提供的 onSuccess 属性
		 *      onError: 使用 el-upload 组件提供的 onError 属性
		 *  }
		 */
		uploadFile(option) {
			const fileName = this.changeFileName(option.file.name);

			const observable = qiniu.upload(option.file, fileName, this.qnToken, this.qnPutextra, this.qnConfig);
			const subscription = observable.subscribe({
				next: option.onProgress,
				error: option.onError,
				complete: option.onSuccess
			});
		},
		// 修改原文件名，给文件名添加一个时间戳
		changeFileName(filename) {
			return filename.replace(/.[a-zA-Z0-9]+$/, match => {
				return `-${Date.now()}${match}`;
			});
		}
	}
};
</script>
