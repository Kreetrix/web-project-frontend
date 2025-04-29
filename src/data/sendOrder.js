export const sendOrder = async (orderData) => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/order/orders", {
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