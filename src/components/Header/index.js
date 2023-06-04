import React from 'react';
import { FaHome, FaSignInAlt, FaUserAlt, FaPowerOff } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Nav } from './style';
import * as actions from '../../store/modules/auth/actions';
import history from '../../services/history';

export default function Header() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const hadleLogout = (e) => {
    e.preventDefault();
    dispatch(actions.loginFailure());
    history.push('/');
  };

  return (
    <Nav>
      <Link to="/">
        <FaHome size={24} />
      </Link>
      {isLoggedIn ? (
        <>
          <Link to="/register">
            <FaUserAlt size={24} color="#66ff33" />
          </Link>
          <Link to="/login">
            <FaPowerOff size={24} onClick={hadleLogout} />
          </Link>
        </>
      ) : (
        <>
          <Link to="/register">
            <FaUserAlt size={24} />
          </Link>
          <Link to="/login">
            <FaSignInAlt size={24} />
          </Link>
        </>
      )}
    </Nav>
  );
}
