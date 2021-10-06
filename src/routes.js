import React  from "react";
import { Route, BrowserRouter } from "react-router-dom";

import Dashbord from "./pages/dashbord";
import Favorites from "./pages/favorites";

function Routes () {

    return (
        <BrowserRouter>
            <Route component={Dashbord} path="/" exact />   
            <Route component={Favorites} path="/favorites" exact />   
        </BrowserRouter>
    )
}

export default Routes