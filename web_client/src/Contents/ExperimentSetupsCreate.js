import React, {Component} from "react";
import './ExperimentSetupsCreate.css'
 
class ExperiementSetupsCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      experiment_setup_id: '',
      description: ''
    };

    // On Change Functions
    this.handleExperimentSetupIDChange = this.handleExperimentSetupIDChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
}

  handleExperimentSetupIDChange(event) {
    this.setState({experiment_setup_id: parseInt(event.target.value)});
  }

  handleDescriptionChange(event) { 
    this.setState({description: event.target.value});
  }
  
  handleSubmit(event) {
    // Check if experiment_setup_id or description is null
    if (this.state.experiment_setup_id === '' || this.state.description === '') {
      this.setState({message: "Fields cannot be empty"});
    }
    else {
      fetch('/insert-into-experiment-setups', {
        method: 'POST',
        body: JSON.stringify({
          experiment_setup_id: this.state.experiment_setup_id,
          description: this.state.description
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
      <form className='experiment-setups-create-form' onSubmit={this.handleSubmit}>
        <h1>Create Experiement Setups</h1>
        <label className='experiment-setups-create-form-label'>experiment_setup_id</label>
        <input className='experiment-setups-create-form-input' type='number' value={this.state.experiment_setup_id} onChange={this.handleExperimentSetupIDChange}></input>
        <label className='experiment-setups-create-form-label'>description</label>
        <input className='experiment-setups-create-form-input' type='text' value={this.state.description} onChange={this.handleDescriptionChange}></input>
        <input className='experiment-setups-create-form-submit-button' type='submit' value='Submit'></input>
      </form>
      <p>{this.state.message}</p>
      
    </div>
    );
  }
}
 
export default ExperiementSetupsCreate;