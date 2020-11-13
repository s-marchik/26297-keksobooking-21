'use strict';

(function () {
  window.util = {
    getRandomInt: (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    },
    getItemRandom: (items) => {
      const maxIndex = items.length - 1;
      const rndIndex = window.util.getRandomInt(0, maxIndex);
      return items[rndIndex];
    },
    createRandomArr: (items) => {
      let arr = [];
      let i = 0;
      while (i < items.length) {
        arr[i] = items[window.util.getRandomInt(0, items.length)];
        i++;
      }
      return Array.from(new Set(arr));
    },
    errorHandler: (errorMessage) => {
      const node = document.createElement(`div`);
      node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
      node.style.position = `absolute`;
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = `30px`;
      node.textContent = errorMessage;
      document.body.insertAdjacentElement(`afterbegin`, node);
    }
  };
})();
