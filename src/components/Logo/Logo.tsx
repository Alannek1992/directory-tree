import React from "react";
import styled from "styled-components";

import directoryLogo from "../../assets/images/directory-logo.png";

const LogoContainer = styled.div`
  background-color: white;
  padding: 8px;
  height: 80%;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid #ffa500;
`;

const Image = styled.img`
  height: 100%;
`;

const Logo: React.FC = () => (
  <LogoContainer>
    <Image src={directoryLogo} alt="MyBurger" />
  </LogoContainer>
);

export default Logo;
