import React, { useEffect } from "react";
import { useAuth } from "/src/contexts/AuthContext";
import Text from "../locales/Text";

const DeliveryForm = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  address,
  setAddress,
  phone,
  setPhone,
  email,
  setEmail,
  deliveryTime,
  setDeliveryTime,
  setIsFormValid,
}) => {
  // TODO NEED TO REMAKE THIS
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      user.firstName && setFirstName(user.firstName);
      user.lastName && setLastName(user.lastName);
      user.email && setEmail(user.email);
      user.phone && setPhone(user.phone);
    }
  }, [user, setFirstName, setLastName, setEmail, setPhone]);

  useEffect(() => {
    const isValid =
      firstName.trim() &&
      lastName.trim() &&
      address.trim() &&
      phone.trim() &&
      email.trim() &&
      deliveryTime;
    setIsFormValid(isValid);
  }, [
    firstName,
    lastName,
    address,
    phone,
    email,
    deliveryTime,
    setIsFormValid,
  ]);

  return (
    <div className="bg-white dark:bg-gray-600 rounded-xl shadow-md p-6 mb-6">
      <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        <Text id="app.order.info" />
      </h3>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-800 dark:text-gray-100 mb-2">
            <Text id="app.order.name" />
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        <div>
          <label className="block text-gray-800 dark:text-gray-100 mb-2">
            <Text id="app.order.surname" />
          </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        <div>
          <label className="block text-gray-800 dark:text-gray-100 mb-2">
            <Text id="app.order.address" />
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        <div>
          <label className="block text-gray-800 dark:text-gray-100 mb-2">
            <Text id="app.order.phone" />
          </label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        <div>
          <label className="block text-gray-800 dark:text-gray-100 mb-2">
            <Text id="app.order.email" />
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        <div>
          <label className="block text-gray-800 dark:text-gray-100 mb-2">
            <Text id="app.order.time" />
          </label>
          <select
            value={deliveryTime}
            onChange={(e) => setDeliveryTime(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="">
              <Text id="app.order.choice.time" />
            </option>
            <option value="ASAP">
              <Text id="app.order.choice.fast" />
            </option>
            <option value="30min">
              <Text id="app.order.choice.half" />
            </option>
            <option value="1h">
              <Text id="app.order.choice.hour" />
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default DeliveryForm;
