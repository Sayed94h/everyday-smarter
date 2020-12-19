"use strict";

const express = require("express");
const router = express.Router();
const handlers = require("./handlers.js");

router.post("/text-to-emoji", handlers.translateText);
router.post("/contactForm", handlers.contactForm);
router.post("/feedbackForm", handlers.feedbackForm);
router.post("/registrations", handlers.registrations);
router.post("/login", handlers.login);
router.get("/login/:name/:password", handlers.getUserProfile);

router.post("/interactions", handlers.updateInteractions);
router.post("/subscribedList", handlers.subscribedList);
router.get("/interactions", handlers.getInteractions);
router.get("/interactionsOnload", handlers.getInteractionsOnload);
module.exports = router;
