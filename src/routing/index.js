import React from 'react';
import History from './history';
import { routes } from './routes';
import { Router, Route, Switch } from "react-router-dom";

export default function AppRouting(){
    return(
        <Router history={History}>
            <Route render={({location})=>(
                <Switch key={location.key} location={location}>
                    {routes.map((R, i) =>(
                        <Route exact={R.exact} path={R.path} key={R.path} component={R.component}>
                        </Route>
                    ))}
                </Switch>
            )} />
        </Router>
    );
  }