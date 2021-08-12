// Adds one item to the end of an array and returns the new array.
// Mostly used in reducer to avoid spread operator (giving a performance boost)
export const pushReturn = (arr: any, item: any) => {
  arr.push(item);
  return arr;
};

// Removes one item from the array and returns the new array.
// Mostly used in reducer to avoid spread operator (giving a performance boost)
export const spliceRemoveReturn = (arr: any, item: any) => {
  arr.splice(arr.indexOf(item), 1);
  return arr;
};
