import { FC } from "react";
import { Button, Card } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formateCurrency } from "../utilities/formatCurrency";

type StoreProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

const StoreItem: FC<StoreProps> = ({ id, name, price, imgUrl }) => {
  const {
    decreaseCartQuantity,
    removeFromCart,
    getItemQuantity,
    increaseCartQuantity,
  } = useShoppingCart();

  const quantity = getItemQuantity(id);
  console.log(quantity);
  return (
    <Card className="h-100">
      <Card.Img
        src={imgUrl}
        height={"200px"}
        variant="top"
        style={{ objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted">{formateCurrency(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button className="w-100" onClick={() => increaseCartQuantity(id)}>
              + Add To Cart
            </Button>
          ) : (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: ".5rem" }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
              >
                <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                <div>
                  <span className="fs-3">{quantity}</span> in cart
                </div>
                <Button onClick={() => increaseCartQuantity(id)}>+</Button>
              </div>
              <Button
                onClick={() => removeFromCart(id)}
                variant="danger"
                size="sm"
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default StoreItem;
