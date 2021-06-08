




const infoState = {
  newsChannel: [],
  infoLists: {
    current: "0",
    pages: "0",
    records: [],
    searchCount: true,
    size: "10",
    total: "0",
  },
  infoLoading: true,
  infoCommentLists: {
    current: "0",
    pages: "0",
    records: [],
    searchCount: true,
    size: "10",
    total: "0",
  },
  infoCommentLoading: true,

}

const reducer = (state = infoState, action) => {
  const { type, payload } = action


  if (type === 'newsChannel') {
    return { ...state, newsChannel: payload }
  }
  if (type === 'infoLists') {
    return { ...state, infoLists: payload }
  }
  if (type === 'infoLoading') {
    return { ...state, infoLoading: payload }
  }

  if (type === 'infoCommentLoading') {
    return { ...state, infoCommentLoading: payload }
  }

  if (type === 'infoCommentLists') {
    return { ...state, infoCommentLists: payload }
  }
  return state
}



export default reducer


