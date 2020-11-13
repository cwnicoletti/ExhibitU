import Project from "../../models/project";
import PROJECTS from "../../data/dummy-data";
import LINKS from "../../data/dummy-data-links";
import PROJECTLINKS from "../../data/dummy-data-project-links";
import PROJECTITEMS from "../../data/dummy-data-project-items";

import {
  UPDATE_PRODUCT,
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  SET_PRODUCTS,
} from "../actions/projects";

const intiailState = {
  allProjects: PROJECTS,
  userProjects: PROJECTS,
  userLinks: LINKS,
  userProjectLinks: PROJECTLINKS,
  userProjectItems: PROJECTITEMS,
};

export default (state = intiailState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        allProjects: action.products,
        userProjects: action.userProducts,
      };
    case CREATE_PRODUCT:
      const newProduct = new Project(
        action.productData.id,
        action.productData.ownerId,
        action.productData.pushToken,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description
      );
      return {
        ...state,
        allProjects: state.allProjects.concat(newProduct),
        userProjects: state.userProjects.concat(newProduct),
      };
    case UPDATE_PRODUCT:
      const productIndex = state.userProjects.findIndex(
        (prod) => prod.id === action.pid
      );
      const updatedProduct = new Project(
        action.pid,
        state.userProjects[productIndex].ownerId,
        state.userProjects[productIndex].pushToken,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description
      );
      const updatedUserProjects = [...state.userProjects];
      updatedUserProjects[productIndex] = updatedProduct;

      const availableProductIndex = state.allProjects.findIndex(
        (prod) => prod.id === action.pid
      );
      const updatedAllProjects = [...state.allProjects];
      updatedAllProjects[availableProductIndex] = updatedProduct;
      return {
        ...state,
        allProjects: updatedAllProjects,
        userProjects: updatedUserProjects,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        allProjects: state.allProjects.filter(
          (product) => product.id !== action.pid
        ),
        userProjects: state.userProjects.filter(
          (product) => product.id !== action.pid
        ),
      };
  }
  return state;
};
