import React, { useState } from 'react';
import { get } from 'loadsh';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';

import axios from '../../services/axios';
import history from '../../services/history';
import { Container } from '../../styles/GlobalStyles';
import { Form } from './style';

export default function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

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
    if (senha.length < 6 || senha.length > 50) {
      formErrors = true;
      toast.error('Campo senha deve ter entre 6 e 50 caracteres');
    }

    if (formErrors) return;

    try {
      await axios.post('/users/', {
        nome,
        email,
        senha,
      });
      toast.success('Conta criada com sucesso');
      history.push('/');
    } catch (err) {
      const errors = get(err, 'response.data.errors', []);
      errors.map((error) => toast.error(error));
    }
  };

  return (
    <Container>
      <h1>Crie sua conta</h1>
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

        <button type="submit">Criar conta</button>
      </Form>
    </Container>
  );
}
