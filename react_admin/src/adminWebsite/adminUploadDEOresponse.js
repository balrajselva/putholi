import React, { Component } from 'react'

export default class adminUploadDEOresponse extends Component {
    render() {
        return (
        <section className="content">
            {/* row */}
            <div className="row">
                <div className="col-xs-12">
                <div className="box">
                    <div className="box-header">
                    <h3 className="box-title">Upload DEO Response</h3>
                    <div className="box-tools">
                        <div className="input-group input-group-sm" style={{width: 150}}>
                        <input type="text" name="table_search" className="form-control pull-right" placeholder="Search" />
                        <div className="input-group-btn">
                            <button type="submit" className="btn btn-default"><i className="fa fa-search" /></button>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="box box-primary">
                    <div className="box-header with-border">
                        <h3 className="box-title">Role details like Beneficiary and name OR admin and name to be displayed</h3>
                    </div>
                    {/* /.box-header */}
                    {/* form start */}
                    <form role="form">
                        <div className="box-body">
                        <div className="radio">
                            <label>
                            <input type="radio" name="optionsRadios" id="optionsRadios1" defaultValue="option1" />
                            DEO APPROVED
                            </label>
                        </div>
                        <div className="radio">
                            <label>
                            <input type="radio" name="optionsRadios" id="optionsRadios2" defaultValue="option2" />
                            DEO REJECTED
                            </label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputFile">Upload DEO Response here</label>
                            <input type="file" id="exampleInputFile" />
                            <p className="help-block">Display File Name</p>
                        </div>
                        <div className="checkbox">
                            <label>
                            <input type="checkbox" disabled defaultChecked />
                            Notify Beneficiary ( Retrieve Email id's)
                            </label>
                        </div>
                        <div className="checkbox">
                            <label>
                            <input type="checkbox" />
                            Notify Trust Members
                            </label>
                        </div>
                        </div>
                        {/* /.box-body */}
                        <div className="box-footer">
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <button type="button" className="btn btn-warning">Cancel</button>
                        </div>
                    </form>
                    </div>
                </div>
                </div>
            </div>
            </section>

        )
    }
}
