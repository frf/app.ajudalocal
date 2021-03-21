import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import CreateLocale from './pages/CreateLocale';
import Landing from './pages/Landing';
import Orphanage from './pages/Orphanage';
import LocaleMap from './pages/LocaleMap';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/app" component={LocaleMap} />
        <Route path="/locale/create" component={CreateLocale} />
        <Route path="/orphanages/:id" component={Orphanage} />
      </Switch>
    </BrowserRouter>
  );
}