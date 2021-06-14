const toDateTime = (seconds) => {
  let t = new Date(0); // Epoch
  t.setUTCSeconds(seconds);
  return t;
};

export default toDateTime;
