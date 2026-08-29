import React from 'react';
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const PayBalButton = ({ amount, onSuccess, onError }) => {
  return (
    <div>
      <PayPalScriptProvider
        options={{
          "client-id":
          import.meta.env.VITE_PAYPAL_CLIENT_ID
        }}
      >
        <PayBalButtons
          style={{ layout: "vertical" }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: amount,
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then(onSuccess);
          }}
          onError={onError}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default PayBalButton;