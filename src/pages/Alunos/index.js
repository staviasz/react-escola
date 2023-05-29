import React, { useState, useEffect } from 'react';
import { get } from 'loadsh';
import { FaEdit, FaUserCircle, FaWindowClose } from 'react-icons/fa';
import { Link } from 'react-router-dom/cjs/react-router-dom';

import axios from '../../services/axios';
import { Container } from '../../styles/GlobalStyles';
import { AlunoContainer, ProfilePicture } from './style';

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get('/alunos');
      setAlunos(response.data);
    }

    getData();
  }, []);
  return (
    <Container>
      <h1>Alunos</h1>
      <AlunoContainer>
        {alunos.map((aluno) => (
          <div key={String(aluno.id)}>
            <ProfilePicture>
              {get(aluno, 'Images[0].url', false) ? (
                <img src={aluno.Images[0].url} alt="" />
              ) : (
                <FaUserCircle size="36px" />
              )}
            </ProfilePicture>
            <span>{aluno.nome}</span>
            <span>{aluno.email}</span>

            <Link to={`/aluno/${aluno.id}/edit`}>
              <FaEdit size={16} />
            </Link>

            <Link to={`/aluno/${aluno.id}/delete`}>
              <FaWindowClose size={16} />
            </Link>
          </div>
        ))}
      </AlunoContainer>
    </Container>
  );
}
