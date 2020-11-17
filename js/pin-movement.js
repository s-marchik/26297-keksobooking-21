'use strict';

(function () {
  const MAP_PIN_WIDTH = 65;
  const MAP_PIN_HEIGHT = 84;

  const pinMain = document.querySelector(`.map__pin--main`);

  window.movement = {
    movePinMain: (evt) => {
      evt.preventDefault();

      let startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      const onMouseMove = function (moveEvt) {
        let shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        const locationOfpinMainY = (pinMain.offsetTop - shift.y) + MAP_PIN_HEIGHT;
        const locationOfpinMainX = (pinMain.offsetLeft - shift.x) + MAP_PIN_WIDTH / 2;

        if ((locationOfpinMainX >= 0 && locationOfpinMainX < document.querySelector(`.map`).offsetWidth) && (locationOfpinMainY >= 130 && locationOfpinMainY <= 630)) {
          pinMain.style.left = `${pinMain.offsetLeft - shift.x}px`;
          pinMain.style.top = `${pinMain.offsetTop - shift.y}px`;
          window.form.setAddressFromPinPosition(pinMain.offsetLeft - shift.x, pinMain.offsetTop - shift.y);
        }
      };

      const onMouseUp = function () {
        window.form.setAddressFromPinPosition(pinMain.offsetLeft, pinMain.offsetTop);
        document.removeEventListener(`mousemove`, onMouseMove);
        document.removeEventListener(`mouseup`, onMouseUp);
      };

      document.addEventListener(`mousemove`, onMouseMove);
      document.addEventListener(`mouseup`, onMouseUp);
    }
  };
})();
