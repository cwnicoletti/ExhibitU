import Product from "../../models/project";
import {
  UPDATE_PRODUCT,
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  SET_PRODUCTS,
} from "../actions/projects";

const intiailState = {
  allProjects: [],
  userProjects: [],
};

export default (state = intiailState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        allProjects: action.products,
        userProjects: action.userProducts,
      };
    case CREATE_PRODUCT:
      const newProduct = new Product(
        action.productData.id,
        action.productData.ownerId,
        action.productData.pushToken,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.price
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
      const updatedProduct = new Product(
        action.pid,
        state.userProjects[productIndex].ownerId,
        state.userProjects[productIndex].pushToken,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        state.userProjects[productIndex].price
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
