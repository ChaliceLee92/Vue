<template>
	<div class="page-table" :class="className">
		<!-- 显示表格 -->
		<el-table
			ref="table"
			v-loading="listInfo.loading"
			:max-height="listInfo.tableHeight || undefined"
			:data="data"
			border
			style="width:100%"
			@select-all="handleSelectionChange"
			@selection-change="handleSelectionChange"
			:row-key="getRowKeys"
		>
			<!-- 选择框  :reserve-selection="true" 数据回显type必须为 selection 才生效 与row-key配合 -->
			<el-table-column v-if="checkBox" align="center" :key="'selection'" type="selection" width="55" :reserve-selection="true" />
			<!-- 序号 -->
			<el-table-column v-if="tabIndex" :key="'index'" align="center" label="序号" :width="fieldList.length === 0 ? '' : 80" fixed>
				<template v-slot="scope">
					<span>{{ scope.$index + 1 + (listInfo.query.page - 1) * listInfo.query.limit }}</span>
				</template>
			</el-table-column>
			<!-- 列表 支持 自定义列 嵌套表格 标签显示 图片 -->
			<el-table-column
				v-for="(item, index) in fieldList.filter(item => !item.hidden)"
				:key="index"
				:prop="item.value"
				:label="item.label"
				:fixed="item.fixed"
				align="center"
				:width="item.width"
				:min-width="item.minWidth || '100px'"
			>
				<template v-slot="scope">
					<!-- solt 自定义列-->
					<template v-if="item.type === 'slot'">
						<slot :name="'col-' + item.value" :row="scope.row" />
					</template>
					<!-- 嵌套表格 -->
					<template v-else-if="item.children">
						<el-table-column
							v-for="(childItem, childIndex) in item.children"
							:key="childIndex"
							:prop="childItem.value"
							:label="childItem.label"
							align="center"
							:width="item.width"
							:min-width="item.minWidth || '85px'"
						/>
					</template>
					<!-- 标签 -->
					<el-tag v-else-if="item.type === 'tag'">
						{{ scope.row[item.value] }}
					</el-tag>
					<!-- 图片 -->
					<img v-else-if="item.type === 'image' && scope.row[item.value]" v-imgAlart height="50px" :src="scope.row[item.value]" />
					<!-- 其他 -->
					<span v-else>
						{{
							getDataName({
								dataList: listTypeInfo[item.list],
								value: 'value',
								label: 'key',
								data: scope.row[item.value]
							}) || '-'
						}}
					</span>
				</template>
			</el-table-column>
			<!-- 操作列 -->
			<el-table-column
				v-if="!handle.hidden"
				:key="'handle'"
				:fixed="handle.fixed"
				align="center"
				:label="handle.label"
				:width="handle.width"
			>
				<template v-slot="scope">
					<template v-for="(item, index) in handle.btList">
						<!-- 自定义操作类型 -->
						<slot v-if="item.slot" :name="'bt-' + item.event" :data="{ item, row: scope.row }" />
						<!-- 操作按钮 -->
						<el-button
							v-if="!item.slot && item.show && (!item.ifRender || item.ifRender(scope.row))"
							:key="index"
							v-waves
							size="mini"
							:type="item.type"
							:icon="item.icon"
							:disabled="item.disabled"
							:loading="scope.row[item.loading]"
							@click="handleClick(item.event, scope.row)"
						>
							{{ item.label }}
						</el-button>
					</template>
				</template>
			</el-table-column>
		</el-table>
		<!-- 分页组件 -->
		<template v-if="pager">
			<div v-show="!listInfo.loading" class="pagination-container">
				<el-pagination
					:current-page.sync="listInfo.query.page"
					:page-sizes="listInfo.pageSizes"
					:page-size="listInfo.query.limit"
					layout="total, sizes, prev, pager, next, jumper"
					:total="listInfo.total"
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
				/>
			</div>
		</template>
	</div>
</template>

