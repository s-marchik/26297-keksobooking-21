'use strict';
(() => {
  const URL = `https://21.javascript.pages.academy/keksobooking/data`;
  const STATUSE_CODE = {
    OK: 200
  };
  const TIMEOUT = 10000;

  window.load = (onSuccess, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      if (xhr.status === STATUSE_CODE.OK) {
        onSuccess(xhr.response);
        window.pin.loadedPins = xhr.response;
      } else {
        onError(`Произошла ошибка: ${xhr.status}`);
      }
    });

    xhr.addEventListener(`error`, () => {
      onError(`Ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, () => {
      onError(`Превышено вермя ожидания (${xhr.timeout}мс)`);
    });

    xhr.timeout = TIMEOUT;
    xhr.open(`GET`, URL);
    xhr.send();
  };
})();
