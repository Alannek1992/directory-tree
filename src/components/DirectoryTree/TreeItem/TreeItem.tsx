import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import ITreeItem from "./ITreeItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinusSquare,
  faPlusSquare,
  faExternalLinkAlt
} from "@fortawesome/free-solid-svg-icons";

import Spinner from "../../UI/Spinner/Spinner";
import "./TreeItem.css";
import { TreeItemType, IApplicationState } from "../../../shared/globalTypes";
import { isFileDownloaded, isFileOpened } from "../../../store/selectors";

const DEFAULT_PADDING = 0.75;
const ICON_SIZE = 2;
const LEVEL_SPACE = 1.75;
let ToggleIcon = ({ on }: { on: boolean }) => (
  <div role="img" aria-label="Toggle" className="toggle-icon-symbol">
    {on ? (
      <FontAwesomeIcon icon={faMinusSquare} />
    ) : (
      <FontAwesomeIcon icon={faPlusSquare} />
    )}
  </div>
);

interface IMapStateToProps {
  fileDownloaded?: boolean;
  fileOpened?: boolean;
}

export type TreeItemProps = ITreeItem & IMapStateToProps;

const TreeItem: React.FunctionComponent<TreeItemProps> = ({
  hasNodes = false,
  isOpen = false,
  level = 0,
  toggleNode,
  key,
  label = "unknown",
  style = {},
  type = TreeItemType.FOLDER,
  initialToggleNode,
  loadFile,
  openFile,
  children,
  fileDownloaded,
  fileOpened
}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading && toggleNode) {
      toggleNode();
      setLoading(false);
    }
  }, [loading, toggleNode]);

  useEffect(() => {
    if (loading && type === TreeItemType.EMPTY_FOLDER) {
      setLoading(false);
    }
  }, [loading, type]);

  useEffect(() => {
    if (fileDownloaded && openFile && loading) {
      openFile(key);
      setLoading(false);
    }
  }, [fileDownloaded, openFile, loading, key]);

  const toggleIcon = (
    <div
      className="toggle-icon"
      onClick={e => {
        if (toggleNode) {
          toggleNode();
        } else if (initialToggleNode) {
          setLoading(true);
          initialToggleNode(key);
        }
        e.stopPropagation();
      }}
    >
      {loading ? <Spinner /> : <ToggleIcon on={isOpen} />}
    </div>
  );

  console.log("RENDERING TREE ITEM");

  return (
    <li
      className="tree-item"
      style={{
        paddingLeft: `${DEFAULT_PADDING + ICON_SIZE + level * LEVEL_SPACE}rem`,
        ...style
      }}
      role="button"
      key={key}
    >
      <div
        className={
          hasNodes || type === TreeItemType.FOLDER
            ? "toggle-icon"
            : "toggle-icon toggle-icon-invisible"
        }
      >
        {toggleIcon}
      </div>
      <div className="tree-item-icon">{children}</div>
      {label}
      {type === TreeItemType.FILE && loadFile && openFile ? (
        <div
          className={!fileOpened ? "file-symbol" : "file-symbol disable"}
          onClick={
            !fileDownloaded
              ? e => {
                  setLoading(true);
                  loadFile(key);
                  e.stopPropagation();
                }
              : e => {
                  openFile(key);
                  e.stopPropagation();
                }
          }
        >
          <FontAwesomeIcon icon={faExternalLinkAlt} />
        </div>
      ) : null}
    </li>
  );
};

const mapStateToProps = (state: IApplicationState, props: TreeItemProps) => {
  return {
    fileDownloaded: isFileDownloaded(state, props.id),
    fileOpened: isFileOpened(state, props.id)
  };
};

export default connect(
  mapStateToProps,
  null
)(TreeItem);
