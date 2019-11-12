import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import uniqid from "uniqid";

import { Styled } from "./PreviewViewer.style";
import {
  getOpenFilesForCurrentInstance,
  getActiveFileForCurrentInstance
} from "../../store/selectors";
import {
  NavigationItemType,
  IFileItem,
  IApplicationState
} from "../../shared/globalTypes";
import NavigationItem from "../Navigation/NavigationItem/NavigationItem";
import { AppInstanceActionTypes } from "../../store/actions/appInstanceActions";
import { getActiveFile } from "../../shared/utility";
import { closeFile, setFileActive } from "../../store/actions/appInstance";
import NavigationBar from "../Navigation/NavigationBar/NavigationBar";
import { getRefsForNav } from "../../shared/utilityy";
import { useAfterNavItemAdded } from "../../shared/hooks";
import PopUpDrawer from "../UI/PopUpDrawer/PopUpDrawer";
import ToggleDrawer from "../UI/ToggleDrawer/ToggleDrawer";

interface IStateToProps {
  files: IFileItem[];
  activeFileId: string;
}

interface IDispatchProps {
  closeFile: (id: string) => void;
  setFileActive: (id: string) => void;
}

type PreviewViewerProps = IStateToProps & IDispatchProps;

const PreviewViewer: React.FC<PreviewViewerProps> = ({
  files,
  activeFileId,
  closeFile,
  setFileActive
}) => {
  const [displayPopUp, setDisplayPopUp] = useState(false);
  const myNavRefs = getRefsForNav(files);
  const myNavHeaderRef = useRef<HTMLDivElement>(null);
  useAfterNavItemAdded(files, myNavRefs, myNavHeaderRef.current);
  console.log("RENDERING PREVIEW VIEWER");
  console.log("MY NAV HEADER");
  console.log(myNavHeaderRef);

  const closeFileHandler = (
    event: React.MouseEvent<HTMLDivElement>,
    id: string
  ) => {
    closeFile(id);
    if (files.length === 1) {
      setDisplayPopUp(false);
    }
    event.stopPropagation();
  };

  const setFileActiveHandler = (id: string) => {
    const myRef = myNavRefs[id].current;
    myRef &&
      myRef.scrollIntoView({
        behavior: "smooth",
        inline: "end"
      });
    setFileActive(id);
  };

  const displayPopUpToggleHandler = () => {
    setDisplayPopUp(!displayPopUp);
  };

  const displayPopUpCloseHandler = () => {
    setDisplayPopUp(false);
  };

  const activeFile = getActiveFile(files, activeFileId);

  let content: JSX.Element | null = null;

  const fileItemsNavigation = (
    <NavigationBar display>
      {files.map(file => (
        <NavigationItem
          ref={myNavRefs[file.id]}
          isActive={file.id === activeFileId}
          navigationItemType={NavigationItemType.FILE_INSTANCE}
          key={uniqid()}
          name={file.name}
          close={event => closeFileHandler(event, file.id)}
          setActive={() => setFileActiveHandler(file.id)}
        />
      ))}
    </NavigationBar>
  );

  if (activeFile) {
    content = (
      <Styled.PreviewViewer>
        <Styled.PreviewViewerHeader ref={myNavHeaderRef} id="previewHeader">
          <ToggleDrawer toggle={displayPopUpToggleHandler} />
          <Styled.NavigationContainer>
            {fileItemsNavigation}
          </Styled.NavigationContainer>
        </Styled.PreviewViewerHeader>
        <PopUpDrawer show={displayPopUp} click={displayPopUpCloseHandler}>
          {fileItemsNavigation}
        </PopUpDrawer>
        <Styled.PreviewViewerText>{activeFile.text}</Styled.PreviewViewerText>
      </Styled.PreviewViewer>
    );
  }

  return (
    <Styled.StyledCol
      xs={12}
      md={12}
      lg={6}
      xl={6}
      className="preview-viewer-col"
    >
      {content}
    </Styled.StyledCol>
  );
};

const mapStateToProps = (state: IApplicationState) => {
  return {
    files: getOpenFilesForCurrentInstance(state),
    activeFileId: getActiveFileForCurrentInstance(state.appInstance)
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AppInstanceActionTypes>) => {
  return {
    closeFile: (id: string) => dispatch(closeFile(id)),
    setFileActive: (id: string) => dispatch(setFileActive(id))
  };
};

function shouldNotReRender(
  prevProps: IStateToProps,
  nextProps: IStateToProps
): boolean {
  return (
    prevProps.files.length === nextProps.files.length &&
    prevProps.activeFileId === nextProps.activeFileId
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(PreviewViewer, shouldNotReRender));
