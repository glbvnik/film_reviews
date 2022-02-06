import { PayloadAction } from '@reduxjs/toolkit'
import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { CommentAPI } from '../../../http/comment'
import { ICommentInputs } from '../../../models/comment'
import { setIsCommentLoading } from '../../reducers/reviews'
import {
    createComment,
    deleteComment,
} from '../../reducers/reviews/action-creators'

function* handleCommentAction({
                                  payload,
                              }: PayloadAction<ICommentInputs | number>) {
    try {
        yield put(setIsCommentLoading(true))

        if (typeof payload === 'number') {
            yield call(CommentAPI.delete, payload)
        } else {
            yield call(CommentAPI.create, payload)
        }
    } finally {
        yield put(setIsCommentLoading(false))
    }
}

function* commentWatcher() {
    yield takeEvery(
        [createComment, deleteComment],
        handleCommentAction
    )
}

export default function* commentSaga() {
    yield all([fork(commentWatcher)])
}
