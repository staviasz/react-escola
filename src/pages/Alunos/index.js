import { get } from 'loadsh';
import React, { useEffect, useState } from 'react';
import {
  FaEdit,
  FaExclamation,
  FaUserCircle,
  FaWindowClose,
} from 'react-icons/fa';
import { Link } from 'react-router-dom/cjs/react-router-dom';

import { toast } from 'react-toastify';
import Loading from '../../components/Loading';
import axios from '../../services/axios';
import history from '../../services/history';
import { Container, Title } from '../../styles/GlobalStyles';
import { AlunoContainer, NovoAluno, ProfilePicture } from './style';

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const response = await axios.get('/');
      setAlunos(response.data);
      setIsLoading(false);
    }
    getData();
  }, []); // parou na aula 229 tem que refatorar o cog como esta na aula pois em alguns momentos nao esta apagando a linha quando o aluno é deletado

  const hadleDeleteAsk = (e) => {
    e.preventDefault();
    const exclamation = e.currentTarget.nextSibling;
    exclamation.setAttribute('display', 'block');
    e.currentTarget.remove();
  };

  const hadleDelete = async (e, id, index) => {
    try {
      setIsLoading(true);
      await axios.delete(`/${id}`);
      const novosAlunos = [...alunos];
      novosAlunos.splice(index, 1);
      setAlunos(novosAlunos);
    } catch (err) {
      const status = get(err, 'response.status', 0);
      if (status === 401) {
        toast.error('Você precisa fazer login');
        history.push('/login');
      } else {
        toast.error('Ocorreu um erro ao excluir aluno');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Loading isLoading={isloading} />
      <Title>Alunos</Title>
      <NovoAluno to="/aluno/">Novo aluno</NovoAluno>
      <AlunoContainer>
        {alunos.map((aluno, index) => (
          <div key={String(aluno.id)}>
            <div>
              <ProfilePicture>
                {get(aluno, 'Images[0].cloudinary_url', false) ? (
                  <img
                    className="margin-right"
                    src={aluno.Images[0].cloudinary_url}
                    alt=""
                  />
                ) : (
                  <FaUserCircle className="margin-right" size="36px" />
                )}
              </ProfilePicture>
              <span>{aluno.nome}</span>
            </div>
            <span>{aluno.email}</span>

            <div>
              <Link to={`/aluno/${aluno.id}/edit`}>
                <FaEdit className="margin-right" size={16} />
              </Link>
              <Link onClick={hadleDeleteAsk} to={`/aluno/${aluno.id}/delete`}>
                <FaWindowClose size={16} />
              </Link>
              <FaExclamation
                onClick={(e) => hadleDelete(e, aluno.id, index)}
                size={16}
                display="none"
                cursor="pointer"
                color="red"
              />
            </div>
          </div>
        ))}
      </AlunoContainer>
    </Container>
  );
}
