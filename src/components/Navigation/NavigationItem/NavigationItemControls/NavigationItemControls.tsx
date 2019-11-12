import React, { useState, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faWindowClose } from "@fortawesome/free-regular-svg-icons";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Styled } from "./NavigationItemControls.style";


interface INavigationItemNameManagerProps {
  isActive: boolean;
  changeName?: () => (name: string) => void;
  close: (event: React.MouseEvent<HTMLDivElement>) => void;
  name: string;
}

const NavigationItemNameManager: React.FC<INavigationItemNameManagerProps> = ({
  isActive,
  changeName,
  close,
  name
}) => {
  /*This could be called as an antipattern to use props in state, because hook useState runs only 
  once in the initial phase. But in our case we need the name from props only for initial value and therefore its fine to use it.*/
  const [inputName, setInputName] = useState(name);
  const [editing, setEditing] = useState(false);

  const changeNameHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    changeName && changeName()(inputName);
    setEditing(false);
    event.stopPropagation();
  };

  const setInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputName(event.target.value);
  };

  const setEditingHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    if (editing) {
      setInputName(name);
    }
    setEditing(!editing);
    event.stopPropagation();
  };

  const selectTextHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.select();
  };

  console.log("NAVIGATION ITEM NAME MANAGER");

  let content = (
    <Fragment>
      <Styled.NavigatiomItemControlsText>
        {name}
      </Styled.NavigatiomItemControlsText>
      <Styled.NavigationItemControlsIcons>
        {changeName && isActive ? (
          <Styled.NavigationItemControlsIcon
            onClick={editing ? changeNameHandler : setEditingHandler}
          >
            <FontAwesomeIcon icon={faEdit} />
          </Styled.NavigationItemControlsIcon>
        ) : null}
        <Styled.NavigationItemControlsIcon onClick={close}>
          <FontAwesomeIcon icon={faWindowClose} />
        </Styled.NavigationItemControlsIcon>
      </Styled.NavigationItemControlsIcons>
    </Fragment>
  );

  if (editing) {
    content = (
      <Fragment>
        <Styled.NavigatiomItemControlsInput
          value={inputName}
          onChange={setInputChangeHandler}
          autoFocus
          onFocus={selectTextHandler}
          maxLength={15}
        />
        <Styled.NavigationItemControlsIcons>
          <Styled.NavigationItemControlsIcon onClick={changeNameHandler}>
            <FontAwesomeIcon icon={faCheck} />
          </Styled.NavigationItemControlsIcon>
          <Styled.NavigationItemControlsIcon onClick={setEditingHandler}>
            <FontAwesomeIcon icon={faTimes} />
          </Styled.NavigationItemControlsIcon>
        </Styled.NavigationItemControlsIcons>
      </Fragment>
    );
  }

  return content;
};

export default NavigationItemNameManager;
