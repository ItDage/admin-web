import { loginByUsername, logout } from '@/api/login'
import { getToken, setToken, removeToken } from '@/util/auth'

const user = {
  state: {
    user: '',
    status: '',
    email: 'admin',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    }
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_EMAIL: (state, email) => {
      state.email = email
    }
  },
  actions: {
    // 用户名登录
    LoginByUsername ({commit}, data) {
      return new Promise((resolve, reject) => {
        loginByUsername(data).then(response => {
          const data = response.data
          commit('SET_TOKEN', data.data)
          setToken(response.data.data)
          // console.log(response.data.data)
          alert(this.$store.state.user.token)
          console.log(response.data.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  },
  LogOut ({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}
export default user
