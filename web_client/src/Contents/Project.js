import React, { Component } from "react";
 
class Project extends Component {
  constructor(props) {
      super(props);
      this.state = {
        projectName: null,
        projectText: null
      }
  }
    
  componentDidMount() {
    fetch("http://synita.com/api/get-projects-by-name-default-user", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({projectName: this.props.location.pathname.split(':')[1]})
    })
      .then(response  => response.json())
      .then(response => {
        this.setState({projectName: response[0].project_name, projectText: response[0].project_text})
      })
      .catch(error => console.log(error));
  }

  render() {
    return(
        <div className='content-inner-container'>
          <div>
          <h1>{this.state.projectName}</h1>
          <div dangerouslySetInnerHTML={{__html: this.state.projectText}}/>
          </div>
        </div>
    )
  }
}
 
export default Project;