import { all, call, spawn } from 'redux-saga/effects'
import authSaga from './auth'
import omdbSaga from './omdb'
import reviewSaga from './review'

export default function* rootSaga() {
    const sagas = [authSaga, omdbSaga, reviewSaga]

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
