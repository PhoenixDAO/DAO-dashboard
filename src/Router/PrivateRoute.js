import React from "react";
import { Route, Redirect} from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = (props, { component: Component, ...rest }) => {
 
  const C = props.component;
  return (
    <Route
      prop={props}
      render={(prop) =>
        props.LoggedIn ? (
          <C {...prop} />
        ) : (
          <Redirect
            to={{
              pathname: "/auth/log_in",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

const mapStateToProps = (state) => ({
  token: state.userDetails.token,
  LoggedIn: state.userDetails.isloggedIn,
  user:state.userDetails.user
});

export default connect(mapStateToProps)(PrivateRoute);

// export default PrivateRoute;
