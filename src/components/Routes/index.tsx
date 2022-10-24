import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { PageDonate } from "pages/PageDonate";
import { PageTokenomics } from "pages/PageTokenomics";

export const Routes = () => (
    <Switch>
        {/* @ts-ignore */}
        <Route exact path="/donate">
            <PageDonate />
        </Route>

        {/* @ts-ignore */}
        <Route exact path="/tokenomics">
            <PageTokenomics />
        </Route>

        {/* @ts-ignore */}
        <Route exact path="/">
            <Redirect to="/donate" />
        </Route>
    </Switch>
);
