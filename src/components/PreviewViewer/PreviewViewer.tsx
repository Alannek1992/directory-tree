import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

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
import { StyledNavigationMenu as Files } from "../../shared/styled";
import { AppInstanceActionTypes } from "../../store/actions/appInstanceActions";
import { getActiveFile } from "../../shared/utility";
import { closeFile, setFileActive } from "../../store/actions/appInstance";

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
  console.log("RENDERING PREVIEW VIEWER");

  const closeFileHandler = (
    event: React.MouseEvent<HTMLDivElement>,
    id: string
  ) => {
    closeFile(id);
    event.stopPropagation();
  };

  const setFileActiveHandler = (id: string) => {
    setFileActive(id);
  };

  const activeFile = getActiveFile(files, activeFileId);

  let content: JSX.Element | null = null;

  if (activeFile) {
    content = (
      <Styled.PreviewViewer>
        <Styled.PreviewViewerHeader>
          <Files>
            {files.map(file => (
              <NavigationItem
                isActive={file.id === activeFileId}
                navigationItemType={NavigationItemType.FILE_INSTANCE}
                key={file.id}
                name={file.name}
                close={event => closeFileHandler(event, file.id)}
                setActive={() => setFileActiveHandler(file.id)}
              />
            ))}
          </Files>
        </Styled.PreviewViewerHeader>
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
