import React from 'react';
import { FaHome, FaSignInAlt, FaUserAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Nav } from './style';

export default function Header() {
  // eslint-disable-next-line no-unused-vars
  const botaoClicado = useSelector((state) => state.example.botaoClicado);
  return (
    <Nav>
      <Link to="/nd">
        <FaHome size={24} />
      </Link>
      <Link to="/login">
        <FaUserAlt size={24} />
      </Link>
      <Link to="/">
        <FaSignInAlt size={24} />
      </Link>
      {botaoClicado ? 'clicado' : 'não clicado'}
    </Nav>
  );
}
