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
          <label htmlFor="firstName" className="block text-gray-800 dark:text-gray-100 mb-2">
            Etunimi
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-gray-700 dark:border-gray-500 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="lastName" className="block text-gray-800 dark:text-gray-100 mb-2">
            Sukunimi
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-gray-700 dark:border-gray-500 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-gray-800 dark:text-gray-100 mb-2">
            Osoite
          </label>
          <input
            id="address"
            name="address"
            type="text"
            autoComplete="street-address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-gray-700 dark:border-gray-500 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-gray-800 dark:text-gray-100 mb-2">
            Puhelin
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-gray-700 dark:border-gray-500 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-800 dark:text-gray-100 mb-2">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-gray-700 dark:border-gray-500 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="deliveryTime" className="block text-gray-800 dark:text-gray-100 mb-2">
            Toimitusaika
          </label>
          <select
            id="deliveryTime"
            name="deliveryTime"
            value={deliveryTime}
            onChange={(e) => setDeliveryTime(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-gray-700 dark:border-gray-500 dark:text-white"
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
