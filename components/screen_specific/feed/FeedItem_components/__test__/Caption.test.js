import React from "react";
import renderer from "react-test-renderer";
import Caption from "../Caption";

test("matches previous snapshot and renders correctly", () => {
  const tree = renderer.create(<Caption />).toJSON();
  expect(tree).toMatchSnapshot();
});
