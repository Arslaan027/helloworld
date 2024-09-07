const express = require("express");

const logger = (req, res, next) => {
  console.log(
    `at [${new Date().toLocaleString()}] Request from [${req.originalUrl}]`
  );
  next();
};

module.exports = logger;
