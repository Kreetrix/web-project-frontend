import { Outlet } from 'react-router-dom';
const NotDashboard = () => {
    return (
        <div className="flex h-screen bg-gray-100">
            <main className="flex-1 p-6 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default NotDashboard;