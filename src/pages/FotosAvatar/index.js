import { get } from 'loadsh';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { toast } from 'react-toastify';
import Loading from '../../components/Loading';
import axios from '../../services/axios';
import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions';
import { Container, Title } from '../../styles/GlobalStyles';
import { Form } from './style';

export default function Avatar({ match }) {
  const dispatch = useDispatch();
  const id = get(match, 'params.id');

  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/alunos/${id}`);
        setImage(get(data.aluno, 'Images[0].cloudinary_url', ''));
        setIsLoading(false);
      } catch (err) {
        toast.error('Erro ao obter image');
        setIsLoading(false);
        history.push('/');
      }
    };
    getData();
  }, [id]);

  const handleChange = async (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);

    setImage(imageUrl);

    const formData = new FormData();
    formData.append('aluno_id', id);
    formData.append('image', file);

    setImage(imageUrl);

    try {
      setIsLoading(true);
      axios.post(`/images/`, formData, {
        'Content-Type': 'multipart/form-data',
      });
      toast.success('Imagem enviada com sucesso');
      setIsLoading(false);
      history.push(`/aluno/${id}/edit`);
    } catch (err) {
      setIsLoading(false);
      const { status } = get(err, 'response', '');
      toast.error('Erro ao enviar imagem');
      if (status === 401) dispatch(actions.loginFailure());
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Title>Foto</Title>
      <Form>
        <label htmlFor="foto">
          {image ? <img src={image} alt="ImageProfile" /> : 'Selecionar'}
          <input type="file" id="foto" onChange={handleChange} />
        </label>
      </Form>
    </Container>
  );
}
