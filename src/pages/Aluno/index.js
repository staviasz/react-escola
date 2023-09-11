import { get } from 'loadsh';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { FaEdit, FaUserCircle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { isEmail, isFloat, isInt } from 'validator';

import { toast } from 'react-toastify';
import Loading from '../../components/Loading';
import axios from '../../services/axios';
import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions';
import { Container, Title } from '../../styles/GlobalStyles';
import { Form, ProfileAvatar } from './style';

export default function Aluno({ match }) {
  const id = get(match, 'params.id', '');
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [avatar, setAvatar] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) return;

    async function getData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/alunos/${id}`);
        const image = get(data.aluno, 'Images[0].cloudinary_url', '');
        setNome(data.aluno.nome);
        setSobrenome(data.aluno.sobrenome);
        setEmail(data.aluno.email);
        setIdade(data.aluno.idade);
        setPeso(data.aluno.peso);
        setAltura(data.aluno.altura);
        setAvatar(image);
      } catch (err) {
        const status = get(err, 'response.status', 0);
        const errors = get(err, 'response.data.errors', []);

        if (status === 400) errors.map((error) => toast.error(error));
        history.push('/');
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = false;

    if (nome.length < 3 || nome.length > 255) {
      toast.error('Nome precisa ter entre 3 e 255 caracteres.');
      formErrors = true;
    }
    if (nome.length < 3 || nome.length > 255) {
      toast.error('Sobrenome precisa ter entre 3 e 255 caracteres.');
      formErrors = true;
    }
    if (!isEmail(email)) {
      toast.error('E-mail inválido.');
      formErrors = true;
    }
    if (!isInt(String(idade))) {
      toast.error('Idade inválida.');
      formErrors = true;
    }
    if (!isFloat(String(peso))) {
      toast.error('Peso inválido.');
      formErrors = true;
    }
    if (!isFloat(String(altura))) {
      toast.error('Altura inválida.');
      formErrors = true;
    }

    if (formErrors) return;

    try {
      setIsLoading(true);
      if (id) {
        // editando
        await axios.put(`/alunos/${id}`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        toast.success('Aluno(a) editado(a) com sucesso.');
      } else {
        // criando
        const { data } = await axios.post(`/alunos/`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        toast.success('Aluno(a) cadastrado(a) com sucesso.');
        history.push(`/aluno/${data.aluno.id}/edit`);
      }
    } catch (err) {
      const status = get(err, 'response.status', 0);
      const errors = get(err, 'response.data.errors', []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error('Erro desconhecido');
      }

      if (status === 401) dispatch(actions.loginFailure());
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Title>{id ? 'Editar aluno' : 'Novo aluno'}</Title>
      {id && (
        <ProfileAvatar>
          {avatar ? (
            <img src={avatar} alt={nome} />
          ) : (
            <FaUserCircle size={180} />
          )}
          <Link to={`/images/${id}`}>
            <FaEdit size={24} />
          </Link>
        </ProfileAvatar>
      )}
      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome"
        />
        <input
          type="text"
          value={sobrenome}
          onChange={(e) => setSobrenome(e.target.value)}
          placeholder="Sobrenome"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
        />
        <input
          type="number"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
          placeholder="Idade"
        />
        <input
          type="number"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
          placeholder="Peso"
        />
        <input
          type="number"
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
          placeholder="Altura"
        />

        <button type="submit">Enviar</button>
      </Form>
    </Container>
  );
}

Aluno.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
