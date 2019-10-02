import React,{Component} from 'react';

class SocialMediaComponent extends Component{
    render(){
        return(
                <li><a href="#" class={this.props.name}>{this.props.name}</a></li>
        );
    }
}

export default SocialMediaComponent;