const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const productsSchema = new Schema(
  {
    brand: {
      type: String,
      lowercase: true,
      trim: true,
    },
    nameOfProduct:{
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
    },
    categoryOfProduct: {
      type: String,
      enum: ["Art", "Clothes", "Home Goods","Sale"],
      trim: true,
    },

    image:{
      type: String,
      trim: true,

    },
    price: {
      type: Number,
      
    },
    size: {
      type: String,
      trim: true,
      enum: ["XS","S", "M", "L", "XL","Free size"],
    },
    quantity: {
      type: Number,
      
    },
    RelatedProducts:{
      type: Array,
    },
    ProductDetails:{
      type: Array,
    },
    user_id: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Products = model("Products", productsSchema);

module.exports = Products;
