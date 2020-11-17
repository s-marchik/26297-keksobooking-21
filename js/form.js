'use strict';

(function () {
  const MAP_PIN_WIDTH = 65;
  const MAP_PIN_HEIGHT = 84;
  const MAP_PIN_MAIN_DEF_POS_X = 570;
  const MAP_PIN_MAIN_DEF_POS_Y = 375;

  const adForm = document.querySelector(`.ad-form`);
  const addressInput = adForm.querySelector(`input[name=address]`);
  const titleInput = adForm.querySelector(`input[name=title]`);
  const priceInput = adForm.querySelector(`input[name=price]`);
  const typeInput = adForm.querySelector(`select[name=type]`);
  const timeInInput = adForm.querySelector(`select[name=timein]`);
  const timeOutInput = adForm.querySelector(`select[name=timeout]`);
  const roomsInput = adForm.querySelector(`select[name=rooms]`);
  const capacityInput = adForm.querySelector(`select[name=capacity]`);
  const main = document.querySelector(`main`);
  const map = document.querySelector(`.map`);
  const mapFilters = document.querySelector(`.map__filters`);
  const pinMain = document.querySelector(`.map__pin--main`);
  const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
  const successTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
  const resetBtn = document.querySelector(`.ad-form__reset`);

  const PriceMinByType = {
    bungalow: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  let changeValue = function (form, ability) {
    const fieldsets = form.querySelectorAll(`fieldset`);
    const selects = form.querySelectorAll(`select`);

    for (let fieldset of fieldsets) {
      fieldset.disabled = !ability;
    }

    for (let select of selects) {
      select.disabled = !ability;
    }
  };

  let matchPriceMinToType = function (i) {
    priceInput.min = priceInput.placeholder = PriceMinByType[i];
  };

  let matchTimeOut = function () {
    timeInInput.value = timeOutInput.value;
  };

  let matchTimeIn = function () {
    timeOutInput.value = timeInInput.value;
  };

  let validatePrice = function () {
    if (+priceInput.value < priceInput.min) {
      priceInput.setCustomValidity(`Цена меньше минимальной`);
    } else if (+priceInput.value > priceInput.max) {
      priceInput.setCustomValidity(`Цена больше минимальной`);
    } else {
      priceInput.setCustomValidity(``);
    }

    priceInput.reportValidity();
  };

  let validateTitle = function () {
    if (titleInput.value.length < titleInput.minLength) {
      titleInput.setCustomValidity(`Заголовок должен быть из ${titleInput.minLength} символов`);
    } else if (titleInput.value.length > titleInput.maxLength) {
      titleInput.setCustomValidity(`Заголовок не должен быть больше ${titleInput.maxLength} символов`);
    } else {
      titleInput.setCustomValidity(``);
    }
    titleInput.reportValidity();
  };

  let matchRoomsAndCapacity = function () {
    if (+capacityInput.value === 0 && +roomsInput.value !== 100 || +capacityInput.value !== 0 && +roomsInput.value === 100) {
      roomsInput.setCustomValidity(`Неправильное значение`);
      capacityInput.setCustomValidity(`Неправильное значение`);
    } else if (+capacityInput.value > roomsInput.value) {
      roomsInput.setCustomValidity(`Неправильное значение`);
      capacityInput.setCustomValidity(`Неправильное значение`);
    } else {
      roomsInput.setCustomValidity(``);
      capacityInput.setCustomValidity(``);
    }

    roomsInput.reportValidity();
    capacityInput.reportValidity();
  };

  let resetPrice = function () {
    matchPriceMinToType(`flat`);
  };

  let resetRoomCapacity = function () {
    capacityInput.value = 1;
  };

  typeInput.addEventListener(`change`, (event) => {
    matchPriceMinToType(event.target.value);
  });
  timeInInput.addEventListener(`change`, matchTimeIn);
  timeOutInput.addEventListener(`change`, matchTimeOut);
  titleInput.addEventListener(`input`, validateTitle);
  priceInput.addEventListener(`input`, validatePrice);
  roomsInput.addEventListener(`input`, matchRoomsAndCapacity);
  capacityInput.addEventListener(`input`, matchRoomsAndCapacity);

  const hideSuccessMessage = (evt) => {
    evt.preventDefault();
    const message = main.querySelector(`.success`);
    main.removeChild(message);
    document.removeEventListener(`click`, hideSuccessMessage);
    document.removeEventListener(`keydown`, hideSuccessMessageByEsc);
  };

  const hideSuccessMessageByEsc = (evt) => {
    if (evt.key === `Escape`) {
      hideSuccessMessage(evt);
    }
  };

  const setSuccessMessage = () => {
    const successMessage = successTemplate.cloneNode(true);
    main.appendChild(successMessage);
    document.addEventListener(`click`, hideSuccessMessage);
    document.addEventListener(`keydown`, hideSuccessMessageByEsc);
    window.form.setDefForm();
    window.pin.resetPinMain();
  };

  const hideErrorMessage = (evt) => {
    evt.preventDefault();
    const message = main.querySelector(`.error`);
    main.removeChild(message);
    document.removeEventListener(`click`, hideErrorMessage);
    document.removeEventListener(`keydown`, hideErrorMessageByEsc);
  };

  const hideErrorMessageByEsc = (evt) => {
    if (evt.key === `Escape`) {
      hideErrorMessage(evt);
    }
  };

  const setErrorMessage = () => {
    const errorMessage = errorTemplate.cloneNode(true);
    main.appendChild(errorMessage);
    document.addEventListener(`click`, hideErrorMessage);
    document.addEventListener(`keydown`, hideErrorMessageByEsc);
    const btnErr = document.querySelector(`.error__button`);
    btnErr.addEventListener(`click`, hideErrorMessage);
  };

  adForm.addEventListener(`submit`, (evt) => {
    window.load.sendData(new FormData(adForm), () => {
      window.pin.removePins();
      window.card.removeCard();
      adForm.reset();
      resetPrice();
      window.pin.resetPinMain();
      setSuccessMessage();
    }, setErrorMessage);
    evt.preventDefault();
  });

  resetBtn.addEventListener(`click`, () => {
    adForm.reset();
    mapFilters.reset();
    window.pin.resetPinMain();
    window.form.setDefForm();
  });

  window.form = {
    showForm: () => {
      map.classList.remove(`map--faded`);
      adForm.classList.remove(`ad-form--disabled`);
      window.form.setAddressFromPinPosition(pinMain.offsetLeft, pinMain.offsetTop);
      changeValue(adForm, true);
      changeValue(mapFilters, true);
    },

    getMainPinPosLeft: (x) => {
      return parseInt(parseInt(x, 10) + MAP_PIN_WIDTH / 2, 10);
    },

    getMainPinPosTop: (y) => {
      return parseInt(parseInt(y, 10) + MAP_PIN_HEIGHT, 10);
    },

    setAddressFromPinPosition: (xPinPoint, yPinPoint) => {
      addressInput.value = `${window.form.getMainPinPosLeft(xPinPoint)}, ${window.form.getMainPinPosTop(yPinPoint)}`;
    },

    setDefForm: () => {
      map.classList.add(`map--faded`);
      adForm.classList.add(`ad-form--disabled`);
      changeValue(adForm, false);
      changeValue(mapFilters, false);
      resetPrice();
      resetRoomCapacity();
      window.form.setAddressFromPinPosition(MAP_PIN_MAIN_DEF_POS_X, MAP_PIN_MAIN_DEF_POS_Y);
    }
  };

  window.form.setDefForm();

})();
