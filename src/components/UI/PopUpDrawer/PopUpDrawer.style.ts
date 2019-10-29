import styled from "styled-components";

const PopUpDrawer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  background: rgba(35, 35, 53, 0.95);
  cursor: pointer;
`;

const PopUpDrawerInnerContainer = styled.div`
  position: absolute;
  top: 40%;
  width: 100%;
  text-align: center;
`;

export const Styled = {
  PopUpDrawer,
  PopUpDrawerInnerContainer
};
