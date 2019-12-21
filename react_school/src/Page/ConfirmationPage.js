import React, { Component } from 'react'
import FooterComponent from '../components/FooterComponent'
import HeaderComponent from '../components/HeaderComponent'

export default class ConfirmationPage extends Component {
    render() {
        return (
            <div>
                <HeaderComponent/>
                <div class="page_container">
    	<div class="breadcrumb">
        	<div class="wrap">
            	<div class="container">
                    <a href="index.html">Home</a><span>/</span>About
                </div>
            </div>
        </div>
    	<div class="wrap">
        	<div class="container">
                <section>
                    <div class="row">
                        <div class="span12">
                            <h2 class="title"><span>User details have been sent for review. You will receive an email with id & password within 7 working days</span></h2>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>

                <FooterComponent/>
            </div>
        )
    }
}
