import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/apiHooks";

const AdminRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const { checkAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const status = await checkAdmin();
        if (status) {
          setIsAdmin(true);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Admin check failed:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    verifyAdmin();
  }, [checkAdmin, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAdmin ? children : null;
};

export default AdminRoute;
