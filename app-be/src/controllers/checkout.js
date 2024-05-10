import transactionModel from "../models/transaction.js";
import midtransClient from "midtrans-client";

let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: "server",
  clientKey: "klient",
});

const checkout = async (req, res) => {
  const body = req.body;

  try {
    let parameter = {
      transaction_details: {
        order_id: body.order_id,
        gross_amount: body.gross_amount,
      },
      customer_details: {
        first_name: body.first_name,
        email: body.email,
        phone: body.phone,
      },
      credit_card: {
        secure: true,
      },
    };

    // CREATE TRANSACTION ON MIDTRAN
    const responseTransaction = await snap.createTransaction(parameter);

    const data = { ...body, ...responseTransaction };

    // CREATE DATA ON MONGODB
    await transactionModel.create(data);

    res.send({
      code: 201,
      message: "Checkout transaction success",
      data,
    });
  } catch (error) {
    res.send({
      code: 500,
      message: error.message || "Internal server error",
    });
  }
};

export default checkout;
