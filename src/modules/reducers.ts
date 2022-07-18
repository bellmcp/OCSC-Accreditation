import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { loadingBarReducer } from 'react-redux-loading-bar'

import login from 'modules/login/reducer'
import user from 'modules/user/reducer'
import categories from 'modules/categories/reducer'
import courses from 'modules/courses/reducer'
import curriculums from 'modules/curriculums/reducer'
import registrations from 'modules/registrations/reducer'
import learn from 'modules/learn/reducer'
import press from 'modules/press/reducer'
import support from 'modules/support/reducer'
import me from 'modules/me/reducer'
import ui from 'modules/ui/reducer'

import search from 'modules/search/reducer'
import download from 'modules/download/reducer'
import international from 'modules/edu/international/reducer'
import faq from 'modules/faq/reducer'

export default (history: any) =>
  combineReducers({
    router: connectRouter(history),
    loadingBar: loadingBarReducer,
    login,
    user,
    categories,
    courses,
    curriculums,
    registrations,
    learn,
    press,
    support,
    me,
    ui,
    faq,
    search,
    download,
    international,
  })
