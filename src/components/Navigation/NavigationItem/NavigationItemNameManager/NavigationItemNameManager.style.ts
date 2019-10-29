import styled, { css } from "styled-components";

interface INavigatiomItemNameManagerProps {
  editing: boolean;
}

const NavigationItemNameManagerInput = styled.input`
  margin: 8px;
  padding-right: 5px;
  border-radius: 5px;
  width: 70%;

  :focus {
    outline: none;
  }

  ::selection {
    background: #ffa500;
  }
`;

const NavigationItemNameManagerText = styled.span`
  text-decoration: none;
  width: 100%;
  box-sizing: border-box;
  display: block;
  margin: 8px;
`;

const NavigationItemNameManagerEditing = styled.div<
  INavigatiomItemNameManagerProps
>`
  ${props =>
    props.editing &&
    css`
      z-index: 100;
      position: absolute;
      display: flex;
      justify-content: center;
      right: 1px;
      top: 1px;
      background: inherit;
    `}
`;

const NavigationItemIconEdit = styled.div`
  height: 15px;
  margin: 7px 2px;
  :hover {
    color: #ffa500;
  }
`;

const NavigationItemIconClose = styled.div`
  height: 15px;
  margin: 8px;
  :hover {
    color: #ffa500;
  }
`;

export const Styled = {
  NavigationItemNameManagerInput,
  NavigationItemNameManagerText,
  NavigationItemNameManagerEditing,
  NavigationItemIconEdit,
  NavigationItemIconClose
};
