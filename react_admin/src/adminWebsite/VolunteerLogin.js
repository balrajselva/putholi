import React, { Component } from 'react';

class VolunteerLogin extends Component {
    render() {
        return (
            <body class="hold-transition register-page">       <div className="login-box">
  <div className="login-logo">
    <a href="../../index2.html"><b>Putholi</b></a>
  </div>
  {/* /.login-logo */}
  <div className="login-box-body">
    <p className="login-box-msg">Sign in to start your session</p>
    <form action="../../volunteer.html" method="post">
      <div className="form-group has-feedback">
        <input type="email" className="form-control" placeholder="Email" />
        <span className="glyphicon glyphicon-envelope form-control-feedback" />
      </div>
      <div className="form-group has-feedback">
        <input type="password" className="form-control" placeholder="Password" />
        <span className="glyphicon glyphicon-lock form-control-feedback" />
      </div>
      <div className="row">
        {/* /.col */}
        <div className="col-xs-4">
          <button type="submit" className="btn btn-primary btn-block btn-flat">Sign In</button>
        </div>
        {/* /.col */}
      </div>
    </form>
    {/* /.social-auth-links */}
    <a href="#">I forgot my password</a><br />
  </div>
</div>
</body>
        );
    }
}

export default VolunteerLogin;