import axios from '../http'

export const login = data => {
    return axios({
        url: '/login',
        method: 'POST',
        data
    })
}
