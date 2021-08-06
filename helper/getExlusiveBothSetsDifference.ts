const getExlusiveBothSetsDifference = (arr1, arr2) => {
  const difference = arr1
    .filter((x) => !arr2.includes(x))
    .concat(arr2.filter((x) => !arr1.includes(x)));
  return difference;
};

export default getExlusiveBothSetsDifference;
