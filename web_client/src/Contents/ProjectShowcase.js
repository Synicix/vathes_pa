import React, { Component } from "react";
import {NavLink} from 'react-router-dom';
import './ProjectShowcase.css'
 
class ProjectShowcase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      projects: []
    };
  }

  componentDidMount() {
    fetch("http://synita.com/api/get-projects-name-and-summary-default-user")
      .then(response  => response.json())
      .then(response => {
        this.setState({projects: response})
      })
      .catch(error => console.log(error));
  }

  render() {
    return(
      <div className='content-inner-container'>
        <div className='project-show-case-ul'>
          {
            this.state.projects.map(project => (
              <NavLink className='project-show-case-li' to={'/ProjectShowCase:' + project.project_name}>
                <h1>{project.project_name}</h1>
                <p>{project.project_summary}</p>
              </NavLink>
            ))
          }
        </div>
      </div>  
    )
  }
}
 
export default ProjectShowcase;