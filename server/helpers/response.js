
module.exports = function(statusCode, data, message) {
  const response = {
    status: statusCode,
    data: data,
    message: message
  };
  return response;
};
