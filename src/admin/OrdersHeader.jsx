import React from 'react';
import { FaChevronDown, FaSyncAlt } from 'react-icons/fa';

const OrdersHeader = ({ filter, onFilterChange, onRefresh }) => {
    return (
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold text-gray-800">Hallitse tilauksia</h3>
            <div className="flex space-x-4">
                <div className="relative">
                    <select
                        id="order-filter"
                        value={filter}
                        onChange={onFilterChange}
                        className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8"
                    >
                        <option value="all">Kaikki tilaukset</option>
                        <option value="new">Uudet tilaukset</option>
                        <option value="preparing">Valmistumassa</option>
                        <option value="ready">Valmiit noudettavaksi</option>
                        <option value="delivering">Toimitettavana</option>
                        <option value="completed">Suoritetut</option>
                        <option value="cancelled">Peruutetut</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <FaChevronDown />
                    </div>
                </div>
                <button
                    onClick={onRefresh}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
                >
                    <FaSyncAlt className="mr-1" />
                    Päivitä
                </button>
            </div>
        </div>
    );
};

export default OrdersHeader;
