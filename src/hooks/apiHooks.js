const API = import.meta.env.VITE_API;

const fetchData = async (url, options = {}) => {
  const response = await fetch(url, options);

  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch (e) {
      errorData = { message: response.statusText };
    }

    const errorMessage =
      errorData.message || `Request failed with status ${response.status}`;
    const error = new Error(errorMessage);

    error.status = response.status;
    error.data = errorData;

    throw error;
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
  };
  const updateUser = async (data) => {
    try {
      const token = localStorage.getItem("accessToken");
      const fetchOptions = {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      return await fetchData(`${API}/account`, fetchOptions);
    } catch (error) {
      console.error("Update user failed:", error);
      throw error;
    }
  };
  return { getUser, updateUser };
}

export function useProducts() {
  const API = import.meta.env.VITE_API;

  const fetchData = async (url, options) => {
    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return await response.json();
      }

      return await response.text();
    } catch (error) {
      console.error("API error:", error);
      throw error;
    }
  };

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
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    };
    return await fetchData(`${API}/admin/products/${product.ID}`, fetchOptions);
  };
  const addProduct = async (product) => {
    const token = localStorage.getItem("accessToken");
    const fetchOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    };
    return await fetchData(`${API}/admin/products`, fetchOptions);
  };
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
