import styled from "styled-components";
import { device, DeviceRequirements } from "./device";

export const StyledNavigationMenu = styled.ul`
         display: flex;
         height: 100%;
         flex-wrap: nowrap;
         overflow-x: hidden;
         max-width: 80%;
         align-items: center;
         margin: 0;
         padding: 0;
         box-sizing: border-box;
         flex-flow: row;

         @media ${device(DeviceRequirements.MAX_WIDTH).tablet} {
           flex-flow: column;
           margin: 0 auto;
           max-height: 400px;
         }
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
