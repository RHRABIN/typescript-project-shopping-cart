import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import allCarts from "../data/items.json";
import { formateCurrency } from "../utilities/formatCurrency";
import { CartItem } from "./CartItem";

type ShoppingCartProps = {
  isOpen: boolean;
};
export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useShoppingCart();
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((cart) => (
            <CartItem key={cart.id} {...cart} />
          ))}
          <div className="ms-auto fs-5 fw-bold">
            Total:{" "}
            {formateCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = allCarts.find((c) => c.id === cartItem.id);
                return total + (item?.price || 0) * cartItem.quantity;
              }, 0)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
