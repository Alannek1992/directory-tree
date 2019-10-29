import React, { useState, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Styled } from "./NavigationItemNameManager.style";


interface INavigationItemNameManagerProps {
  isActive: boolean;
}

const NavigationItemNameManager: React.FC<
  INavigationItemNameManagerProps
> = props => {
  const [name, setName] = useState("New Card");
  const [inputName, setInputName] = useState(name);
  const [editing, setEditing] = useState(false);

  const changeNameHandler = () => {
    setName(inputName);
    setEditing(false);
  };

  const setInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputName(event.target.value);
  };

  const setEditingHandler = () => {
    if (editing) {
      setInputName(name);
    }
    setEditing(!editing);
  };

  const selectTextHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.select();
  };

  console.log("NAVIGATION ITEM NAME MANAGER");

  return (
    <Fragment>
      {editing ? (
        <Styled.NavigationItemNameManagerInput
          value={inputName}
          onChange={setInputChangeHandler}
          autoFocus
          onFocus={selectTextHandler}
        />
      ) : (
        <Styled.NavigationItemNameManagerText>
          {name}
        </Styled.NavigationItemNameManagerText>
      )}

      {props.isActive ? (
        <Styled.NavigationItemNameManagerEditing editing={editing}>
          <Styled.NavigationItemIconEdit
            onClick={editing ? changeNameHandler : setEditingHandler}
          >
            <FontAwesomeIcon icon={editing ? faCheck : faEdit} />
          </Styled.NavigationItemIconEdit>
          {editing ? (
            <Styled.NavigationItemIconClose onClick={setEditingHandler}>
              <FontAwesomeIcon icon={faTimes} />
            </Styled.NavigationItemIconClose>
          ) : null}
        </Styled.NavigationItemNameManagerEditing>
      ) : null}
    </Fragment>
  );
};

export default NavigationItemNameManager;
