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
  display: flex;
  align-items: center;
`;

const PopUpDrawerInnerContainer = styled.div`
  width: 100%;
  text-align: center;
  overflow: auto;
`;

export const Styled = {
  PopUpDrawer,
  PopUpDrawerInnerContainer
};
