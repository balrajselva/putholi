import React, { Component } from 'react'
import { withRouter } from 'react-router'
import axios from 'axios'

class ReviewDeoResponse extends Component {
    state={
        spinner:true
    }
    componentDidMount(){
        let project =null;
        for(let i=0;i<this.props.location.school.projects.length;i++){
            if(this.props.location.school.projects[i].status==="PROJECT_CREATED"){
              project=this.props.location.school.projects[i];
              break;
            }
          }
          if(project === null){
              window.alert("There are no active projects")
            return
          }
        axios.get(this.props.config+"/getDeoResponse/"+project.projectId)
        .then(res=>{
            console.log(res.data)
            this.setState({
                deoRes:res.data,
                spinner:false
            });
        })
        .catch(error=>{
            this.setState({spinner:false});
            window.alert("Unable to get school details due to "+error)
        })
    }
    render() {
        return (
            <div>

            {this.state.spinner?<div class="spinner"></div>:null}
            </div>
        )
    }
}
export default withRouter(ReviewDeoResponse)