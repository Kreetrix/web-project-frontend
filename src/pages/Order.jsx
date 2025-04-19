import { useState } from "react";
import DeliveryForm from "../components/Order/DeliveryForm";
import PaymentMethod from "../components/Order/PaymentMethod";
import Cart from "../components/Order/Cart";

function Order() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [paymentMethod, setPaymentMethod] = useState("")


    const [cartItems, setCartItems] = useState([
        { id: 1, name: "Classic Burger", price: 9.90, quantity: 1 },
        { id: 2, name: "Ranskalaiset", price: 5.80, quantity: 2 },
    ]);

    const removeFromCart = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };


    return (
        <main className="container mx-auto px-4 py-8">
            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <h2 className="text-3xl font-bold mb-6 text-yellow-600">Tee tilaus</h2>

                    <DeliveryForm
                        firstName={firstName}
                        setFirstName={setFirstName}
                        lastName={lastName}
                        setLastName={setLastName}
                        address={address}
                        setAddress={setAddress}
                        phone={phone}
                        setPhone={setPhone}
                        email={email}
                        setEmail={setEmail}
                    />


                    <PaymentMethod
                        paymentMethod={paymentMethod}
                        setPaymentMethod={setPaymentMethod}
                    />
                </div>

                <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
            </div>
        </main>
    );
}

export default Order;
