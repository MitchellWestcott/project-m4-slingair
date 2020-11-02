// const asyncLocalStorage = {
//   setItem: async function (key, value) {
//     await null;
//     return localStorage.setItem(key, value);
//   },
//   getItem: async function (key) {
//     await null;
//     return localStorage.getItem(key);
//   },
// };
const asyncLocalStorage = {
  setItem: function (key, value) {
    return Promise.resolve().then(function () {
      localStorage.setItem(key, value);
    });
  },
  getItem: function (key) {
    return Promise.resolve().then(function () {
      return localStorage.getItem(key);
    });
  },
};

export default asyncLocalStorage;
