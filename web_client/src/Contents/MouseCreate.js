import React, { Component } from "react";
import './MouseCreate.css'
 
class MouseCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: null,
            subject_dob: '',
            subject_name: '',
            subject_sex: 'M',
        };

        // On Change Functions
        this.handleSubjectDOBChange = this.handleSubjectDOBChange.bind(this);
        this.handleSubjectNameChange = this.handleSubjectNameChange.bind(this);
        this.handleSubjectSexChange = this.handleSubjectSexChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubjectDOBChange(event) {
        this.setState({subject_dob: event.target.value});
    }

    handleSubjectNameChange(event) { 
        this.setState({subject_name: event.target.value});
    }

    handleSubjectSexChange(event) {
        this.setState({subject_sex: event.target.value});
    }
    
    handleSubmit(event) {
        console.log(this.state)
        // Check if experiment_setup_id or description is null
        if (this.state.subject_dob === '' || this.state.subject_name === '' || this.state.subject_sex === '') {
            this.setState({message: "Fields cannot be empty"});
        }
        else {
            fetch('/insert-into-mouse', {
                method: 'POST',
                body: JSON.stringify({
                    subject_dob: this.state.subject_dob,
                    subject_name: this.state.subject_name,
                    subject_sex: this.state.subject_sex,
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
                <h1>Add Mouse Data</h1>
                <label className='mouse-create-form-label'>subject_dob</label>
                <input className='mouse-create-form-input' type='date' value={this.state.subject_dob} onChange={this.handleSubjectDOBChange}></input>
                <label className='mouse-create-form-label'>subject_name</label>
                <input className='mouse-create-form-input' type='text' value={this.state.subject_name} onChange={this.handleSubjectNameChange}></input>
                <label className='mouse-create-form-label'>subject_sex</label>
                <select id="mouse-sex" className='mouse-setup-create-form-select' value={this.state.subject_sex} onChange={this.handleSubjectSexChange}>
                    <option value="M">M</option>
                    <option value="F">F</option>
                </select>
                <input className='mouse-create-form-submit-button' type='submit' value='Submit'></input>
            </form>
            <p>{this.state.message}</p>
            
        </div>
        
        );
    }
}
 
export default MouseCreate;