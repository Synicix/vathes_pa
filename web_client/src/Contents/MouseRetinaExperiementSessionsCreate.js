import React, { Component } from 'react';
import './MouseRetinaExperiementSessionsCreate.css'
 
class MouseRetinaExperiementSessionsCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      error_message: null,
      session_date: '',
      experiment_setup_hash: '',
      mouse_hash: '',
      experiementSetups: [],
      mouses: []
    };

    // On Change Functions
    this.handleSessionDateChange = this.handleSessionDateChange.bind(this);
    this.handleExperimentSetupIDChange = this.handleExperimentSetupIDChange.bind(this);
    this.handleSubjectNameChange = this.handleSubjectNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // This function is async to work around the datajoint bug when more then two request are occuring
  async componentDidMount() {
    // Get experiment setup list
    let queryResult;
    queryResult = await fetch('/get-experiment-setups', {
      method: 'GET',
    })

    queryResult = await queryResult.json()
    console.log(queryResult)
    if (queryResult.hasOwnProperty('error_message')) {
      this.setState({error_message: queryResult.error_message})
    }
    else {
      this.setState({experiementSetups: queryResult.data})
    }

    // Get mouses
    queryResult = await fetch('/get-mouse', {
      method: 'GET',
    })

    queryResult = await queryResult.json()
    if (queryResult.hasOwnProperty('error_message')) {
      this.setState({error_message: queryResult.error_message})
    }
    else {
      this.setState({mouses: queryResult.data})
    }
  }

  handleSessionDateChange(event) {
    this.setState({session_date: event.target.value});
  }

  handleExperimentSetupIDChange(event) { 
    this.setState({experiment_setup_hash: event.target.value});
  }

  handleSubjectNameChange(event) {
    this.setState({mouse_hash: event.target.value});
  }
  
  handleSubmit(event) {
    console.log(this.state)
    // Check if experiment_setup_id or description is null
    if (this.state.session_date === '' || this.state.experiment_setup_id === '' || this.state.subject_name === '') {
      this.setState({message: 'Fields cannot be empty'});
    }
    else {
      fetch('/insert-into-mouse-retina-experiment-sessions', {
        method: 'POST',
        body: JSON.stringify({
          session_date: this.state.session_date,
          experiment_setup_hash: this.state.experiment_setup_hash,
          mouse_hash: this.state.mouse_hash,
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response.hasOwnProperty('error_message')) {
          this.setState({message: response.error_message})
        }
        else {
          this.setState({message: response.message})
        }
      })
      .catch(error => console.log(error))
    }
  }
  render() {
    return (
    <div className='content-inner-container'>
      <form className='mouse-create-form' onSubmit={this.handleSubmit}>
        <h1>Add Mouse Retina Experiment Sessions</h1>
        <label className='mouse-create-form-label'>session_date</label>
        <input className='mouse-create-form-input' type='date' value={this.state.session_date} onChange={this.handleSessionDateChange}></input>
        <select id='experiment_setup_id' className='mouse-setup-create-form-select' value={this.state.experiment_setup_id} onChange={this.handleExperimentSetupIDChange}>
          <option value=''>Select Experiment Setup ID</option>
          {
            this.state.experiementSetups.map(tuple => (
              =<option value={tuple.experiment_setup_hash} key={tuple.experiment_setup_id}>{tuple.experiment_setup_id}</option>
            ))
          }
        </select>
        <select id='subject_name' className='mouse-setup-create-form-select' value={this.state.subject_name} onChange={this.handleSubjectNameChange}>
          <option value=''>Select Mouse</option>
          {
            this.state.mouses.map(tuple => (
              <option value={tuple.mouse_hash} key={tuple.subject_name}>{tuple.subject_name}</option>
            ))
          }
        </select>
        <input className='mouse-create-form-submit-button' type='submit' value='Submit'></input>
      </form>
      <p>{this.state.message}</p>
    </div>
    
    );
  }
}
 
export default MouseRetinaExperiementSessionsCreate;