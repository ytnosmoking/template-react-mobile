


import { storage } from 'utils/tools'

const defaultstate = {
  token: storage.get('token') || null,
  menuList: storage.get('menuList') || []
}



const reducer = (state = defaultstate, action) => {
  const { type, payload } = action
  console.log(action)
  if (type === 'LOGIN') {

    storage.set('token', payload)
    return { ...state, token: payload }
  }
  if (type === 'LOGOUT') {
    storage.del('token')
    return {
      ...state, token: null
    }
  }

  if (type === 'menuList') {
    storage.set('menuList', payload)
    return {
      ...state, menuList: payload
    }
  }


  return state

}

export default reducer