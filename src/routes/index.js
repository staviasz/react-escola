import React from 'react';
import { Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import Login from '../pages/Login';
import Aluno from '../pages/Aluno';
import Alunos from '../pages/Alunos';
import Register from '../pages/Register';
import Avatar from '../pages/FotosAvatar';
import Page404 from '../pages/Erro404';

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
      <PrivateRoute exact path="/aluno/:id/edit" component={Aluno} isClosed />
      <PrivateRoute exact path="/aluno/" component={Aluno} isClosed />
      <PrivateRoute exact path="/avatar/:id" component={Avatar} isClosed />
      <PrivateRoute path="*" component={Page404} />
    </Switch>
  );
}
