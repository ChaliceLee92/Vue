// 这个文件其实更简单了，通过获取当前项目名来区分根页面的路径
const projectName = require('./projectEnter');
const glob = require('glob');

// 构建多页面 pages 字段
function getEntry(filePath) {
	let entrys = {};

	glob.sync(filePath).forEach(item => {
		let tmp = item.split('/').splice(-3); // splice(-3)取数组后三项

		// 每个页面的入口配置 , 其中 key 必须跟文件夹同名 ，并且建议 不要是用下划线等符号命名
		entrys[tmp[1]] = {
			name: tmp[1],
			pages: {
				[tmp[1]]: {
					entry: 'src/pages/' + tmp[1] + '/' + 'main.js', // 每个 项目的入口 ， 这里默认命名 index.js ， 必须对应
					template: 'src/pages/' + tmp[1] + '/' + 'index.html', //  每个项目的模版来源 ， 这里默认 index.html , 必须对应
					filename: 'index.html', // 在 dist  的输出名称
					title: 'pages-' + tmp[1], // 当使用 title 选项时，template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
					chunks: [
						'chunk-vendors',
						'chunk-common',
						'manifest',
						'styles',
						'chunk-vuetify',
						'chunk-echarts',
						'chunk-elementui',
						tmp[1]
					] // 在这个页面中包含的块，默认情况下会包含提取出来的通用 chunk 和 vendor chunk。
				}
			}
		};
	});

	return entrys;
}

let objectProject = getEntry('./src/pages/**?/*.html');

const configObj = objectProject[projectName.name];

module.exports = configObj;
