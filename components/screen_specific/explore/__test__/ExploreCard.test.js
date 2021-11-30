import React from "react";
import renderer from "react-test-renderer";
import ExploreCard from "../ExploreCard";

test("matches previous snapshot and renders correctly", () => {
  const tree = renderer.create(<ExploreCard />).toJSON();
  expect(tree).toMatchSnapshot();
});
