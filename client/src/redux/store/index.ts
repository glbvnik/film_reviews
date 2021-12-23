import { configureStore, Store } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import createSagaMiddleware, { Task } from 'redux-saga'
import rootSaga from '../sagas'
import app from './../reducers/app'
import auth from './../reducers/auth'
import omdb from './../reducers/omdb'

interface SagaStore extends Store {
    sagaTask?: Task
}

const makeStore = () => {
    const sagaMiddleware = createSagaMiddleware()

    const store = configureStore({
        reducer: {
            app,
            auth,
            omdb,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(sagaMiddleware),
    });

    (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga)

    return store
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

const wrapper = createWrapper<AppStore>(makeStore)

export default wrapper
