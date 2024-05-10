import { Schema, model } from "mongoose";

const schemaTransaction = new Schema(
  {
    order_id: {
      type: String,
      required: true,
    },
    gross_amount: {
      type: Number,
      required: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    redirect_url: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // created_At and updated_At
  }
);

export default model("Transactions", schemaTransaction);
