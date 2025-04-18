import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <Header />
            <main className="p-4">
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default Layout;
