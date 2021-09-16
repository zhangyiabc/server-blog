const errMsg = (errMsg = "server internal error", errCode = 500, data = []) => {
  return {
    code: errCode,
    msg: errMsg,
    data: data,
  };
};

const successMsg = (success = "success", code = 200, data = []) => {
  return {
    code,
    msg: success,
    data: data,
  };
};

const handleSend = (resultObj,res) => {
  const { code, msg, result } = resultObj;
  let sendData = ''
  if (code != 200) {
    sendData = errMsg(msg, code, result);
  }
  sendData = successMsg(msg, code, result);
  res.status(sendData.code)
  res.send(sendData)
};

module.exports = {
  errMsg,
  successMsg,
  handleSend,
};
