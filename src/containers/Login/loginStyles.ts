import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: linear-gradient(to bottom, #f37227, #ffffff);
`;

export const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 400px;
    height: 500px;
    background-color: #ffffff;
    border: 2px solid orange;
    border-radius: 10px;
`;

export const FitHubLogo = styled.img`
    width: 180px;
    height: 180px;
    margin-bottom: -20px;
`;

export const Title = styled.h1`
    text-align: center;
    font-size: 30px;
    color: #333;
    margin-bottom: 20px;
    font-family: 'Open Sans', sans-serif;
`;

export const ErrorMessage = styled.p`
    color: red;
    font-size: 1rem;
    margin-bottom: 10px;
    text-align: center;
    font-family: 'Montserrat', sans-serif;
`;

export const Input = styled.input`
  width: 300px;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: orange;
  }
`;

export const Button = styled.button`
  width: 320px;
  padding: 12px;
  background-color: orange;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: rgba(243, 114, 39);
  }
`;