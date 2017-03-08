import React from 'react';
import translations from '../../../l10n/loader.l10n.json';
import config from '../../../customization.json';
var language = translations[config.language];

class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message: language.message};
  }

  componentDidMount() {
    var that = this;
    this.timeout = setTimeout(function(){
      that.setState({message: language.message_timeout });
    }, 10000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render () {
      return(<div className="loader"><div className="loading"></div>
    <p className="help-block">{this.state.message}</p>
      </div>);
  }
}

export default Loader;
