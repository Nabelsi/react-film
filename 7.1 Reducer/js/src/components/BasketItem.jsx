import { getFormattedPrice } from "../helpers";
import products from "../products";
export default function BasketItem({ id, amount }) {
  const product = getProductWithId(id);

  if (!product) {
    return null;
  }

  const { title, price } = product;

  return (
    <li className="basket-item">
      <span className="basket-item__amount">{amount} &times; </span>
      <span className="basket-item__title">{title}: </span>
      <span className="basket-item__price">
        {getFormattedPrice(price * amount)}
      </span>
      <div className="basket-item__buttons">
        <button
          disabled={Boolean(amount <= 0)}
          className="basket-item__button"
          aria-label={`${title} minus eins`}
        >
          -
        </button>
        <button
          className="basket-item__button"
          aria-label={`${title} plus eins`}
        >
          +
        </button>
        <button
          className="basket-item__button"
          aria-label={`${title} aus Warenkorb löschen`}
        >
          &times;
        </button>
      </div>
    </li>
  );
}

function getProductWithId(searchedId) {
  return products.find(({ id }) => id === searchedId);
}
