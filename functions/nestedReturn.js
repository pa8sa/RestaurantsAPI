const sendRes = (res, status, message, data) => {
  return res.status(200).json({ message: message, status: status, data: data });
};

const returnService = (status, data) => {
  return { data: data, status: status };
};

module.exports = { sendRes, returnService };
