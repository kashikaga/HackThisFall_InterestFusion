function removeSensitiveData(data) {
  try {
    let resData = data.toObject();
    delete resData["password"];
    delete resData["onesignalPlayerId"];
    delete resData["createdAt"];
    delete resData["updatedAt"];
    delete resData["__v"];
    return resData;
  } catch (e) {
    console.log(e);
    return data;
  }
}
module.exports = removeSensitiveData;
