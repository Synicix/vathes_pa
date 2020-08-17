import React, { Component } from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import './ExperimentSetupsEdit.css'

 
class ExperimentSetupsEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: null,
            sucessfullyExecuted: false,
            experiment_setup_hash: '',
            experiment_setup_id: '',
            description: ''
        };

        // On Change Functions
        this.handleExperimentSetupIDChange = this.handleExperimentSetupIDChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    componentDidMount() {
        fetch('http://192.168.2.91:5000/get-experiment-setups-by-hash',  {
            method: 'POST',
            body: JSON.stringify({experiment_setup_hash: this.props.match.params.hash.substring(1)})
        })
        .then(response => response.json())
        .then(response => {
            if (response.hasOwnProperty('error_message')) {
                this.setState({message: response.error_message})
            }
            else {
                this.setState({
                    experiment_setup_hash: response.data.experiment_setup_hash,
                    experiment_setup_id: response.data.experiment_setup_id,
                    description: response.data.description
                })
            }
        })
        .catch(error => console.log(error))
    }

    handleExperimentSetupIDChange(event) {
        this.setState({experiment_setup_id: parseInt(event.target.value)});
    }

    handleDescriptionChange(event) { 
        this.setState({description: event.target.value});
    }
    
    handleUpdate(event) {
        // Check if experiment_setup_id or description is null
        if (this.state.experiment_setup_id === '' || this.state.description === '') {
            this.setState({message: "Fields cannot be empty"});
        }
        else {
            fetch('http://192.168.2.91:5000/update-tuple-from-experiment-setups', {
                method: 'POST',
                body: JSON.stringify({
                    experiment_setup_hash: this.state.experiment_setup_hash,
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
                    this.setState({sucessfullyExecuted: true})
                }
            })
            .catch(error => console.log(error))
        }
    }

    handleDelete(event) {
        // Check if experiment_setup_id or description is null
        fetch('http://192.168.2.91:5000/delete-from-experiment-setup', {
            method: 'POST',
            body: JSON.stringify({
                experiment_setup_hash: this.state.experiment_setup_hash,
            })
        })
        .then(response => response.json())
        .then(response => {
            if (response.hasOwnProperty('error_message')) {
                this.setState({message: response.error_message})
            }
            else {
                this.setState({sucessfullyExecuted: true})
            }
        })
        .catch(error => console.log(error))
    }

    render() {
        return (
        <div className='content-inner-container'>
            <form className='experiment-setups-edit-form' onSubmit={this.handleUpdate}>
                <h1>Edit Experiement Setups</h1>
                <label className='experiment-setups-edit-form-label'>experiment_setup_id</label>
                <input className='experiment-setups-edit-form-input' type='number' value={this.state.experiment_setup_id} onChange={this.handleExperimentSetupIDChange}></input>
                <label className='experiment-setups-edit-form-label'>description</label>
                <input className='experiment-setups-edit-form-input' type='text' value={this.state.description} onChange={this.handleDescriptionChange}></input>
                <div className='experiment-setups-edit-button-div'>
                    <input className='experiment-setups-edit-form-submit-button' type='submit' value='Update Entry'></input>
                    <input className='experiment-setups-edit-form-submit-button' type='button' onClick={this.handleDelete} value='Delete Entry'></input>
                </div>
                
            </form>
            <p>{this.state.message}</p>
            {this.state.sucessfullyExecuted ? <Redirect to='/experiment-setups'/> : null}
        </div>
        );
    }
}

export default ExperimentSetupsEdit;