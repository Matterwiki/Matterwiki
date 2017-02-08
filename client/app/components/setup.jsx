import React from 'react';
import {hashHistory} from 'react-router';
import Loader from './loader.jsx';
import Alert from 'react-s-alert';
import translations from '../../../l10n/setup.l10n.json';
import config from '../../../customization.json';
var language = translations[config.language];

class Setup extends React.Component {

  constructor(props) {
    super(props);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleSignUp() {
    var user = {
      name: this.refs.user_name.value,
      about: this.refs.user_about.value,
      email: this.refs.user_email.value,
      password: this.refs.user_password.value
    };
    var myHeaders = new Headers({
        "Content-Type": "application/x-www-form-urlencoded"
    });
    var myInit = { method: 'POST',
               headers: myHeaders,
               body: "name="+user.name+"&about="+user.about+"&email="+user.email+"&password="+user.password
               };
    var that = this;
    fetch('/setup',myInit)
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      if(response.error.error)
        Alert.error(response.error.message);
      else {
          Alert.success(language.alert_success);
          hashHistory.push('login');
      }
    });
  }


  render () {
    return(
      <div className=" setup-form container">
      <div className="row">

        <div className="col-md-6">
          <h1><b>{language.welcome_h1}</b></h1>
          <h3>{language.welcome_h3}</h3><br/>
          <h4>{language.welcome_h4}</h4><br/>


        </div>
      <div className="col-md-6">
        <form>
          <div className="col-sm-12 form-group">
            <input type="text" className="form-control" ref="user_name" id="inputUserName" placeholder={language.placeholder_name} />
          </div>
          <div className="col-sm-12 form-group">
            <input type="text" className="form-control" ref="user_about" id="inputUserAbout" placeholder={language.placeholder_about} />
          </div>
      <div className="col-sm-12 form-group">
        <input type="email" className="form-control" ref="user_email" id="inputUserEmail" placeholder={language.placeholder_email} />
      </div>
      <div className="col-sm-12 form-group">
        <input type="password" className="form-control" ref="user_password" id="inputUserPassword" placeholder={language.placeholder_pw} />
      </div>
      <div className="col-sm-12 form-group">
        <button onClick={this.handleSignUp} className="btn btn-default btn-block btn-lg">{language.button_signup}</button>
      </div>
    </form>
      </div>
        </div>

  </div>);
  }
}

export default Setup;
