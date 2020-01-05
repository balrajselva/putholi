import React,{Component} from 'react';
import {withRouter, Link} from 'react-router-dom';


class IconComponent extends Component{
    nextPage = () =>{
        if(this.props.pageLink==="registrationPage"){
            this.props.history.push('/'+this.props.pageLink);
            // this.props.toggleModal();
        }
        else{
            this.props.history.push('/'+this.props.pageLink);
        }
    }
    render(){
        return(
            <div className="span3">
                <a href="" onClick={()=>this.nextPage()}>
                    <span className={"img_icon "+this.props.img}></span>
                    <span className="link_title">{this.props.title}</span>
                    {this.props.content}
                </a>
            </div>
        );
    }
}

export default withRouter(IconComponent);