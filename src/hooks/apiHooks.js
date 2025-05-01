const API = "http://localhost:3000/api/v1";

const fetchData = async (url, options = {}) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
};

export function useAuth() {
  const checkAdmin = async () => {
    const token = localStorage.getItem("accessToken");
    const fetchOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return await fetchData(`${API}/admin`, fetchOptions);
  };

  return { checkAdmin };
}

export function useUser() {
  const getUser = async () => {
    const token = localStorage.getItem("accessToken");
    const fetchOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return await fetchData(`${API}/admin`, fetchOptions);
  }
  return {getUser}
}

export function useProducts() {
  const deleteProduct = async (product) => {
    const token = localStorage.getItem("accessToken");
    const fetchOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return await fetchData(`${API}/admin/products/${product.ID}`, fetchOptions);
  };
  return { deleteProduct };
}
