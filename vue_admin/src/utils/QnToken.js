import { genUpToken } from './qiniuToken'

function getQnToken() {
    let token
    let policy = {}
    let bucketName = ''
    let AK = ''
    let SK = ''
    let deadline = Math.round(new Date().getTime() / 1000) + 3600
    policy.scope = bucketName
    policy.deadline = deadline
    token = genUpToken(AK, SK, policy)
    return token
}

export { getQnToken }
