"use strict";

const express = require("express");
const router = express.Router();
const handlers = require("./handlers.js");

router.post("/text-to-emoji", handlers.translateText);
router.post("/contactForm", handlers.contactForm);
router.get("/messages", handlers.getMessages);
router.post("/feedbackForm", handlers.feedbackForm);
router.post("/subscribedList", handlers.subscribedList);
router.get("/babyNames/:name", handlers.getBabyNames);
router.get("/babyNames/:name/:id", handlers.getBabyNamesById);
module.exports = router;
