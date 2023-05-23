import React from 'react';
import { useDispatch } from 'react-redux';

import { Title } from './style';
import { Container } from '../../styles/GlobalStyles';
import * as exampleActions from '../../store/modules/example/actions';

export default function Login() {
  const dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault();

    dispatch(exampleActions.clicaBotaoRequest());
  }

  return (
    <Container>
      <Title>Login</Title>
      <small>oieee</small>
      <p>Lorem ikwgonovbfnobnaf fgrgmnnrog </p>
      <button type="button" onClick={handleClick}>
        Enviar
      </button>
    </Container>
  );
}
