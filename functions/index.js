// /**
//  * Import function triggers from their respective submodules:
//  *
//  * const {onCall} = require("firebase-functions/v2/https");
//  * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
//  *
//  * See a full list of supported triggers at https://firebase.google.com/docs/functions
//  */

// const { onRequest } = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// // Create and deploy your first functions
// //firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", { structuredData: true });
//   response.send("Hello from Firebase!");
// });

const functions = require("firebase-functions");
const cors = require("cors");
const express = require("express");

// Express app config
const tasksApp = express();

tasksApp.use(cors({ origin: true }));

// A simple api to get all tasks
tasksApp.get("/", (request, response) => {
  response.status(200).send([
    {
      id: "123",
      name: "Task 1",
      isComplete: false,
    },
    {
      id: "456",
      name: "Task 2",
      isComplete: true,
    },
  ]);
});
// tasks will be the name of the function as well as API
//in which we will pass our express app
exports.tasks = functions.https.onRequest(tasksApp);
