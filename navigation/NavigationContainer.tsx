import React, { useEffect, useRef } from "react";
import { NavigationActions } from "react-navigation";
import { useAppSelector } from "../hooks";
import MainNavigator from "./MainNavigator";

const NavigationContainer = (props) => {
  const navRef: any = useRef();
  const isAuth = useAppSelector((state) => !!state.auth.token);

  useEffect(() => {
    if (!isAuth) {
      navRef.current.dispatch(
        NavigationActions.navigate({ routeName: "Auth" })
      );
    }
  }, [isAuth]);

  return <MainNavigator ref={navRef} />;
};

export default NavigationContainer;
