import React, { useEffect, useState } from "react";
import { Route, useHistory } from "react-router-dom";

export const ProtectedRoute = ({
  Component,
  redirectUrl,
  ...rest
}) => {
  const [loading, setLoading] = useState(true);
  const shouldRedirect = rest.validator(rest.location);

  const history = useHistory();

  useEffect(() => {
    (async () => {
      try {
        if (shouldRedirect) {
          if (redirectUrl === "/depositCalculator" && true) {
            history.replace("/loan");
          } else {
            history.replace(redirectUrl);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      {!shouldRedirect && !loading && (
        <Route
          {...rest}
          render={(props) => <Component {...rest} {...props} />}
        />
      )}
    </>
  );
};

export const LoggedComponent = (props) => {
  const history = useHistory();

  const [logged, setLogged] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLogged(true);
        if (true) {
          history.push("/deposit");
        }
      } catch (error) {
        console.log(error);
        history.replace("/");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      { 
        logged && !loading && props.children
      }
    </>
  )
}
