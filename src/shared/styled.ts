import styled from "styled-components";

export const StyledNavigationMenu = styled.div`
  display: flex;
  height: 100%;
  flex-wrap: nowrap;
  overflow-x: hidden;
  width: 90%;
  align-items: center;
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
