import React from 'react';
import { get } from 'loadsh';
import { FaUserCircle } from 'react-icons/fa';

import axios from '../../services/axios';
import { Container } from '../../styles/GlobalStyles';
import { AlunoContainer } from './style';

export default function Alunos() {
  const [alunos, setAlunos] = React.useState([]);

  React.useEffect(() => {
    async function getData() {
      const response = await axios.get('/alunos');
      console.log(response.data);
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
            {get(aluno, 'Images[0].url', false) ? (
              <img src={console.log(aluno.Images[0].url)} alt="" />
            ) : (
              <FaUserCircle size="36px" />
            )}
          </div>
        ))}
      </AlunoContainer>
    </Container>
  );
}
