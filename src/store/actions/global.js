import API from 'utils/config'
import { qsData, getQsData } from 'utils/service'
import { message } from 'antd'

// const sleepTime = (time = 3000, params) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(params || 'done');
//     }, time);
//   });
// };

export const login = (params = { username: '', password: "" }) => {
  console.log(params)
  const clientParams = {
    client_id: 'dangjian-operate',
    client_secret: '$2a$10$PZgKX2BhAa50CC8.xa4Yxeulwd0jRDrZepRSzR9tsdPUWqNlJEx2.',
    grant_type: 'password'
  }
  return async (dispatch) => {
    try {
      const p = await qsData(API.login, { ...clientParams, ...params })
      console.log(p)
      dispatch({
        type: 'LOGIN',
        payload: p
      })
    } catch (error) {
      const is400 = error.toString().includes('400');
      if (is400) {
        console.log('eee')
        message.error('账号或密码错误....');
      } else {
        message.error('其他错误....');
      }
    }
  }
}

export const getMenuList = () => {
  return async dispatch => {
    try {


      const p = await getQsData(
        API.sidebar
      )
      console.log(p)
      if (p.status) {

        dispatch({ type: 'menuList', payload: p.result })
      } else {
        message.error(p.msg)
      }
    } catch (error) {
      console.log(error)
    }
  }
}