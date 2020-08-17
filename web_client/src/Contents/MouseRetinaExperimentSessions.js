import React, {Component} from "react";
import {NavLink} from 'react-router-dom';
import './MouseRetinaExperimentSessions.css'
 
class MouseRetinaExperimentSessions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error_message: null,
      mouseRetinaExperimentSessions: []
    };
  }

  componentDidMount() {
    fetch("/get-mouse-retina-experiment-sessions", {
      method: 'GET',
    })
    .then(response  => response.json())
    .then(response => {
      if (response.hasOwnProperty('error_message')) {
        this.setState({error_message: response.error_message, isLoaded: true})
      }
      else {
        this.setState({mouseRetinaExperimentSessions: response.data, isLoaded: true})
      }
      
    })
    .catch(error => console.log(error));
  }

  render() {
    if (!this.state.isLoaded) {
      return <h1>Fetching Data ...</h1>
    }
    else if (this.state.error_message != null) {
      return <h1>{this.state.error_message}</h1>
    }
    else {
      return (
        <div className='content-inner-container'>
          <div>
            <h1>Mouse Retina Experiment Sessions</h1>
            <NavLink className='mouse-create-link' to='/mouse-retina-experiment-sessions/create'>
              <button className='mouse-create-button'>+</button>
            </NavLink>
            <table className='mouse-table'>
              <tbody>
                <tr>
                  <th>session_hash</th>
                  <th>session_date</th>
                  <th>experiment_setup_id</th>
                  <th>subject_name</th>
                </tr>
                {
                  this.state.mouseRetinaExperimentSessions.map(tuple => (
                    <tr key={tuple.mouse_hash}>
                      <td>{tuple.session_hash}</td>
                      <td>{tuple.session_date}</td>
                      <td>{tuple.experiment_setup_id}</td>
                      <td>{tuple.subject_name}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      );
    }
    
  }
}

export default MouseRetinaExperimentSessions;