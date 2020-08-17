import React, {Component} from 'react';
import {Route, HashRouter} from 'react-router-dom';


import './App.css'

import NavBar from '../NavBar/NavBar.js';
import Home from '../Contents/Home.js';
import ExperimentSetups from '../Contents/ExperimentSetups.js';
import ExperimentSetupsCreate from '../Contents/ExperimentSetupsCreate.js';
import ExperimentSetupsEdit from '../Contents/ExperimentSetupsEdit.js';
import Mouse from '../Contents/Mouse.js'
import MouseCreate from '../Contents/MouseCreate.js';
import MouseRetinaExperimentSessions from '../Contents/MouseRetinaExperimentSessions.js';
import MouseRetinaExperimentSessionsCreate from '../Contents/MouseRetinaExperiementSessionsCreate.js';
import NotFound from '../Contents/NotFound.js';
import {Switch} from 'react-router-dom/cjs/react-router-dom.min';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {userIsLoggedIn: false}
    }

    render() {
        return (
            <HashRouter>
                <NavBar userIsLoggedIn={this.state.userIsLoggedIn}></NavBar>
                <div className='content-outer-container'>
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route exact path='/experiment-setups' component={ExperimentSetups}/>
                        <Route exact path='/experiment-setups/create' component={ExperimentSetupsCreate}/>
                        <Route path={'/experiment-setups/edit/:hash'} component={ExperimentSetupsEdit}/>
                        <Route exact path='/mouse' component={Mouse}/>
                        <Route exact path='/mouse/create' component={MouseCreate}/>
                        <Route exact path='/mouse-retina-experiment-sessions' component={MouseRetinaExperimentSessions}/>
                        <Route exact path='/mouse-retina-experiment-sessions/create' component={MouseRetinaExperimentSessionsCreate}/>
                        <Route component={NotFound}/>
                    </Switch>
                </div>
            </HashRouter>
        )
    }
}

export default App