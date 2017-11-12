import { connect } from "react-redux";

import { setupRequest } from "../../../state/actions/actionCreators";

import Setup from "./Setup";

const mapDispatchToProps = dispatch => ({
  onRegisterClick: user => {
    dispatch(setupRequest(user));
  }
});

export default connect(null, mapDispatchToProps)(Setup);
