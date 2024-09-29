import { useCart } from "@/components/CartContext";
import { X, Plus, Minus, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-black opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div
          ref={modalRef}
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full md:max-w-2xl lg:max-w-4xl"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white">
            <div className="flex justify-between items-center p-6 bg-neutral-950 text-white">
              <h2
                id="modal-headline"
                className="text-2xl font-bold flex items-center"
              >
                <ShoppingCart className="mr-3" size={24} /> Your Cart
              </h2>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-300 transition-colors"
                aria-label="Close"
              >
                <X size={24} />
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64">
                  <ShoppingCart size={64} className="text-gray-300 mb-4" />
                  <p className="text-xl text-gray-500 mb-4">
                    Your cart is empty
                  </p>
                  <button
                    onClick={onClose}
                    className="bg-neutral-950 text-white px-6 py-2 rounded-md font-semibold hover:bg-neutral-800 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div>
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center py-4 border-b border-gray-200 last:border-b-0"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="rounded-md object-cover"
                      />
                      <div className="ml-4 flex-grow">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-gray-600 mt-1">
                          ${item.price.toFixed(2)}
                        </p>
                        <div className="flex items-center mt-2">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                Math.max(item.quantity - 1, 0)
                              )
                            }
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                          >
                            <Minus size={18} />
                          </button>
                          <span className="mx-3 text-lg font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                          >
                            <Plus size={18} />
                          </button>
                        </div>
                      </div>
                      <p className="font-semibold text-lg mr-4">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {cartItems.length > 0 && (
              <div className="p-6 bg-gray-50 border-t border-gray-200">
                <div className="flex justify-between items-center mb-6">
                  <span className="font-semibold text-xl">Total:</span>
                  <span className="font-bold text-2xl">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={() => {
                    /* Handle checkout */
                  }}
                  className="w-full bg-neutral-950 text-white py-3 rounded-md font-semibold text-lg hover:bg-neutral-800 transition-colors"
                >
                  Proceed to Checkout
                </button>
                <button
                  onClick={onClose}
                  className="w-full mt-3 border border-gray-300 text-gray-700 py-2 rounded-md font-semibold hover:bg-gray-100 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
