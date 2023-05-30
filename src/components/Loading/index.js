/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import PropTypes from 'prop-types';

import { IsLoading } from './style';

export default function Loading({ isLoading }) {
  if (!isLoading) return <></>;
  return (
    <IsLoading>
      <div />
      <span>Carregando...</span>
    </IsLoading>
  );
}

Loading.defaultProps = {
  isLoading: false,
};

Loading.propTypes = {
  isLoading: PropTypes.bool,
};
