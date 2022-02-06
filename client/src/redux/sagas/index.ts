import { all, call, spawn } from 'redux-saga/effects'
import administrationSaga from './administration'
import authSaga from './auth'
import commentSaga from './comment'
import omdbSaga from './omdb'
import reviewSaga from './review'

export default function* rootSaga() {
    const sagas = [
        administrationSaga,
        authSaga,
        omdbSaga,
        reviewSaga,
        commentSaga,
    ]

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
