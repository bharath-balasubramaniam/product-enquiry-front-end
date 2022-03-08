import React from "react";
import Navbar from "../components/Navbar";
import FormField from "../components/FormField";
import styled from "styled-components";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #faeee7;
`;
function HomePage() {
  return (
    <Container>
      <Navbar />
      <FormField />
    </Container>
  );
}

export default HomePage;
