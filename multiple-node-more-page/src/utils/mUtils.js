/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.localStorage.setItem(name, content);
};

/**
 * 获取localStorage
 */
export const getStore = name => {
	if (!name) return;
	let value = window.localStorage.getItem(name);
	if (value !== null) {
		try {
			value = JSON.parse(value);
		} catch (e) {
			console.log(e);
		}
	}
	return value;
};

/**
 * 删除localStorage
 */
export const removeStore = name => {
	if (!name) return;
	window.localStorage.removeItem(name);
};

/**
 * 让整数自动保留2位小数
 */
// export const returnFloat = value => {
//     var value=Math.round(parseFloat(value)*100)/100;
//     var xsd=value.toString().split(".");
//     if(xsd.length==1){
//         value=value.toString()+".00";
//         return value;
//     }
//     if(xsd.length>1){
//         if(xsd[1].length<2){
//             value=value.toString()+"0";
//         }
//         return value;
//     }
// }
/**
 * @param {date} 标准时间格式:Fri Nov 17 2017 09:26:23 GMT+0800 (中国标准时间)
 * @param {type} 类型
 *   type == 1 ---> "yyyy-mm-dd hh:MM:ss.fff"
 *   type == 2 ---> "yyyymmddhhMMss"
 *   type == '' ---> "yyyy-mm-dd hh:MM:ss"
 */
export const formatDate = (date, type) => {
	let year = date.getFullYear(); //年
	let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1; //月
	let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); //日
	let hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours(); //时
	let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(); //分
	let seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds(); //秒
	let milliseconds = date.getMilliseconds() < 10 ? '0' + date.getMilliseconds() : date.getMilliseconds(); //毫秒
	if (type == 1) {
		return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds + '.' + milliseconds;
	} else if (type == 2) {
		return year + '' + month + '' + day + '' + hour + '' + minutes + '' + seconds;
	} else if (type == 3) {
		return year + '-' + month + '-' + day;
	} else {
		return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
	}
};
/**
 * 时间转换：20150101010101 --> '2015-01-01 01:01:01'
 */
export const parseToDate = timeValue => {
	let result = '';
	let year = timeValue.substr(0, 4);
	let month = timeValue.substr(4, 2);
	let date = timeValue.substr(6, 2);
	let hour = timeValue.substr(8, 2);
	let minute = timeValue.substr(10, 2);
	let second = timeValue.substr(12, 2);
	result = year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second;
	return result;
};
/**
 * 判断空值
 */
