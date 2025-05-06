const API = import.meta.env.VITE_API;
export const sendOrder = async (orderData) => {
    try {
      const response = await fetch(`${API}/order/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to send order: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data; // Return the response data
    } catch (error) {
      console.error("Error sending order:", error);
      throw error; // Re-throw the error for handling in the caller
    }
  };