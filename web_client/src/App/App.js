import React, {Component} from 'react';
import {Route, HashRouter} from 'react-router-dom';


import './App.css'

import NavBar from '../NavBar/NavBar.js'
import Home from '../Contents/Home.js'
import Project from '../Contents/Project.js';
import ExperimentSetups from '../Contents/ExperimentSetups.js'
import ExperimentSetupsCreate from '../Contents/ExperimentSetupsCreate.js';
import NotFound from '../Contents/NotFound.js';
import {Switch} from 'react-router-dom/cjs/react-router-dom.min';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {userIsLoggedIn: false}
        this.setUserIsLoggedIn = this.setUserIsLoggedIn.bind(this);
    }

    setUserIsLoggedIn(value) {
        console.log('setUserIsLoggedInCalled');
        console.log(this.state);
        this.setState({userIsLoggedIn: value});
        console.log(this.state);
    }

    componentDidMount() {
        // Check if local storage contains jwt, if so then attempt login
        const jwtToken = localStorage.getItem('jwt');
        if (jwtToken !== null) {
            fetch('http://synita.com/api/check-token', {
            method: 'GET',
            headers: {
              'Authorization': jwtToken},
          })
          .then(result => {
              if (result.status === 401) {
                  localStorage.removeItem('jwt');
              }
              else {
                  this.setState({userIsLoggedIn: true});
              }
          })
          .catch(error => console.log(error));
        }
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
                        <Route exact path={'/experiment-setups-create:experiment-setup-hash'} component={Project}/>
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </HashRouter>
        )
    }
}

export default App