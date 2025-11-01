import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Job from './components/Job'

export default function Routes() {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Route path={`${path}/:id`}>
        <Job />
      </Route>
    </Switch>
  )
}
