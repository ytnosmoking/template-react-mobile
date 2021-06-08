import { combineReducers } from 'redux'

const files = require.context('.', false, /\.(js|jsx)$/)

const modules = {}

console.log(files.keys())
files.keys().forEach(key => {
  if (key === './index.js') {
    return
  }
  modules[key.replace(/\.(\/|js|jsx)/g, '')] = files(key).default
})

const reducer = combineReducers(modules)
export default reducer
