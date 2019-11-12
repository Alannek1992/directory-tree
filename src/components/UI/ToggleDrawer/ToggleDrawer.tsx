import React from "react";
import { Styled } from "./ToggleDrawer.styled";

interface IToggleDrawerProps {
  toggle: () => void;
}

const ToggleDrawer: React.FC<IToggleDrawerProps> = ({ toggle }) => (
  <Styled.DrawerContainer onClick={toggle}>
    <Styled.DrawerIconLine></Styled.DrawerIconLine>
    <Styled.DrawerIconLine></Styled.DrawerIconLine>
    <Styled.DrawerIconLine></Styled.DrawerIconLine>
  </Styled.DrawerContainer>
);

export default ToggleDrawer;
