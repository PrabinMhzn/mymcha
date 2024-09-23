import { useCart } from "@/components/CartContext";
import { X, Plus, Minus } from "lucide-react";
import Image from "next/image";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-2xl font-bold">Your Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex-grow overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center mb-4 pb-4 border-b"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="rounded-md"
                />
                <div className="ml-4 flex-grow">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <Minus size={20} />
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-gray-500 hover:text-gray-700 ml-4"
                >
                  <X size={20} />
                </button>
              </div>
            ))
          )}
        </div>
        <div className="p-4 border-t">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold">Total:</span>
            <span className="font-bold text-xl">${cartTotal.toFixed(2)}</span>
          </div>
          <button
            onClick={() => {
              /* Handle checkout */
            }}
            className="w-full bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-800 transition duration-300"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
