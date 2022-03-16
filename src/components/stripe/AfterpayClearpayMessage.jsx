import React from "react";
import { AfterpayClearpayMessageElement } from "@stripe/react-stripe-js";

const AfterpayClearpayMessage = () => (
  <AfterpayClearpayMessageElement
    options={{ amount: 30000, currency: "EUR", showInterestFree: false }}
  />
);

export default AfterpayClearpayMessage;
