import React from "react";
import renderer from "react-test-renderer";
import ExploreProfileHeader from "../ExploreProfileHeader";

test("renders default", () => {
  const tree = renderer.create(<ExploreProfileHeader />).toJSON();
  expect(tree).toHaveBeenCalled();
});
