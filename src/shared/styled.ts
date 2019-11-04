import styled from "styled-components";

export const StyledNavigationMenu = styled.ul`
  display: flex;
  height: 100%;
  flex-wrap: nowrap;
  overflow-x: hidden;
  max-width: 80%;
  width: 80%;
  align-items: center;
  margin: 0;
  padding: 0;
`;

export const ManipulateTreeButton = styled.button`
  border-radius: 5px;
  margin: 10px;
  padding: 5px;
  background-color: orange;
  border: 2px solid black;
  :focus {
    outline: none;
  }

  :hover {
    background-color: black;
    border-color: #ffa500;
    color: white;
  }
`;
