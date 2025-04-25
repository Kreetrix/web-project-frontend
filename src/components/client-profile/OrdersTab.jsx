import { Scroll } from 'lucide-react';


export default function OrdersTab() {
    return (
        <>
            <div className="text-center text-xl font-semibold text-gray-700">
                Avoin tilaus 🍔
            </div>
            <div className="text-center text-xl font-semibold text-gray-700">
                Historia <Scroll />
            </div>
        </>
    );
}
