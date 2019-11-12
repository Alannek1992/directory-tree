import styled from "styled-components";
import { device, DeviceRequirements } from "../../../shared/device";

const DrawerContainer = styled.div`
  width: 40px;
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  box-sizing: border-box;
  cursor: pointer;

  @media ${device(DeviceRequirements.MIN_WIDTH).tablet} {
    display: none;
  }
`;

const DrawerIconLine = styled.div`
  width: 90%;
  height: 3px;
  background-color: #ffa500;
`;

export const Styled = {
  DrawerContainer,
  DrawerIconLine
};
