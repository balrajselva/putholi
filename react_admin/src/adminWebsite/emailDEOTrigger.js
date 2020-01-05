import React, { Component } from 'react';
import axios from "axios";
import {withRouter} from 'react-router-dom';

class EmailDEOTrigger extends Component {

    constructor(props) {
        super(props);

        this.state = {
            schoolList: [],
            toAddress: null,
            subject: null,
            bodyMessage: null,
            selectedFile: [],
            attachmentFile: null,
            imageURL: ''
           
        }
       
        this.routeParam = props.match.params.schoolID;
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.submitClicked = this.submitClicked.bind(this);
    }
    componentDidMount() {
         fetch('http://localhost:6060/puthuyir/school/'+this.routeParam)
            .then(response =>
                response.json())
            .then(users => this.setState({ schoolList: users }));
    }

    submitClicked = (e) => {
        e.preventDefault();
        let dataData = new FormData(e.target);
        let userPayload = {
            "toEmailAddress" : dataData.get('toAddress'),
            "subject" : "Initiate to DEO Email",
            "schoolName":this.state.schoolList.schoolInfo.schoolName,
            "schoolRegNo":this.state.schoolList.schoolInfo.schoolRegNo,
            "schoolType":this.state.schoolList.schoolInfo.schoolType,
            "requirements" :this.state.schoolList.requirements
        }
 
        dataData.append("user",JSON.stringify(userPayload));
       

        axios.post('http://localhost:5050/email/sendattachment', dataData
        )
            .then((response) => {
                console.log(response.data);
            })

    }

    onChangeHandler(e) {
        e.preventDefault();
        var files = e.target.files;


        let file=[];

        // loop through files
        for (var i = 0; i < files.length; i++) {
            file.push(files.item(i))

        }
        this.setState({
            attachmentFile :file
        })
       

    }


    render() {

        if (!this.state.schoolList.requirements) return null;

        return (

            <div className="col-md-9">
                <div className="box box-primary">
                    <div className="box-header with-border">
                        <h3 className="box-title">Compose New Message</h3>
                    </div>
                    <form onSubmit={this.submitClicked} className="form-horizontal">
                        <div className="box-body">
                            <div className="form-group">
                                <input className="form-control" type="text" placeholder="To:" name="toAddress" value={this.state.toAddress}></input>
                            </div>
                            <div className="form-group">
                                <input className="form-control" placeholder="Subject:" name="subject" value={this.state.subject}></input>
                            </div>
                            <div className="form-group">

                                <div className="tab-content">
                                    <div className="span4"><strong>School Name </strong>: {this.state.schoolList.schoolInfo.schoolName}</div>

                                    <table className="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>Requirement Type</th>
                                                <th>Asset Type</th>
                                                <th>Asset Name</th>
                                                <th>Quantity</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {(this.state.schoolList.requirements !== null) ? this.state.schoolList.requirements.map((value, index) => {

                                                return <tr>


                                                    <td>{value.reqType}</td><td>{value.assetType}</td>
                                                    <td>{value.assetName}</td><td>{value.quantity}</td>
                                                </tr>
                                            }) : null}


                                        </tbody>
                                    </table>
                                </div>












                            </div>
                            <div className="form-group">
                                <div className="btn btn-default btn-file">
                                    <i className="fa fa-paperclip"></i> Attachment
                  <input type="file" name="attachmentFile" multiple="multiple" ref={fileInput => this.fileInput = fileInput} onChange={e => this.onChangeHandler(e)}></input>
                                </div>
                                <p className="help-block">Max. 32MB</p>
                            </div>
                        </div>
                        <img src={this.state.imageURL} alt="img" />
                        <div className="box-footer">
                            <div className="pull-right">
                                <button type="submit" className="btn btn-primary"><i className="fa fa-envelope-o"></i> Send</button>
                            </div>
                            <button type="reset" className="btn btn-default"><i className="fa fa-times"></i> Discard</button>
                        </div>
                    </form>
                </div>


            </div>











        )
    }
} export default withRouter(EmailDEOTrigger);