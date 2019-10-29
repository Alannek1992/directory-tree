import styled, { css } from "styled-components";

interface INavigationItemProps {
  active?: boolean;
}

const NavigationItem = styled.div<INavigationItemProps>`
  margin: 0 5px;
  box-sizing: border-box;
  display: flex;
  height: 80%;
  border: 2px solid #ffa500;
  border-radius: 5px;
  background-color: white;
  color: black;
  position: relative;
  min-width: 140px;

  ${props =>
    props.active &&
    css`
      background: black;
      color: white;
      cursor: pointer;
    `}

  :hover {
    background: #474747;
    cursor: pointer;
    color: white;
  }
`;

const NavigationItemText = styled.span<INavigationItemProps>`
  text-decoration: none;
  width: 100%;
  box-sizing: border-box;
  display: block;
  margin: 8px;
`;

const NavigationItemIconClose = styled.div<INavigationItemProps>`
  height: 15px;
  margin: 8px;
  :hover {
    color: #ffa500;
  }
`;

export const Styled = {
  NavigationItem,
  NavigationItemText,
  NavigationItemIconClose
};
