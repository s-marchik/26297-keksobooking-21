'use strict';

(function () {
  const PriceGrade = {
    LOW_TOP: 9999,
    MIDDLE_TOP: 50000
  };

  const formFilter = document.querySelector(`.map__filters`);
  const DEF_VALUE = `any`;
  const Filter = {
    TYPE: formFilter.querySelector(`#housing-type`),
    PRICE: formFilter.querySelector(`#housing-price`),
    ROOMS: formFilter.querySelector(`#housing-rooms`),
    GUESTS: formFilter.querySelector(`#housing-guests`),
    FEATURES: formFilter.querySelector(`#housing-features`),
  };

  const filterOffersType = (offers) => {
    if (Filter.TYPE.value === DEF_VALUE) {
      return offers;
    }
    const offersCopy = offers.filter(function (element) {
      return element.offer.type === Filter.TYPE.value;
    });
    return offersCopy;
  };

  const filterOffersPrice = (offers) => {
    let offersCopy = offers;
    switch (Filter.PRICE.value) {
      case DEF_VALUE:
        break;
      case `low`:
        offersCopy = offersCopy.filter(function (element) {
          return (element.offer.price <= PriceGrade.LOW_TOP);
        });
        break;
      case `middle`:
        offersCopy = offersCopy.filter(function (element) {
          return (element.offer.price > PriceGrade.LOW_TOP && element.offer.price <= PriceGrade.MIDDLE_TOP);
        });
        break;
      case `high`:
        offersCopy = offersCopy.filter(function (element) {
          return (element.offer.price > PriceGrade.MIDDLE_TOP);
        });
        break;
    }
    return offersCopy;
  };

  const filterOffersRooms = (offers) => {
    if (Filter.ROOMS.value === DEF_VALUE) {
      return offers;
    }
    const offersCopy = offers.filter(function (element) {
      return element.offer.rooms === parseInt(Filter.ROOMS.value, 10);
    });
    return offersCopy;
  };

  const filterOffersGuests = (offers) => {
    if (Filter.GUESTS.value === DEF_VALUE) {
      return offers;
    }
    const offersCopy = offers.filter(function (element) {
      return element.offer.guests === parseInt(Filter.GUESTS.value, 10);
    });
    return offersCopy;
  };

  const isOfferIncludesFeatures = (offer) => {
    const checkedFeatures = Array.from(Filter.FEATURES.querySelectorAll(`.map__checkbox:checked`));
    const offerIncludesFeatures = checkedFeatures.every(function (checkedFeature) {
      const offerIncludesFeature = offer.offer.features.some(function (offerFeature) {
        return checkedFeature.value === offerFeature;
      });
      return offerIncludesFeature;
    });

    return offerIncludesFeatures;
  };

  const filterOffersFeatures = (offers) => {
    const offersCopy = offers.filter(isOfferIncludesFeatures);
    return offersCopy;
  };

  const filterOffers = (offers) => {
    let filteredOffers = filterOffersType(offers);
    filteredOffers = filterOffersPrice(filteredOffers);
    filteredOffers = filterOffersRooms(filteredOffers);
    filteredOffers = filterOffersGuests(filteredOffers);
    filteredOffers = filterOffersFeatures(filteredOffers);

    return filteredOffers;
  };

  formFilter.addEventListener(`change`, function () {
    window.card.removeCard();
    window.pin.removePins();
    filterOffers(window.pin.loadedPins);
    window.pin.showPins(filterOffers(window.pin.loadedPins));
  });
})();
