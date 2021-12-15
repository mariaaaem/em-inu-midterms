import React from 'react'

import {
    BrowserRouter as Router, Switch,
    Route, Redirect
} from "react-router-dom";

//IMPORT PAGES
import StudentList from "../../pages/StudentList";
import StudentEvaluation from "../../pages/StudentEvaluation";

export default function Routes() {
    return (
        <Router>
            <Switch>

                <Route path="/" exact>
                    <Redirect to="/studentlist" />
                </Route>

                <Route component={StudentList} path="/studentlist" exact/>
                <Route component={StudentEvaluation} path="/studentevaluation/:id" exact/>
            </Switch>
        </Router>
    )
}