import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { PageDonate } from "pages/PageDonate";

interface Props {
    onConnect: () => void;
}

export const Routes = ({ onConnect }: Props) => (
    <Switch>
        {/* @ts-ignore */}
        <Route exact path="/donate">
            <PageDonate onConnect={onConnect} />
        </Route>

        {/* @ts-ignore */}
        <Route exact path="/">
            <Redirect to="/donate" />
        </Route>
    </Switch>
);
