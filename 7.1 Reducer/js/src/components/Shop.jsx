import BasketDisplay from "./BasketDisplay";
import ProductsList from "./ProductsList";
export default function Shop() {
  return (
    <div className="shop">
      <ProductsList />
      <BasketDisplay
        basket={[
          { id: 2, amount: 3 },
          { id: 4, amount: 1 },
          { id: 1, amount: 5 },
        ]}
      />
    </div>
  );
}
