import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Certificate from './components/Certificate'

export default function Routes() {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Route path={`${path}/:id`}>
        <Certificate />
      </Route>
    </Switch>
  )
}
