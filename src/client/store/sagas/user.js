import { put, call } from "redux-saga/effects";

import {
  startLoadingUsers,
  addUsers,
  stopLoadingUsers,
  setCurrentUser,
  emptyCurrentUser,
  emptyUsers
} from "store/modules/user";

import APIProvider from "utils/APIProvider";

export function* loadUsersPage() {
  yield put(startLoadingUsers());
  const users = yield call(APIProvider.get, "users");
  yield put(addUsers(users));
  yield put(stopLoadingUsers());
}

export function* disposeUsersPage() {
  yield put(emptyUsers());
  yield put(emptyCurrentUser());
}

export function* loadEditUser(action) {
  yield put(emptyCurrentUser());
  const user = yield call(APIProvider.get, `users/${action.id}`);
  yield put(setCurrentUser(user));
}

export function* disposeEditUser() {
  yield put(emptyCurrentUser());
}
