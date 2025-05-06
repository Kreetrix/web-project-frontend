const API = import.meta.env.VITE_API;

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
    return await fetchData(`${API}/account`, fetchOptions);
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
  const updateProduct = async (product) => {
    const token = localStorage.getItem("accessToken");
    const fetchOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    };
    return await fetchData(`${API}/admin/products/${product.ID}`, fetchOptions);
  }
  const addProduct = async (product) => {
    const token = localStorage.getItem("accessToken");
    const fetchOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    };
    return await fetchData(`${API}/admin/products`, fetchOptions);
  }
  return { deleteProduct, updateProduct, addProduct };
}

export function useOrders() {
  const getOrders = async () => {
    return await fetchData(`${API}/order/orders`);
  };

  const addOrder = async (orderData) => {
    const token = localStorage.getItem("accessToken");
    const fetchOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    };
    return await fetchData(`${API}/order/orders`, fetchOptions);
  };

  return { getOrders, addOrder };
}