export const isEmpty = keys => {
	if (typeof keys === 'string') {
		//eslint-disable-next-line
        keys = keys.replace(/\"|&nbsp;|\\/g, '').replace(/(^\s*)|(\s*$)/g, '')
		if (keys == '' || keys == null || keys == 'null' || keys === 'undefined') {
			return true;
		} else {
			return false;
		}
	} else if (typeof keys === 'undefined') {
		// 未定义
		return true;
	} else if (typeof keys === 'number') {
		return false;
	} else if (typeof keys === 'boolean') {
		return false;
	} else if (typeof keys == 'object') {
		if (JSON.stringify(keys) == '{}') {
			return true;
		} else if (keys == null) {
			// null
			return true;
		} else {
			return false;
		}
	}

	if (keys instanceof Array && keys.length == 0) {
		// 数组
		return true;
	}
};

/**
 * 返回两位的小数的字符串
 */
export const toFixedNum = num => {
	const tonum = Number(num).toFixed(2);
	return tonum;
};

export const showMessage = () => {
	this.$message({
		showClose: true,
		message: '对不起，您暂无此操作权限~',
		type: 'success'
	});
};

/**
 * 读取base64
 */
export const readFile = file => {
	console.log(file);
	//var file = this.files[0];
	//判断是否是图片类型
	if (!/image\/\w+/.test(file.raw.type)) {
		alert('只能选择图片');
		return false;
	}
	let reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = function(e) {
		let filedata = {
			filename: file.name,
			filebase64: e.target.result
		};
		alert(e.target.result);
	};
};

/**
 * 动态插入css
 */
export const loadStyle = url => {
	const link = document.createElement('link');
	link.type = 'text/css';
	link.rel = 'stylesheet';
	link.href = url;
	const head = document.getElementsByTagName('head')[0];
	head.appendChild(link);
};
/**
 * 设置浏览器头部标题
 */
export const setTitle = title => {
	title = title ? `${title}` : '最美诵读';
	window.document.title = title;
};

export const param2Obj = url => {
	const search = url.split('?')[1];
	if (!search) {
		return {};
	}
	return JSON.parse(
		'{"' +
			decodeURIComponent(search)
				.replace(/"/g, '\\"')
				.replace(/&/g, '","')
				.replace(/=/g, '":"') +
			'"}'
	);
};

//是否为正整数
export const isInteger = s => {
	let re = /^[0-9]+$/;
	return re.test(s);
};

export const setContentHeight = (that, ele, height) => {
	that.$nextTick(() => {
		ele.style.height = document.body.clientHeight - height + 'px';
	});
};

/**
 * 通过key找到在列表中对应的显示
 * @param {Object} obj
 *  @param obj.dataList 数据列表
 *  @param obj.value    数据的值对应的字段名称   例如 'value'
 *  @param obj.label    数据的说明对应的字段名称 例如 'label'
 *  @param obj.data     当前传入的数据值
 * @return name        返回当前传入值在数组中对应的名字
 */
export const getDataName = obj => {
	let name = obj.data;
	if (Array.isArray(obj.dataList) && obj.dataList.length > 0) {
		for (let i = 0; i < obj.dataList.length; i++) {
			if (obj.dataList[i][obj.value] === obj.data) {
				name = obj.dataList[i][obj.label];
			}
		}
	}
	return name;
};

/**
 * 传入时间戳，转换指定的时间格式
 * @param {Number} val      时间戳
 * @param {String} dateType 要得到的时间格式 例如 YYYY-MM-DD hh:mm:ss
 * @return dataStr 例如 YYYY-MM-DD hh:mm:ss
 */
export const switchTime = (val = +new Date(), dateType = 'YYYY-MM-DD hh:mm:ss') => {
	// 将字符串转换成数字
	const timeStamp = +new Date(val);

	// 如果转换成数字出错
	if (!timeStamp) {
		return val;
	}
	let str;
	// 得到时间字符串
	const dateStr = new Date(timeStamp);
	str = dateType.replace('YYYY', dateStr.getFullYear());
	str = str.replace('MM', (dateStr.getMonth() + 1 < 10 ? '0' : '') + (dateStr.getMonth() + 1));
	str = str.replace('DD', (dateStr.getDate() < 10 ? '0' : '') + dateStr.getDate());
	str = str.replace('hh', (dateStr.getHours() < 10 ? '0' : '') + dateStr.getHours());
	str = str.replace('mm', (dateStr.getMinutes() < 10 ? '0' : '') + dateStr.getMinutes());
	str = str.replace('ss', (dateStr.getSeconds() < 10 ? '0' : '') + dateStr.getSeconds());

	return str;
};

/**
 *
 * @param {*} fieldList
 * 初始化表单规则
 */
export const initRules = fieldList => {
	const obj = {};
	// 循环字段列表
	for (const item of fieldList) {
		const type = item.type === 'select' ? '选择' : '输入';
		if (item.required) {
			if (item.validator) {
				obj[item.value] = {
					required: item.required,
					validator: item.validator,
					trigger: 'blur'
				};
			} else {
				obj[item.value] = {
					required: item.required,
					message: '请' + type + item.label,
					trigger: 'blur'
				};
			}
		} else if (item.validator) {
			obj[item.value] = {
				validator: item.validator,
				trigger: 'blur'
			};
		}
	}
	// formInfo.rules = obj
	return obj;
};

/**
 * 将一级的数据结构处理成树状数据结构
 * @param {Object} obj {key, pKey, data}
 *  @param obj.key  字段名称 比如id
 *  @param obj.pKey 父字段名称 比如 pid
 *  @param obj.rootPValue 根节点的父字段的值
 *  @param obj.data 需要处理的数据
 *  @param obj.jsonData 是否深复制数据（默认是true）
 * @return {Array} arr
 */
export const getTreeArr = obj => {
	if (!Array.isArray(obj.data)) {
		console.log('getTreeArr=>请传入数组');
		return [];
	}
	obj.jsonData = obj.jsonData === false ? obj.jsonData : true;
	const arr = obj.jsonData ? JSON.parse(JSON.stringify(obj.data)) : obj.data;
	const arr1 = [];
	// 将数据处理成数状结构
	arr.forEach(item => {
		let index = 0;
		item.children = [];
		arr.forEach(item1 => {
			// 得到树结构关系
			if (item[obj.key] === item1[obj.pKey]) {
				item.children.push(item1);
			}
			// 判断根节点
			if (item1[obj.key] !== item[obj.pKey]) {
				index++;
			}
		});
		// 没传入根节点，根据当前数据结构得到根节点
		if (!('rootPValue' in obj) && index === arr.length) {
			arr1.push(item);
		}
	});
	// 传入根节点，根据传入的根节点组成树结构
	if ('rootPValue' in obj) {
		arr.forEach(item => {
			if (item[obj.pKey] === obj.rootPValue) {
				arr1.push(item);
			}
		});
	}
	return arr1;
};
