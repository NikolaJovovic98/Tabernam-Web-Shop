import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { get_cookie_action } from '../../actions/users_actions';
import { GlobalContext } from '../../App';


const ProtectedRoute = ({ component: Component, ...rest }) => {

  const dispatch = useDispatch();

  const {user_info } = useContext(GlobalContext);

  const cookie_info = useSelector(state => state.is_user_logged_in);
  const { cookie, loading } = cookie_info;

  React.useEffect(() => {
    dispatch(get_cookie_action());
  }, [dispatch]);

  return (
    typeof cookie !== "undefined"
      ?
      (
        loading
          ?
          null
          :
          (
            <Route {...rest} render={
              () => {
                if (cookie) {
                  return <Component user={user_info} />
                } else {
                  return <Redirect to="login" />
                }
              }
            } />
          )
      )
      :
      null
  )
}

export default ProtectedRoute;
