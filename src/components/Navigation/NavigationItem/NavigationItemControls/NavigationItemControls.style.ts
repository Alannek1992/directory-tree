import styled from "styled-components";

const NavigatiomItemControlsInput = styled.input`
  margin: 0 8px;
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

const NavigatiomItemControlsText = styled.span`
  margin: 0 3px;

`;

const NavigationItemControlsIcons = styled.div`
  margin: 0 3px;
  display: flex;
`;

const NavigationItemControlsIcon = styled.div`
  margin: 0 1px;
  :hover {
    color: #ffa500;
  }
`;

export const Styled = {
  NavigatiomItemControlsInput,
  NavigatiomItemControlsText,
  NavigationItemControlsIcons,
  NavigationItemControlsIcon
};
