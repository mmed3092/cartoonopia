const userList = require("../models/UserList");
const AdminListModel = require("../models/AdminList");

async function getAllUsers() {
  return await userList.find();
}

async function getUser(username, password) {
  const [firstname, lastname] = username.split(" ");
  const result = await userList.findOne({
    firstname: firstname,
    lastname: lastname,
    password: password,
  });
  console.log(result);
  return result; // Modify to return true or false based on the result
}

async function getUserFromUsername(username) {
  const [firstname, lastname] = username.split(" ");
  const result = await userList.findOne({
    firstname: firstname,
    lastname: lastname,
  });
  return result;
}

async function getAllAdmins() {
  const admins = await AdminListModel.find();
  const adminUsers = admins.map(async (admin) => getUser(admin.userId));
  return adminsUsers;
}

async function isAdmin(id) {
  return !!(await AdminListModel.exists(id));
}

module.exports = { getAllUsers, getUser, getAllAdmins, isAdmin , getUserFromUsername};
