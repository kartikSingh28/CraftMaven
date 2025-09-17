const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { sellerModel, adminModel } = require("../db.js");

const { JWT_SELLER_PASSWORD } = require("../config.js");
const bcrypt = require("bcrypt");
const zod = require("zod");

const sellerRouter = Router();

sellerRouter.post("/signup", async (req, res) => {
  const requireBody = zod.object({
    email: zod.string().email().min(5),
    password: zod.string().min(5),
    firstName: zod.string().min(3),
    lastName: zod.string().min(3),
    address: zod.string().min(5).optional(),
    shopName: zod.string().min(3),
  });

  const parseDataWithSuccess = requireBody.safeParse(req.body);

  if (!parseDataWithSuccess.success) {
    return res.status(400).json({
      message: "Incorrect data format",
      error: parseDataWithSuccess.error,
    });
  }

  const { email, password, firstName, lastName, address, shopName } = parseDataWithSuccess.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await sellerModel.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      address,
      shopName,
    });

    return res.status(201).json({
      message: "Successfully registered as Seller",
    });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({
        message: "Seller already exists",
      });
    } else {
      return res.status(500).json({
        message: "Something went off",
      });
    }
  }
});

sellerRouter.post("/signin", async (req, res) => {
  const requireBody = zod.object({
    email: zod.string().email().min(5),
    password: zod.string().min(3),
  });

  const parseDataWithSuccess = requireBody.safeParse(req.body);

  if (!parseDataWithSuccess.success) {
    return res.status(400).json({
      message: "Invalid data format",
      error: parseDataWithSuccess.error,
    });
  }

  const { email, password } = parseDataWithSuccess.data;

  try {
    const user = await sellerModel.findOne({ email });
    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(403).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
      { id: user._id, role: "seller" },
      JWT_SELLER_PASSWORD,
      { expiresIn: "1h" }
    );

    res.json({ message: "Signin successful", token });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  }
});

sellerRouter.post("/sell", (req, res) => {
  res.json({
    message: "Seller EndPoint",
  });
});

module.exports = { sellerRouter };
