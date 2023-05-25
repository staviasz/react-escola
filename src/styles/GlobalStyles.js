import { createGlobalStyle, styled } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

import {
  primaryColor,
  primaryDarkColor,
  primaryTextColor,
} from '../config/colors';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
  }

  body {
    font-family: sans-serif;
    background-color: ${primaryDarkColor};
    color: ${primaryDarkColor};
  }

  html, body, #root {
    height: 100%;
  }

  button {
    cursor: pointer;
    background-color: ${primaryColor};
    border: none;
    color: ${primaryTextColor};
    padding: 10px 20px;
    border-radius: 4px;
    font-weight: bold;
  }

  a {
    text-decoration: none;
    color: ${primaryColor};
  }

  ul {
    list-style: none;
  }
`;

export const Container = styled.div`
  max-width: 500px;
  background-color: #fff;
  margin: 30px auto;
  padding: 30px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
