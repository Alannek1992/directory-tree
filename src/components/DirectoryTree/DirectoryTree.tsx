import React, { useEffect, useRef, Fragment } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import TreeMenu from "react-simple-tree-menu";
import { Col } from "react-bootstrap";

import { unflatten, transformIntoTreeForm } from "../../shared/utility";
import { usePrevious } from "../../shared/hooks";
import {
  TreeItemType,
  IAppInstanceDataStructure,
  IApplicationState
} from "../../shared/globalTypes";
import TreeItem from "./TreeItem/TreeItem";
import TreeItemIcon from "./TreeItem/TreeItemIcon/TreeItemIcon";
import { IDirectoryItemDataStructure } from "../../shared/globalTypes";
import Spinner from "../UI/Spinner/Spinner";
import "./DirectoryTree.css";
import { getActiveAppInstance } from "../../store/selectors";
import { ManipulateTreeButton } from "../../shared/styled";
import {
  initDirectoryTree,
  loadNewNode,
  loadAllNewNodes
} from "../../store/actions/directoryTree";
import { loadFile } from "../../store/actions/file";
import {
  openFile,
  cacheOpenNodes,
  createNewAppInstance
} from "../../store/actions/appInstance";
import { GlobalActionTypes } from "../../store/actions/globalActionTypes";
import withErrorHandler from "../../hoc/ErrorHandler/withErrorHandler";
import PopUpDrawer from "../UI/PopUpDrawer/PopUpDrawer";

interface IMapStateToProps {
  treeData: IDirectoryItemDataStructure[];
  activeInstance: IAppInstanceDataStructure | null;
}

interface IDispatchProps {
  initDirectoryTree: () => void;
  loadNewNode: (parentId: string) => void;
  loadFile: (id: string) => void;
  openFile: (id: string) => void;
  cacheOpenNodes: (openNodes: string[], prevActiveInstanceId: string) => void;
  loadAllNewNodes: (currentNodes: IDirectoryItemDataStructure[]) => void;
  addNewInstance: () => void;
}

type DirectoryTreeProps = IMapStateToProps & IDispatchProps;

const DirectoryTree: React.FC<DirectoryTreeProps> = ({
  treeData,
  activeInstance,
  initDirectoryTree,
  loadNewNode,
  loadFile,
  openFile,
  cacheOpenNodes,
  loadAllNewNodes,
  addNewInstance
}) => {
  const openNodes = useRef<TreeMenu>(null);
  const cachedActiveInstanceId: string | undefined = usePrevious(
    activeInstance ? activeInstance.id : undefined
  );
  const toggledNodes = useRef<boolean>(false);

  useEffect(() => {
    initDirectoryTree();
  }, [initDirectoryTree]);

  useEffect(() => {
    if (
      activeInstance &&
      openNodes.current &&
      cachedActiveInstanceId &&
      activeInstance.id !== cachedActiveInstanceId
    ) {
      cacheOpenNodes(openNodes.current.state.openNodes, cachedActiveInstanceId);
      openNodes.current.reset(activeInstance.openNodes);
    }
  }, [activeInstance, cacheOpenNodes, cachedActiveInstanceId]);

  useEffect(() => {
    if (toggledNodes.current && openNodes.current) {
      openNodes.current.reset(transformIntoTreeForm(treeData));
    }
  }, [treeData]);


  const initNodeHandler = (parentId: string) => {
    loadNewNode(parentId);
  };

  const loadFileHandler = (id: string) => {
    loadFile(id);
  };

  const openFileHandler = (id: string) => {
    openFile(id);
  };

  let content: null | JSX.Element = null;
  if (activeInstance) {
    content =
      treeData.length === 0 ? (
        <Spinner />
      ) : (
        <TreeMenu data={unflatten(treeData)} hasSearch={false} ref={openNodes}>
          {({ items, reset }) => (
            <Fragment>
              <ManipulateTreeButton
                onClick={() => {
                  if (reset) {
                    reset([]);
                  }
                }}
              >
                Collapse
              </ManipulateTreeButton>
              <ManipulateTreeButton
                onClick={() => {
                  if (toggledNodes.current && reset) {
                    reset(transformIntoTreeForm(treeData));
                  } else {
                    loadAllNewNodes(treeData);
                    toggledNodes.current = true;
                  }
                }}
              >
                Expand All
              </ManipulateTreeButton>
              <ul className="tree-list">
                {items.map(({ key, ...props }) => (
                  <TreeItem
                    {...props}
                    key={props.id}
                    focused={false}
                    type={props.type}
                    initialToggleNode={
                      !props.toggleNode
                        ? () => initNodeHandler(props.id)
                        : undefined
                    }
                    loadFile={
                      props.type === TreeItemType.FILE
                        ? () => loadFileHandler(props.id)
                        : undefined
                    }
                    openFile={
                      props.type === TreeItemType.FILE
                        ? () => openFileHandler(props.id)
                        : undefined
                    }
                  >
                    <TreeItemIcon type={props.type} />
                  </TreeItem>
                ))}
              </ul>
            </Fragment>
          )}
        </TreeMenu>
      );
  }

  console.log("RENDERING TREE");

  return (
    <Col xs={12} md={12} lg={6} xl={6} className="directory-tree-col">
      <PopUpDrawer show={!activeInstance} click={addNewInstance}>
        <span>Click to create new application instance</span>
      </PopUpDrawer>
      <div className="directory-tree">{content}</div>
    </Col>
  );
};

const mapStateToProps = ({ directoryTree, appInstance }: IApplicationState) => {
  return {
    treeData: directoryTree.treeStructure,
    activeInstance: getActiveAppInstance(appInstance)
  };
};

const mapDispatchToProps = (dispatch: Dispatch<GlobalActionTypes>) => {
  return {
    initDirectoryTree: () => dispatch(initDirectoryTree()),
    loadNewNode: (parentId: string) => dispatch(loadNewNode(parentId)),
    loadFile: (id: string) => dispatch(loadFile(id)),
    openFile: (id: string) => dispatch(openFile(id)),
    cacheOpenNodes: (openNodes: string[], prevActiveInstanceId: string) =>
      dispatch(cacheOpenNodes(openNodes, prevActiveInstanceId)),
    loadAllNewNodes: (currentNodes: IDirectoryItemDataStructure[]) =>
      dispatch(loadAllNewNodes(currentNodes)),
    addNewInstance: () => dispatch(createNewAppInstance())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(DirectoryTree));
