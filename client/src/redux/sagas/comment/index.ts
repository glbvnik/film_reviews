import { PayloadAction } from '@reduxjs/toolkit'
import {
    all,
    call,
    fork,
    put,
    select,
    StrictEffect,
    takeEvery,
} from 'redux-saga/effects'
import { CommentAPI } from '../../../http/comment'
import { ICommentInputs } from '../../../models/comment'
import { IUser } from '../../../models/user'
import { authSelectors } from '../../reducers/auth'
import { setIsCommentLoading } from '../../reducers/reviews'
import {
    createComment,
    deleteComment,
} from '../../reducers/reviews/action-creators'

function* handleCommentAction({
    payload,
}: PayloadAction<ICommentInputs | number>): Generator<
    StrictEffect,
    void,
    IUser
> {
    try {
        yield put(setIsCommentLoading(true))

        const { uuId } = yield select(authSelectors.user)

        if (typeof payload === 'number') {
            yield call(CommentAPI.delete, payload, uuId)
        } else {
            yield call(CommentAPI.create, payload, uuId)
        }
    } finally {
        yield put(setIsCommentLoading(false))
    }
}

function* commentWatcher() {
    yield takeEvery([createComment, deleteComment], handleCommentAction)
}

export default function* commentSaga() {
    yield all([fork(commentWatcher)])
}
