import React from "react";
import renderer from "react-test-renderer";
import UserTitle from "../UserTitle";

test("matches previous snapshot and renders correctly", () => {
  const tree = renderer.create(<UserTitle />).toJSON();
  expect(tree).toMatchSnapshot();
});
