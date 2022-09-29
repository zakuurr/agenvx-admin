import { call, put, takeEvery, takeLatest } from "redux-saga/effects"

// Login Redux States
import { LOGIN_USER, LOGOUT_USER } from "./actionTypes"
import { apiError, loginSuccess, logoutUserSuccess } from "./actions"

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper"
import {
  postFakeLogin,
  postJwtLogin,
  postSocialLogin,
} from "../../../helpers/fakebackend_helper"
import CW from "copywriting"
import SimpleToast from "components/cmsagenvx/alert/SimpleToast"

const fireBaseBackend = getFirebaseBackend()

function* loginUser({ payload: { user, history } }) {
  try {
    // if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
    //   const response = yield call(
    //     fireBaseBackend.loginUser,
    //     user.email,
    //     user.password
    //   )
    //   yield put(loginSuccess(response))
    // } else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
    //   const response = yield call(postJwtLogin, {
    //     email: user.email,
    //     password: user.password,
    //   })
    //   localStorage.setItem("authUser", JSON.stringify(response))
    //   yield put(loginSuccess(response))
    // } else if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
      // const response = yield call(postFakeLogin, {
      //   email: user.email,
      //   password: user.password,
      // })

      fetch(process.env.REACT_APP_BASEURL + '/api/token-auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
        },
        body: JSON.stringify({
          email: user.email,
          password: user.password,
        })
      })
      .then(x => x.json())
      .then(x => {
        if (x.code != 200 || x.error || !x.result) {
          throw 'Login failed...'
        }
        localStorage.setItem("authUser", JSON.stringify(x.result.token))
        SimpleToast.success(CW.toast.success.login)
        history.push('/')
      })
      .catch(x => {
        console.log(x)
        SimpleToast.error(CW.toast.error.login)
      })
    // }
  } catch (error) {
    yield put(apiError(error))
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    localStorage.removeItem("authUser")

    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(fireBaseBackend.logout)
      yield put(logoutUserSuccess(response))
    }
    history.push("/login")
  } catch (error) {
    yield put(apiError(error))
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser)
  yield takeEvery(LOGOUT_USER, logoutUser)
}

export default authSaga
