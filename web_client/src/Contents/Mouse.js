import React, {Component} from "react";
import {NavLink} from 'react-router-dom';
import './Mouse.css'
 
class Mouse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error_message: null,
      mouses: []
    };
  }

  componentDidMount() {
    fetch("/get-mouse", {
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
            <h1>Mouse</h1>
            <NavLink className='mouse-create-link' to='/mouse/create'>
              <button className='mouse-create-button'>+</button>
            </NavLink>
            <table className='mouse-table'>
              <tbody>
                <tr>
                  <th>mouse_hash</th>
                  <th>subject_dob</th>
                  <th>subject_name</th>
                  <th>subject_sex</th>
                </tr>
                {
                  this.state.experimentSetups.map(tuple => (
                    <tr key={tuple.mouse_hash}>
                      <td>{tuple.mouse_hash}</td>
                      <td>{tuple.subject_dob}</td>
                      <td>{tuple.subject_name}</td>
                      <td>{tuple.subject_sex}</td>
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

export default Mouse;