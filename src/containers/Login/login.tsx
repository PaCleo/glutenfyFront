import { useState } from "react";
import { apiClient } from "../../services/apiClient";
import { Button, ErrorMessage, Input, LoginContainer, Title, Container, FitHubLogo } from "./loginStyles";
import fithublogo from "../../assets/fithublogo.svg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await apiClient.post("/auth/login", {
        email,
        password,
      });
      console.log(response.data);
      window.location.href = "/admin";
    } catch {
      setError("Credenciais inválidas. Tente novamente.",);
    }
  };

  return (
    <Container>
      <LoginContainer>
        <FitHubLogo src={fithublogo}></FitHubLogo>
        <Title>Bem-vindo a FitHub</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin}>Entrar</Button>
      </LoginContainer>
    </Container>
  );
}
