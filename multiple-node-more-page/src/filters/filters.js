exports.AuditStatus = val => {
	switch (val) {
		case 0:
			return '审核';
		case 1:
			return '审核未过';
		case 2:
			return '审核通过';
		default:
			break;
	}
};

exports.operation = val => {
	switch (val) {
		case '账号':
			return '修改';
		case '学校':
			return '';
		case '真实姓名':
			return '补充';
		case '手机号':
			return '绑定';
		case '微信':
			return '绑定';
		case '密码':
			return '修改密码';

		default:
			break;
	}
};
