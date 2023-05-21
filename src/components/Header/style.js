import styled from 'styled-components';

import { primaryColor, primaryTextColor } from '../../config/colors';

export const Nav = styled.nav`
  background-color: ${primaryColor};
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  a {
    color: ${primaryTextColor};
    margin: 0 10px;
    font-weight: bold;
  }
`;
