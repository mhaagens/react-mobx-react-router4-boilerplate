const utils = {
  sleep: (timeoutMS) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeoutMS);
    });
  }
};

export default utils;
