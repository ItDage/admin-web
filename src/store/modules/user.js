import { loginByUsername, logout, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/util/auth'

const user = {
  state: {
    user: window.sessionStorage.getItem('user'),
    status: '',
    email: 'admin',
    code: '',
    gender: 0,
    token: getToken(),
    name: window.sessionStorage.getItem('name'),
    avatar: window.sessionStorage.getItem('avatar'),
    introduction: '',
    roles: [],
    school: '',
    setting: {
      articlePlatform: []
    }
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      window.sessionStorage.setItem('token', token)
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
      window.sessionStorage.setItem('avatar', avatar)
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
      window.sessionStorage.setItem('roles', roles)
    },
    SET_EMAIL: (state, email) => {
      state.email = email
    },
    SET_GENDER: (state, gender) => {
      state.gender = gender
    },
    SET_SCHOOL: (state, school) => {
      state.school = school
    }
  },
  actions: {
    // 用户名登录
    LoginByUsername ({commit}, user) {
      return new Promise((resolve, reject) => {
        loginByUsername(user).then(response => {
          const data = response.data
          commit('SET_TOKEN', data.data)
          setToken(response.data.data)
          if (data.code === 200) {
            resolve()
          } else {
            alert('用户名或密码不正确')
          }
        }).catch(error => {
          reject('error' + error)
        })
      })
    },
    // 获取用户信息
    GetUserInfo ({commit, state}) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(response => {
          if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
            reject('error')
          }
          const data = response.data.data
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: 角色必须是一个非空数组 !')
          }
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          commit('SET_EMAIL', data.email)
          commit('SET_GENDER', data.gender)
          commit('SET_SCHOOL', data.school)
          resolve(response)
        }).catch(error => {
          reject('error')
        })
      })
    },
    LogOut ({commit, state}) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', '')
          removeToken()
          resolve()
        }).catch(error => {
          reject('error' + error)
        })
      })
    }
  }
}
export default user
