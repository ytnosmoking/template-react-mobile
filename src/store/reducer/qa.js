const defaultState = {
  qaLists: {
    current: "0",
    pages: "0",
    records: [],
    searchCount: true,
    size: "10",
    total: "0",
  },
  qaListsLoading: true,
  topicsLists: {
    current: "0",
    pages: "0",
    records: [],
    searchCount: true,
    size: "10",
    total: "0",
  },
  topicsLoading: true,
  questionLists: {
    current: "0",
    pages: "0",
    records: [],
    searchCount: true,
    size: "10",
    total: "0",
  },
  questionLoading: true,

}




const reducer = (state = defaultState, action) => {
  const { type, payload } = action
  if (type === 'qaLists') {
    return {
      ...state, qaLists: payload
    }
  }
  if (type === 'qaListsLoading') {
    return {
      ...state, qaListsLoading: payload
    }
  }
  if (type === 'topicsLists') {
    return {
      ...state, topicsLists: payload
    }
  }
  if (type === 'topicsLoading') {
    return {
      ...state, topicsLoading: payload
    }
  }
  if (type === 'questionLists') {
    return {
      ...state, questionLists: payload
    }
  }
  if (type === 'questionLoading') {
    return {
      ...state, questionLoading: payload
    }
  }









  return state
}

export default reducer