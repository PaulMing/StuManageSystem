import Vue from 'vue'
import Vuex from 'vuex'
import api from './api.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    stuList: [],//学生列表
    page: 1,//分页
    size: 15,
    showModel: false,//编辑浮层
    editUser: {},
    total: 0,
    keyWord: ''
  },
  mutations: {
    // 学生列表
    setStuList(state, list) {
      state.stuList = list
    },
    // 编辑浮层
    setShowModel(state, bool) {
      state.showModel = bool
    },
    setEditUser(state, user = {}) {
      state.editUser = user
    },
    setTotal(state, cont) {
      state.total = cont
    },
    setKeyword(state, word='') {
      state.keyWord = word
    }
  },
  actions: {
    getStuList({commit, state, dispatch}, page = 1) {
      if(state.keyWord !== '') {
        dispatch('searchStu', page)
      } else {
        return api
              .findByPage(page)
              .then(data => {
                commit('setStuList', data.data.data.findByPage)
                commit('setTotal', data.data.data.cont)
              })
              .catch(err => console.log(err))
      }
    },
    updateStu({commit, state}, data) {
      return api
        .updateStu(data)
        .then(msg => {
          if(msg.data.status == 'success') {
            Object.assign(state.editUser, data)
            commit('setShowModel',false)
            commit('setEditUser')
            return msg.data.msg
          } else {
            return Promise.reject(msg.data.msg)
          }
        })
    },
    delBySno({dispatch}, sNo) {
      api
        .delBySno(sNo)
        .then(() => {
          dispatch('getStuList')
          alert('删除成功')
        })
    },
    searchStu({state, commit}, page) {
      api
        .stuSearch(state.keyWord, page) 
        .then(data => {
          commit('setTotal', data.data.data.cont)
          commit('setStuList', data.data.data.searchList)
        })
    }
  }
})
