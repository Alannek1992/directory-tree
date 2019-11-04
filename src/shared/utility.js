import _ from "underscore";
import uniqid from "uniqid";
import { TreeItemType } from "./globalTypes";
import ApolloClientProvider from "../graphql/ApolloClientProvider";
import * as Queries from "./queries";

export const unflatten = (array, parent, tree) => {
  tree = typeof tree !== "undefined" ? tree : [];
  parent = typeof parent !== "undefined" ? parent : { id: "0" };

  var children = _.filter(array, function(child) {
    return child.parentid === parent.id;
  });

  if (!_.isEmpty(children)) {
    if (parent.id === "0") {
      tree = children;
    } else {
      parent["nodes"] = children;
    }
    _.each(children, function(child) {
      unflatten(array, child);
    });
  }

  return tree;
};

export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};

export const adjustArray = (arrayOfItems, parentid) => {
  return arrayOfItems.map(element => {
    return {
      id: element.id,
      label: element.name,
      parentid: parentid ? parentid : "0",
      type:
        arrayOfItems.length === 0 ? TreeItemType.EMPTY_FOLDER : element.type,
      key: element.id
    };
  });
};

export const generateNewAppInstance = () => {
  return {
    id: uniqid(),
    openFiles: [],
    openNodes: [],
    activeFile: ""
  };
};

export const adjustLoadedFile = loadedFile => {
  return {
    id: loadedFile.id,
    name: loadedFile.name,
    text: loadedFile.text
  };
};

export const getActiveAppInstance = (appInstances, activeInstanceId) => {
  return appInstances.find(appInstance => appInstance.id === activeInstanceId);
};

export const getActiveFile = (files, activeFileId) => {
  return files.find(file => file.id === activeFileId);
};

export const recursiveLoadNodes = async nodes => {
  async function recursivelyFetchNodes(nodes) {
    let nodesToStore = [];

    for (const node of nodes) {
      if (node.type === TreeItemType.FOLDER) {
        try {
          const response = await ApolloClientProvider.client.query({
            query: Queries.LOAD_NEW_NODE,
            variables: { parentId: node.id }
          });

          const fetchedNodes = adjustArray(response.data.getList, node.id);

          if (fetchedNodes.length === 0) {
            node.type = TreeItemType.EMPTY_FOLDER;
          } else {
            const nestedNodes = await recursivelyFetchNodes(fetchedNodes);
            nodesToStore = [...nodesToStore, ...fetchedNodes, ...nestedNodes];
          }
        } catch (error) {
          throw error;
        }
      }
    }

    return nodesToStore;

    
  }

  const filteredNodes = nodes.filter(node => {
    return (
      node.type === TreeItemType.FOLDER &&
      !nodes.some(childNode => {
        return node.id === childNode.parentid;
      })
    );
  });

  const fetchedNodes = recursivelyFetchNodes(filteredNodes);

  return fetchedNodes;
};

export const transformIntoTreeForm = nodes => {
  const folderNodes = nodes.filter(node => node.type === TreeItemType.FOLDER);

  function findKeyName(key) {
    if (key.parentid && key.parentid !== "0") {
      return (
        findKeyName(folderNodes.find(node => node.id === key.parentid)) +
        "/" +
        key.id
      );
    } else {
      return key.id;
    }
  }

  const transformedKeys = folderNodes.map(node => {
    return findKeyName(node);
  });

  return transformedKeys;
};
