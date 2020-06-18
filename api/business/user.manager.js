'use strict';


import passwordDAO from "../DAO/passwordDAO";
import tokenDAO from '../DAO/tokenDAO';
import userDAO from '../DAO/userDAO';
import applicationException from '../service/applicationException';
import sha1 from 'sha1';

function create(context) {

  function hashString(password) {
    return sha1(password);
  }

  async function authenticate(name, password) {
    let userData;
    const user = await userDAO.getByEmailOrName(name);
    if (!user) {
      throw applicationException.new(applicationException.UNAUTHORIZED, 'User with that email does not exist');
    }
    if (!user.active) {
      throw applicationException.new(applicationException.NOT_FOUND, 'User does not exist or does not active');
    }
    userData = await user;
    await passwordDAO.authorize(user.id, hashString(password));
    const token = await tokenDAO.create(userData);
    return getToken(token);
  }

  function getToken(token) {
    return {token: token.value};
  }

  async function getUserByToken(receivedToken) {
    const token = await tokenDAO.get(receivedToken);
    return await userDAO.get(token.userId);
  }

  async function createNewOrUpdate(userData) {
    const user = await userDAO.createNewOrUpdate(userData);
    if (await userData.password) {
      return await passwordDAO.createOrUpdate({userId: user.id, password: hashString(userData.password)});
    } else {
      return user;
    }
  }

  async function removeUserById(id) {
    return await userDAO.removeById(id);
  }

  async function removeHashSession(userId) {
    return await tokenDAO.remove(userId);
  }

  return {
    authenticate: authenticate,
    getUserByToken: getUserByToken,
    createNewOrUpdate: createNewOrUpdate,
    removeUserById: removeUserById,
    removeHashSession: removeHashSession
  };
}

export default {
  create: create
};
