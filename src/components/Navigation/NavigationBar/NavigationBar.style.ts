import styled, { css } from "styled-components";
import { device, DeviceRequirements } from "../../../shared/device";

interface INavigationIconProps {
  active: boolean;
}

const NavigationIcon = styled.div<INavigationIconProps>`
  margin: 0 5px;
  padding: 2px;
  border: 2px solid #ffa500;
  border-radius: 10px;
  background: white;

  @media ${device(DeviceRequirements.MAX_WIDTH).tablet} {
    display: none;
  }

  :hover {
    color: white;
    background: black;
    cursor: pointer;
  }

  ${props =>
    !props.active &&
    css`
     pointer-events: none;
     color: gray;
    `}
`;

const CreateNewItem = styled.li`
  box-sizing: border-box;
  border: 2px solid #ffa500;
  background: white;
  border-radius: 5px;
  color: black;
  margin: 0 5px;
  display: flex;
  height: 80%;
  width: auto;
  padding: 11px;

  @media ${device(DeviceRequirements.MAX_WIDTH).tablet} {
    width: 20%;
    margin: 40px auto;
    display: flex;
    justify-content: center;
  }
  
  &:hover {
    background: #474747;
    cursor: pointer;
    color: white;
  }
`;

export const Styled = {
  NavigationIcon,
  CreateNewItem
};
