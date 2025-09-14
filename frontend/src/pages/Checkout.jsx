import React, { useState } from 'react';
import axios from 'axios';

const Checkout = () => {
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Dummy cart for demonstration; you would manage a real cart state
      const cartItems = [{
        productId: 'dummyId123',
        name: 'Product X',
        quantity: 1,
        price: 100,
      }];
      
      const res = await axios.post('http://localhost:5000/api/orders', {
        items: cartItems,
        customerDetails,
      });

      if (res.status === 201) {
        alert('Your order is placed successfully and will be contacted by our team in less than 24 hrs!');
        setCustomerDetails({ name: '', email: '', phone: '', address: '' });
      }
    } catch (err) {
      alert('Error placing order.');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Checkout</h2>
      <input type="text" name="name" value={customerDetails.name} onChange={handleChange} placeholder="Full Name" required />
      <input type="email" name="email" value={customerDetails.email} onChange={handleChange} placeholder="Email" required />
      <input type="tel" name="phone" value={customerDetails.phone} onChange={handleChange} placeholder="Phone Number" required />
      <textarea name="address" value={customerDetails.address} onChange={handleChange} placeholder="Address" required></textarea>
      <button type="submit">Place Order</button>
    </form>
  );
};

export default Checkout;