export function getFormattedPrice(price, currencySymbol = " €") {
  const formattedPrice =
    (price / 100).toFixed(2).replace(".", ",") + currencySymbol;

  return formattedPrice;
}

export function debounce(fn, ms = 0) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
}
