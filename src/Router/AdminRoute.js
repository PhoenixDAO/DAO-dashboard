
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const AdminRoute = (props, { component: Component, ...rest }) => {

    const C = props.component;
    return (
      <Route
        prop={props}
        render={(prop) =>
          props.LoggedIn && props.user.isAdmin ? (
            <C {...prop} />
          ) : (
            <Redirect
              to={{
                pathname: "/",
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
  
export default connect(mapStateToProps)(AdminRoute);
