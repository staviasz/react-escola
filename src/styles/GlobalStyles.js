import { createGlobalStyle, styled } from 'styled-components';

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
    transition: all 0.3s
  }

  button:hover {
    filter: brightness(80%);
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
  max-width: 800px;
  background-color: #fff;
  margin: 30px auto;
  padding: 30px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 30px;
`;
