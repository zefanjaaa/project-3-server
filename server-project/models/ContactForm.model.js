const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const contactSchema = new Schema(
  {
   email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
    },
    name: {
      type: String,
      required: [true, "Name is required."],
      trim: true,
    },

    text: {
      type: String,
      required: [true, "Text is required."],
    },
    user_id: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Contact = model("Contact", contactSchema);

module.exports = Contact;
