import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useSelector, useDispatch } from 'react-redux';

import { Container, Title } from '../../styles/GlobalStyles';
import { Form } from './style';
import Loading from '../../components/Loading';
import * as actions from '../../store/modules/auth/actions';

export default function Register() {
  const dispacth = useDispatch();

  const idStorage = useSelector((state) => state.auth.user.id);
  const nomeStorage = useSelector((state) => state.auth.user.nome);
  const emailStorage = useSelector((state) => state.auth.user.email);
  const isLoading = useSelector((state) => state.auth.isLoading);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  useEffect(() => {
    if (!idStorage) return;

    setNome(nomeStorage);
    setEmail(emailStorage);
  }, [idStorage, nomeStorage, emailStorage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = false;

    if (nome.length < 3 || nome.length > 255) {
      formErrors = true;
      toast.error('Campo nome deve ter entre 3 e 255 caracteres');
    }
    if (!isEmail(email)) {
      formErrors = true;
      toast.error('E-mail inválido');
    }
    if (!idStorage && (senha.length < 6 || senha.length > 50)) {
      formErrors = true;
      toast.error('Campo senha deve ter entre 6 e 50 caracteres');
    }
    if (formErrors) return;

    dispacth(actions.registerRequest({ idStorage, nome, email, senha }));
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Title>{idStorage ? 'Atualizar Dados' : 'Crie sua conta'}</Title>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Nome:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </label>
        <label htmlFor="email">
          E-mail:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="senha">
          Senha:
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </label>

        <button type="submit">{idStorage ? 'Salvar' : 'Criar conta'}</button>
      </Form>
    </Container>
  );
}
