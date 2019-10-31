import styled, { css } from "styled-components";

interface INavigationItemProps {
  active?: boolean;
}

const NavigationItem = styled.li<INavigationItemProps>`
  margin: 0 5px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  height: 80%;
  border: 2px solid #ffa500;
  border-radius: 5px;
  background-color: white;
  color: black;
  min-width: 140px;
  max-width: 140px;
  align-items: center;

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

export const Styled = {
  NavigationItem
};
