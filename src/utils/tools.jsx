export const isDev = process.env.NODE_ENV === 'development'


export const checkType = (val, key) => {
  // return Object.prototype.toString.call(val).slice(8, -1) === key
  return Object.prototype.toString.call(val) === `[object ${key}]`
}

// export const isArray = (arr: []) => {
//   return Object.prototype.toString.call(arr).slice(8, -1) === 'Array'
// }
// const isStr = (arr: string) => {
//   return Object.prototype.toString.call(arr).slice(8, -1) === 'String'
// }
// const isObject = (arr: object) => {
//   return Object.prototype.toString.call(arr).slice(8, -1) === 'Object'
// }

export const storage = {
  get(key) {
    const val = localStorage.getItem(key)
    if (val) {
      return JSON.parse(val)
    }
    return val
  },
  // eslint-disable-next-line
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  del(key) {
    localStorage.removeItem(key)
  }
}

export const session = {
  get(key) {
    let val = sessionStorage.getItem(key) || null
    if (val) {
      val = JSON.parse(val)
    }
    return val
  },
  set(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value))
  },
  del(key) {
    sessionStorage.removeItem(key)
  }
}

export const unique = (arr = []) => {
  return Array.from(new Set(arr))
}


export const setCol = (title, key, config = { dataIndex: key }, width = 100) => {
  return {
    title,
    dataIndex: key,
    key,
    ...config,
    width,
  };
};