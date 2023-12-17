const { Schema, model } = require("mongoose");

const quoteSchema = new Schema({
  quote: String,
  author: String,
});

const Quote = model("Quote", quoteSchema);

module.exports = Quote;
