
const API = {
  login: '/saas/uaa/oauth/token',
  sidebar: '/saas/uc/operate/permission/menus/',

  tree: '/saas/uc/api/uc-tree/getMultiUcTree',

  infoIndex: '/saas/mgt/api/contentmanagement/getContentInfoList',
  eduChannels: '/saas/edu/api/study/column/getStudySystemColumnList',
  eduContList: '/saas/edu/api/study/content/pageStudyContent',
  newsChannel: '/saas/uc/api/permission/menus/channel',
  // doc
  docCategory: '/saas/mgt/operate/document/category/list',
  docList: '/saas/mgt/operate/document/list/page',

  // info.comment
  infoComment: '/saas/uc/operate/common/comment/search/page',
  // qa.anwsers list
  qaList: '/saas/mgt/operate/answer-mgt/list',
  // qa.topics
  qaTopics: '/saas/mgt/operate/topic-mgt/list',
  // qa.questions
  qaQuestion: '/saas/mgt/operate/question-mgt/list',
  //circles.manage
  circleManage: '/saas/mgt/operate/moments-mgt/list',


}

export default API
