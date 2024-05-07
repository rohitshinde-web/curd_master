import { RequestHandler } from "express";

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

export const authenticate:RequestHandler = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is required.' });
  }

  try {
    const decoded = jwt.verify(token, "rohit_shinde");
    req = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
};
