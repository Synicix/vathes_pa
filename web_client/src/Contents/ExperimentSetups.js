import React, {Component} from "react";
import {NavLink} from 'react-router-dom';
import './ExperimentSetups.css'
 
class ExperimentSetups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error_message: null,
      experimentSetups: []
    };
  }

  componentDidMount() {
    fetch("http://192.168.2.91:5000/get-experiment-setups", {
      method: 'GET',
    })
    .then(response  => response.json())
    .then(response => {
      if (response.hasOwnProperty('error_message')) {
        this.setState({error_message: response.error_message, isLoaded: true})
      }
      else {
        this.setState({experimentSetups: response.data, isLoaded: true})
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
            <h1>Experiment Setups</h1>
            <NavLink className='experiment-setups-create-link' to='/experiment-setups/create'>
              <button className='expierment-setups-create-button'>+</button>
            </NavLink>
            <table className='experiment-setup-table'>
              <tbody>
                <tr>
                  <th>experiment_setup_hash</th>
                  <th>experiment_setup_id</th>
                  <th>description</th>
                  <th></th>
                </tr>
                {
                  this.state.experimentSetups.map(tuple => (
                    <tr key={tuple.experiment_setup_hash}>
                      <td>{tuple.experiment_setup_hash}</td>
                      <td>{tuple.experiment_setup_id}</td>
                      <td>{tuple.description}</td>
                      <td>
                        {
                          <NavLink className='experiment-setups-edit-link' to={'/experiment-setups/edit/:' + tuple.experiment_setup_hash}>
                            <button className='experiment-setups-tuple-edit-button'>Edit</button>
                          </NavLink>
                        }
                      </td>
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

export default ExperimentSetups;