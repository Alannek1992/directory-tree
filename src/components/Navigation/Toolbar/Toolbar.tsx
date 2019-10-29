import React from "react";

import AppInstances from "../AppInstances/AppInstances";
import Logo from "../../Logo/Logo";
import { Styled } from "./Toolbar.style";

const Toolbar: React.FC = () => {
  return (
    <Styled.Toolbar>
      <Logo />
      <Styled.ToolbarNav >
        <AppInstances />
      </Styled.ToolbarNav>
    </Styled.Toolbar>
  );
};

export default Toolbar;
