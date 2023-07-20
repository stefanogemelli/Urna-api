export const response = function (res, statusCode, data) {
  res.status(statusCode).json({
    error: false,
    data,
  });
};
