import React from "react";
import { connect } from "react-redux";
import { Loader } from "ui";
import { DisplayFlexRow } from "ui/utils";
import { oAuthLogin } from "store/modules/sagaActions";

class OAuth extends React.Component {
  componentDidMount() {
    console.log("Component mounted", this.props.location.search);
    const token = new URLSearchParams(this.props.location.search).get("token");
    console.log(token);
    if (token) {
      this.props.oAuthLogin(token, () => {
        console.log("inside callback");
        this.props.history.push("/home");
      });
    } else {
      this.props.history.push("/login");
    }
  }
  render() {
    return (
      <DisplayFlexRow justifyContent="center" flexDirection="column">
        <Loader />
        Logging you in
      </DisplayFlexRow>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  oAuthLogin: (token, callback) => dispatch(oAuthLogin(token, callback))
});

export default connect(() => ({}), mapDispatchToProps)(OAuth);
