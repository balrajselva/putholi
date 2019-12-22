import React, { Component } from 'react'
import { withRouter } from 'react-router'

class EditRequirements extends Component {
    render() {
        console.log(this.props);
        return (
            <div label="Edit Requirements">
                <div className="row">
                    <div className="span10">
                        <div className="control-group">
                            <label className="control-label" for="select01">Requirement Type</label>
                            <div className="controls">
                            <select id="projType" disabled="">
                                <option>New</option>
                            </select>
                            </div>
                        </div>
                        <div className="control-group">
                            <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Project Type</th>
                                    <th>Asset Type</th>
                                    <th>Asset Name</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><button type="button" className="dark_btn">Edit</button>
                                    </td>
                                    <td>New</td>
                                    <td>Sports</td>
                                    <td>Football</td>
                                    <td>10</td>
                                </tr>
                                <tr>
                                    <td><button type="button" className="dark_btn">Edit</button>
                                    </td>
                                    <td>New</td>
                                    <td>Infrastructure</td>
                                    <td>Chairs</td>
                                    <td>10</td>
                                </tr>
                                <tr>
                                    <td><button type="button" className="dark_btn">Edit</button>
                                    </td>
                                    <td>New</td>
                                    <td>Infrastructure</td>
                                    <td>Bathroom</td>
                                    <td>5</td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                    </div>
                </div>                   
            </div>
        )
    }
}

export default withRouter(EditRequirements);
