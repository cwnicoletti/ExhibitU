import Product from "../../models/project";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import * as Config from "../../config";

export const CREATE_PROJECT = "CREATE_PROJECT";
export const UPDATE_PROJECT = "UPDATE_PROJECT";
export const SET_PROJECTS = "SET_PROJECTS";

export const fetchProjects = () => {
  return async (dispatch, getState) => {
    // any async code you want!
    const userId = getState().auth.userId;
    try {
      const response = await fetch(`${Config.url}/feed.json`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();

      const loadedProducts = [];
      for (const key in resData) {
        console.log(resData[key].ownerId);
        loadedProducts.push(
          new Product(
            key,
            resData[key].ownerId,
            resData[key].ownerPushToken,
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }

      dispatch({
        type: SET_PROJECTS,
        products: loadedProducts,
        userProducts: loadedProducts.filter((prod) => prod.ownerId === userId),
      });
    } catch (err) {
      // send to custom analytics center
      throw err;
    }
  };
};

export const createProject = (title, description, imageUrl, price) => {
  return async (dispatch, getState) => {
    // any async code you want!
    let pushToken;
    let statusObj = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (statusObj.status !== "granted") {
      const statusObj = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    }
    if (statusObj.status !== "granted") {
      pushtoken = null;
    } else {
      pushToken = (await Notifications.getExpoPushTokenAsync()).data;
    }
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(`${Config.url}/feed.json?auth=${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl,
        price,
        ownerId: userId,
        ownerPushToken: pushToken,
      }),
    });

    const resData = await response.json();

    dispatch({
      type: CREATE_PROJECT,
      productData: {
        id: resData.name,
        title,
        description,
        imageUrl,
        price,
        ownerId: userId,
        pushToken: pushToken,
      },
    });
  };
};

export const updateProject = (id, title, description, imageUrl) => {
  return async (dispatch, getState) => {
    // any async code you want!
    const token = getState().auth.token;
    await fetch(`${Config.url}/feed/${id}.json?auth=${token}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl,
      }),
    });

    dispatch({
      type: UPDATE_PROJECT,
      pid: id,
      productData: {
        title,
        description,
        imageUrl,
      },
    });
  };
};
