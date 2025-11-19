// test-cf.js
require('dotenv').config();
const axios = require('axios');

(async () => {
  try {
    console.log('APP_ID present:', !!process.env.CASHFREE_APP_ID);
    console.log('SECRET present:', !!process.env.CASHFREE_SECRET_KEY);

    const body = {
      order_id: `ORD_NODE_TEST_${Date.now()}`,
      order_amount: "10.00",
      order_currency: "INR",
      customer_details: {
        customer_id: "test_user",
        customer_email: "test@example.com",
        customer_phone: "9999999999"
      }
    };

    const resp = await axios.post('https://sandbox.cashfree.com/pg/orders', body, {
      headers: {
        'Content-Type': 'application/json',
        'x-client-id': process.env.CASHFREE_APP_ID,
        'x-client-secret': process.env.CASHFREE_SECRET_KEY
      },
      timeout: 15000
    });

    console.log('status:', resp.status);
    console.log('data:', JSON.stringify(resp.data, null, 2));
  } catch (err) {
    console.error('ERROR message:', err.message);
    if (err.response) {
      console.error('response.status:', err.response.status);
      console.error('response.data:', JSON.stringify(err.response.data, null, 2));
    } else if (err.request) {
      console.error('no response (request made):', err.request);
    } else {
      console.error('other err:', err);
    }
    process.exit(1);
  }
})();
