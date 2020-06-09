<template>
	<el-dialog
		v-dialogDrag
		class="select-school"
		title="选择学校"
		:visible.sync="visible"
		width="70%"
		:before-close="handleClose"
		:append-to-body="true"
	>
		<div class="content">
			<div class="content_title">
				<!-- 条件栏 -->
				<TableFilter
					:query.sync="filterInfo.query"
					:filter-list="filterInfo.list"
					:list-type-info="listTypeInfo"
					@handleClick="handleClick"
					@handleEvent="handleEvent"
				/>
				<!-- <span>已选择{{ tags.length }}个学校</span> -->
			</div>
			<!-- 表格 -->
			<TableComponent
				:refresh="tableInfo.refresh"
				:init-curpage="tableInfo.initCurpage"
				:data.sync="tableInfo.data"
				:api="getSchoolList"
				checkBox
				:checkedList="checkList"
				:query="filterInfo.query"
				:field-list="tableInfo.fieldList"
				:list-type-info="listTypeInfo"
				:handle="tableInfo.handle"
				@handleClick="handleClick"
				@handleEvent="handleEvent"
			>
				<!-- 自定义插槽状态按钮 -->
				<template v-slot:bt-select="scope">
					<el-button
						v-if="scope.data.item.show && (!scope.data.item.ifRender || scope.data.item.ifRender(scope.data.row))"
						v-waves
						size="mini"
						:type="scope.data.row.checked ? 'danger' : 'success'"
						:icon="scope.data.item.icon"
						:disabled="scope.data.item.disabled"
						:loading="scope.data.row[scope.data.item.loading]"
						@click="handleClick(scope.data.item.event, scope.data.row)"
					>
						{{ scope.data.row.checked ? '取消' : '添加' }}
					</el-button>
				</template>
			</TableComponent>
		</div>
		<div slot="footer" class="dialog-footer">
			<el-button @click="handleClose">取 消</el-button>
			<el-button type="primary" @click="handleClick('save')">
				确 定
			</el-button>
		</div>
	</el-dialog>
</template>
<script>
import { getSchoolList } from '@/http/interface/school';
import { switchTime } from '@utils/mUtils';

export default {
	name: 'SelectSchool',
	// 注册v-model
	model: {
		prop: 'value',
		event: 'input'
	},
	props: {
		visible: {
			type: Boolean
		},
		checkList: {
			type: Array,
			default: () => {
				return [];
			}
		}
	},
	data() {
		return {
			getSchoolList,
			// 相关筛选列表
			listTypeInfo: {
				statusList: [
					{ key: '启用', value: 1 },
					{ key: '禁用', value: 0 }
				],
				// 来源过滤
				filterSchoolType: [
					{ key: '公办', value: 1 },
					{ key: '民办', value: 2 }
				],
				filterSchoolStage: [
					{ key: '小学', value: 1 },
					{ key: '初中', value: 2 },
					{ key: '高中', value: 3 }
				]
			},

			// 过滤相关配置
			filterInfo: {
				// api 参数
				query: {
					key: ''
				},
				// 控制筛选头部组件的配置
				list: [
					{ type: 'input', label: '搜索学校', value: 'key' },
					{
						type: 'button',
						label: '查询',
						btType: 'primary',
						icon: 'el-icon-search',
						event: 'search',
						show: true
					}
				]
			},
			// 表格相关
			tableInfo: {
				refresh: 1,
				initCurpage: 1,
				data: [],
				fieldList: [
					{ label: '学校名称', value: 'name' },
					{ label: '学校简称', value: 'alias' },
					{ label: '省份名称', value: 'province' },
					{ label: '城市名称', value: 'city' },
					{ label: '县镇名称', value: 'county' },
					{
						label: '学校性质',
						value: 'schoolType',
						list: 'filterSchoolType'
					},
					{
						label: '学校阶段',
						value: 'schoolStage',
						list: 'filterSchoolStage'
					},
					{ label: '学校电话', value: 'mobile' },
					{ label: '备注', value: 'remark' },
					{ label: '添加时间', value: 'createdAt' }
				]
			}
		};
	},
	mounted() {},
	methods: {
		// 按钮点击
		handleClick(event, data) {
			const tableInfo = this.tableInfo;
			const dialogInfo = this.dialogInfo;
			const formInfo = this.formInfo;
			switch (event) {
				// 搜索
				case 'search':
					// 重置分页
					tableInfo.initCurpage = Math.random();
					tableInfo.refresh = Math.random();
					break;
				// 选中保存
				case 'save':
					// 将选择的数据派发出去
					this.$emit('input', this.checkListed);
					// 关闭弹窗
					this.handleClose();

					break;
			}
		},
		// 触发事件
		handleEvent(event, data) {
			switch (event) {
				// 初始化表格数据 对获取到的数据做处理
				case 'list':
					if (!data) return;
					data.forEach(item => {
						// 塞入loading字段用于按钮点击
						this.$set(item, 'statusLoading', false);
						item.createdAt = switchTime(item.createdAt, 'YYYY-MM-DD hh:mm:ss');
						item.updatedAt = switchTime(item.updatedAt, 'YYYY-MM-DD hh:mm:ss');
					});
					break;
				case 'tableCheck':
					this.checkListed = data;
					break;
			}
		},

		// 请求表格数据列表
		getList() {
			this.tableInfo.refresh = Math.random();
		},

		// 初始化表单
		resetForm() {
			this.formInfo.data = {
				name: '', // 学校名称
				alias: '', // 学校别名
				province: '', // 省份
				city: '', // 城市
				county: '', // 县
				schoolType: 1, // 学校性质
				schoolStage: 1, // 学校阶段
				mobile: '', // 学校电话
				remark: '' // 来源
			};
		},

		// 关闭弹窗前的回调
		handleClose(done) {
			this.$emit('update:visible', false);
		}
	}
};
</script>

<style lang="scss" scoped>
.select-school {
}
</style>
