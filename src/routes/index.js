import React from 'react';
import { Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

import Aluno from '../pages/Aluno';
import Alunos from '../pages/Alunos';
import Page404 from '../pages/Erro404';
import Avatar from '../pages/FotosAvatar';
import Login from '../pages/Login';
import Register from '../pages/Register';

export default function Routes() {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={Alunos} isClosed={false} />
      <PrivateRoute exact path="/login" component={Login} isClosed={false} />
      <PrivateRoute
        exact
        path="/register"
        component={Register}
        isClosed={false}
      />
      <PrivateRoute exact path="/aluno/" component={Aluno} isClosed />
      <PrivateRoute exact path="/aluno/:id/edit" component={Aluno} isClosed />
      <PrivateRoute exact path="/images/:id" component={Avatar} isClosed />
      <PrivateRoute path="*" component={Page404} />
    </Switch>
  );
}
