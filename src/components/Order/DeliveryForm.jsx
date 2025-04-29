// DeliveryForm.jsx
import React, { useEffect } from "react";

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
  useEffect(() => {
    // Check if all fields are filled
    const isValid =
      firstName.trim() &&
      lastName.trim() &&
      address.trim() &&
      phone.trim() &&
      email.trim() &&
      deliveryTime;
    setIsFormValid(isValid);
  }, [firstName, lastName, address, phone, email, deliveryTime, setIsFormValid]);

  return (
    <div className="bg-white dark:bg-gray-600 rounded-xl shadow-md p-6 mb-6">
      <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        Toimitustiedot
      </h3>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-800 dark:text-gray-100 mb-2">
            Etunimi
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
            Sukunimi
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
            Osoite
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
            puhelin
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
            email
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
            Toimitusaika
          </label>
          <select
            value={deliveryTime}
            onChange={(e) => setDeliveryTime(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="">Valitse toimitusaika</option>
            <option value="ASAP">Mahdollisimman pian</option>
            <option value="30min">30 minuutin päästä</option>
            <option value="1h">1 tunnin päästä</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default DeliveryForm;
