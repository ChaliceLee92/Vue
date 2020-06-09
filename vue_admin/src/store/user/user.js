import * as mUtils from '@utils/mUtils'

const user = {
    state: {
        browserHeaderTitle: mUtils.getStore('browserHeaderTitle') || '最美诵读'
    },
    getters: {
        browserHeaderTitle: state => state.browserHeaderTitle
    },
    mutations: {
        SET_BROWSERHEADERTITLE: (state, action) => {
            state.browserHeaderTitle = action.browserHeaderTitle
        }
    },
    actions: {}
}

export default user
