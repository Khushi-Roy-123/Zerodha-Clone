const { model, Schema } = require("mongoose");

const WatchListSchema = new Schema({
  name: String,
  price: Number,
  percent: String,
  isDown: Boolean,
  userId: {
      type: Schema.Types.ObjectId, 
      ref: "User",
      required: true
  }
});

module.exports = { WatchListModel: model("WatchList", WatchListSchema) };
