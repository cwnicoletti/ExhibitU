import React from "react";
import renderer from "react-test-renderer";
import UpdateCard from "../UpdateCard";

test("matches previous snapshot and renders correctly", () => {
  const tree = renderer.create(<UpdateCard />).toJSON();
  expect(tree).toMatchSnapshot();
});
