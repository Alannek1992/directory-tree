import styled from "styled-components";
import { device } from "../../../shared/device";

const Toolbar = styled.header`
  height: 56px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #808080;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  z-index: 90;
  border-bottom: 2px solid #ffa500;
`;

const ToolbarNav = styled.nav`
  display: none;

  @media ${device.tablet} {
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    margin: 0 10px;
    align-items: center;
    height: 100%;
  }
`;

export const Styled = {
  Toolbar,
  ToolbarNav
};
