import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'




function MainRoutes() {
    return (
        <Router>
            <Route exact path="/">
                <Homeview />
            </Route>
            <Route exact path="/home">
                <Homeview />
            </Route>
            <Route path="/signup">
                <SignupView />
            </Route>
            <Route path="/login">
                <LoginView />
            </Route>
            <Route path="/create">
                <CreatePost />
            </Route>
            <Route path="/view">
                <ViewPost />
            </Route>
            <Route path="/viewmore">
                <ViewMore />
            </Route>




        </Router>
    )
}

export default MainRoutes