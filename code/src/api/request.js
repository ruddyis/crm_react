
import axios from 'axios'

axios.defaults.baseURL = 'http://192.168.1.90:8080'
axios.defaults.timeout = 3000

// 请求拦截器  非必要
axios.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
// 响应拦截器  非必要
axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)

const Request = {
    get: function (path = '', data = {}) {
      return new Promise(function (resolve, reject) {
        axios
          .get(path, { params: data })
          .then(function (response) {
            resolve(response)
          })
          .catch(function (error) {
            reject(error)
          })
      })
    },
    post: function (path = '', data = {}) {
      return new Promise(function (resolve, reject) {
        axios
          .post(path, data)
          .then(function (response) {
            resolve(response)
          })
          .catch(function (error) {
            reject(error)
          })
      })
    },
    all: function (list) {
      return new Promise(function (resolve, reject) {
        axios
          .all(list)
          .then(
            axios.spread(function (...result) {
              resolve(result)
            })
          )
          .catch(function (error) {
            reject(error)
          })
      })
    },
    patch: function (path = '', data = {}) {
      return new Promise(function (resolve, reject) {
        axios
          .patch(path, data)
          .then(function (response) {
            resolve(response)
          })
          .catch(function (error) {
            reject(error)
          })
      })
    }
  }

export default Request