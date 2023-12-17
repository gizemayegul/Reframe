const quoteRouter = require("express").Router();
const Quote = require("../models/Quote.model");

quoteRouter.get("/quotes", async (req, res) => {
  try {
    // Find all documents in the Quote collection

    const randomQuote = await Quote.aggregate([{ $sample: { size: 1 } }]);

    // Respond with the random quote as JSON
    res.json(randomQuote[0]);

    // Respond with the quotes as JSON
  } catch (error) {
    // Handle any errors that occurred during the database query
    console.error("Error fetching quotes:", error);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = quoteRouter;
