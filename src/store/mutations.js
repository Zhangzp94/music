import * as types from "./mutations_type"
const mutations = {
    [types.SET_SINGER](state,payload) {
        state.singer = payload
    }
}
export  default mutations