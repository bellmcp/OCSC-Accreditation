import React from 'react'
import { Route, Switch } from 'react-router-dom'

import HomeRoutes from 'modules/home/components/Routes'
import SearchRoutes from 'modules/search/Routes'
import EduRoutes from 'modules/edu/Routes'
import DownloadRoutes from 'modules/download/Routes'
import FaqRoutes from 'modules/faq/Routes'

import NotFound from './NotFound'
const PATH = process.env.REACT_APP_BASE_PATH

export default function Routes() {
  return (
    <Switch>
      <Route path={`${PATH}/search/curriculum`}>
        <SearchRoutes />
      </Route>
      <Route path={`${PATH}/edu`}>
        <EduRoutes />
      </Route>
      <Route path={`${PATH}/download`}>
        <DownloadRoutes />
      </Route>
      <Route path={`${PATH}/faq`}>
        <FaqRoutes />
      </Route>
      <Route path={`${PATH}/`}>
        <HomeRoutes />
      </Route>
      <Route
        path={`${PATH}/admin`}
        component={() => {
          window.location.replace(
            'https://learningportal.ocsc.go.th/accreditationadmin/index.html'
          )
          return null
        }}
      />
      <Route>
        <NotFound />
      </Route>
    </Switch>
  )
}
