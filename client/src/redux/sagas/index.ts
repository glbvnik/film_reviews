import { all, call, spawn } from 'redux-saga/effects'
import authSaga from './auth'
import omdbSaga from './omdb'

export default function* rootSaga() {
    const sagas = [authSaga, omdbSaga]

    yield all(
        sagas.map((saga) =>
            spawn(function* () {
                while (true) {
                    try {
                        yield call(saga)
                        break
                    } catch (e) {
                        console.log(e)
                    }
                }
            })
        )
    )
}
