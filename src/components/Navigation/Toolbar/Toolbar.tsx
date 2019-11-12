import React from "react";

import AppInstances from "../AppInstances/AppInstances";
import Logo from "../../Logo/Logo";
import { Styled } from "./Toolbar.style";
import ToggleDrawer from "../../UI/ToggleDrawer/ToggleDrawer";

interface IToolbarProps {
  toggle: () => void;
}

const Toolbar: React.FC<IToolbarProps> = ({ toggle }) => {
  return (
    <Styled.Toolbar>
      <ToggleDrawer toggle={toggle} />
      <Logo />
      <Styled.ToolbarNav>
        <AppInstances />
      </Styled.ToolbarNav>
    </Styled.Toolbar>
  );
};

export default Toolbar;
