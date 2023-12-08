const sleep = function (s) {
  return new Promise((res) => setTimeout(res, s * 1000));
};

export default sleep;
