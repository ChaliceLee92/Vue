import { genUpToken } from './qiniuToken';

function getQnToken() {
	let token;
	let policy = {};
	let bucketName = 'prod-recitation';
	let AK = 'jWBwdtM7gNCDlgVCRvn1MvdOoOiFYs0O-CQgt283';
	let SK = '3OgyfpnAx5FxZkbI8Y1Hzta2kye1hGzYgg8c4Eho';
	let deadline = Math.round(new Date().getTime() / 1000) + 3600;
	policy.scope = bucketName;
	policy.deadline = deadline;
	token = genUpToken(AK, SK, policy);
	return token;
}

export { getQnToken };