<script>
import { getDataName } from '@utils/mUtils.js';
export default {
	name: 'PageTable',
	props: {
		// 自定义类名
		className: {
			type: String
		},
		// 刷新
		refresh: {
			type: Number
		},
		// 获取数据的接口
		api: {
			type: Function
		},
		// 是否显示序号
		tabIndex: {
			type: Boolean,
			default: false
		},
		// 是否有选择框
		checkBox: {
			type: Boolean,
			default: false
		},
		// 选中列表
		checkedList: {
			type: Array,
			default: () => {
				return [];
			}
		},
		// 类型列表
		listTypeInfo: {
			type: Object
		},
		// 表格字段配置
		fieldList: {
			type: Array,
			default: () => {
				return [];
			}
		},
		// 操作栏配置
		handle: {
			type: Object
		},
		// 是否分页
		pager: {
			type: Boolean,
			default: true
		},
		// 重置当前页
		initCurpage: {
			type: Number
		},
		// 查询条件
		query: {
			type: Object,
			default: () => {
				return {};
			}
		},
		// 列表数据
		data: {
			type: Array
		},
		// 监听高度
		listenHeight: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			getDataName,
			// 列表相关
			listInfo: {
				tableHeight: 0, // 表格最大高度
				total: 0, // 总条数
				loading: false, // 加载动画
				pageSizes: [5, 10, 20, 50, 100], // 分页数量列表
				query: {
					// 查询条件
					page: 1, // 当前页
					limit: 10 // 每页条数
				}
			},

			// 获取row的key值 回显操作 , _id 唯一
			getRowKeys(row) {
				return row._id;
			}
		};
	},
	computed: {},
	watch: {
		initCurpage: {
			immediate: true,
			handler(val) {
				this.listInfo.query.page = 1;
			}
		},
		refresh: {
			immediate: true,
			handler(val) {
				if (!this.api) return;
				this.getList(this.api);
			}
		}
	},
	mounted() {
		// if (this.listenHeight) {
		//     // 得到表格的高度
		//     this.listInfo.tableHeight = this.getTableHeight()
		//     // 监听页面大小改变
		//     window.addEventListener('resize', () => {
		//         // 得到表格的高度
		//         this.listInfo.tableHeight = this.getTableHeight()
		//     })
		// }
	},
	methods: {
		// 处理参数
		handleParams() {
			const obj = {};
			for (const key in this.query) {
				if (this.query[key] || this.query[key] === 0) {
					obj[key] = this.query[key];
				}
			}
			// 如果不需要分页，则无分页相关参数
			return this.pager ? { ...this.listInfo.query, ...obj } : obj;
		},
		// 得到数据
		getList(api) {
			this.listInfo.loading = true;
			return new Promise((resolve, reject) => {
				// 每次调用接口时都自动绑定最新的数据
				api(this.handleParams())
					.then(res => {
						this.listInfo.loading = false;
						if (res.code === 0) {
							// 使外面可以访问到表格数据
							const arr = Array.isArray(res.data) ? res.data : res.data;
							this.$emit('update:data', arr);
							if (this.pager) {
								// 总条数
								this.listInfo.total = res.total;
							}
							// 设置当前选中项 这个回显操作是把数据传出去之后再传回来，再次进入的时候回显数据，跟分页回显不一样
							this.checkedList.forEach(selected => {
								const row = arr.find(item => {
									return item._id === selected._id;
								});
								this.$nextTick(() => {
									if (!row) return;
									this.$refs.table.toggleRowSelection(row, true);
								});
							});
							resolve(res);
							this.$emit('handleEvent', 'list', arr);
						} else {
							this.$message({
								showClose: true,
								message: res.message,
								type: 'error',
								duration: 3500
							});
							reject();
						}
					})
					.catch(() => {
						reject();
						this.listInfo.loading = false;
					});
			});
		},
		handleSizeChange(val) {
			const query = this.listInfo.query;
			query.limit = val; // 每页条数
			query.page = 1; // 每页条数切换，重置当前页
			this.getList(this.api);
		},
		handleCurrentChange(val) {
			this.listInfo.query.page = val; // 当前页
			this.getList(this.api);
		},
		// 派发按钮点击事件
		handleClick(event, data) {
			this.$emit('handleClick', event, data);
		},
		// 选中数据
		handleSelectionChange(rows) {
			this.$emit('handleEvent', 'tableCheck', rows);
		},
		// 根据页面的头部, 功能框, 分页组件等高度，计算出table的高度
		getTableHeight() {
			// 当表格存在的时候才执行操作
			if (document.getElementsByClassName('el-table').length === 0) {
				return;
			}
			const boxH = document.body.clientHeight;
			const navH = document.getElementsByClassName('navbar')[0] ? document.getElementsByClassName('navbar')[0].clientHeight : 0;
			const tagH = document.getElementsByClassName('tags-view-container')[0]
				? document.getElementsByClassName('tags-view-container')[0].clientHeight
				: 0;
			const searchH = document.getElementsByClassName('page-filter')[0]
				? document.getElementsByClassName('page-filter')[0].clientHeight
				: 0;
			const pagerH = document.getElementsByClassName('pagination-container')[0] || { clientHeight: 0 };
			const bottomH = pagerH.clientHeight ? pagerH.clientHeight + 40 : pagerH.clientHeight - 35;
			const tab = document.getElementsByClassName('el-table')[0] || {
				offsetTop: 0
			};
			const tabOffT = tab.offsetTop;

			// 表格的高度 = 视口高度 - 表格到头部导航的距离 - 头部导航的高度137 - 分页组件的高度100 - 分页组件
			document.getElementsByClassName('el-table')[0].style.height = boxH - tabOffT - navH - tagH - searchH - bottomH + 'px';
			console.log('表格最大高度为:' + (boxH - navH - tagH - searchH - bottomH));
			return boxH - navH - tagH - searchH - bottomH;
		}
	}
};
</script>

<style lang="scss" scoped>
// 自定义表格相关
.page-table {
	.pagination-container {
		padding: 15px 0;
	}
}
</style>
