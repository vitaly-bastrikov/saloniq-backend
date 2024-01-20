const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// This is your test secret API key.
app.use(cors({ origin: true }));
const stripe = require("stripe")("sk_test_QgJztNZh70N9iTn6luuvuVxP00dGIII7Gz");

app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.json());

const calculateOrderAmount = (items) => {
  var total = 0;
  for (var item in items) {
    total += parseInt(item.price);
  }

  return total * 100;
};

app.post("/create-payment-intent", async (req, res) => {
  var total = 0;

  for (let item of req.body) {
    console.log(item);
    total += parseFloat(item.price).toFixed(2) * 100;
  }
  //   total *= 100;

  console.log("total: ", total);

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    // amount: 60,
    currency: "cad",
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

exports.app = functions.https.onRequest(app);
