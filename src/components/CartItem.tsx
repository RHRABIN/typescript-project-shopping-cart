import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import allCarts from "../data/items.json";
import { formateCurrency } from "../utilities/formatCurrency";

type CartItemProps = {
  id: number;
  quantity: number;
};
export function CartItem({ id, quantity }: CartItemProps) {
  const { removeFromCart } = useShoppingCart();
  const cart = allCarts.find((c) => c.id === id);
  if (cart == null) return null;

  return (
    <Stack
      direction="horizontal"
      className="d-flex justify-content-center align-items-center"
      gap={2}
    >
      <img
        src={cart.imgUrl}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto ">
        <div>
          {cart.name}{" "}
          {quantity > 1 && <span className="text-muted">x{quantity}</span>}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formateCurrency(cart.price)}
        </div>
      </div>
      <div>{formateCurrency(cart.price * quantity)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(id)}
      >
        &times;
      </Button>
    </Stack>
  );
}
