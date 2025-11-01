import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { loadingBarReducer } from 'react-redux-loading-bar'

import home from 'modules/home/reducer'
import ui from 'modules/ui/reducer'
import search from 'modules/search/reducer'
import download from 'modules/download/reducer'
import international from 'modules/edu/international/reducer'
import faq from 'modules/faq/reducer'
import press from 'modules/press/reducer'
import cert from 'modules/cert/reducer'
import job from 'modules/job/reducer'

export default (history: any) =>
  combineReducers({
    router: connectRouter(history),
    loadingBar: loadingBarReducer,
    home,
    ui,
    faq,
    search,
    download,
    international,
    press,
    cert,
    job,
  })
