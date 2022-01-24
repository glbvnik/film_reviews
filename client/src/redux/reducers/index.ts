import { combineReducers } from 'redux'
import app from './app'
import auth from './auth'
import omdb from './omdb'
import reviews from './reviews'

const rootReducer = {
    app,
    auth,
    omdb,
    reviews,
}

export default combineReducers(rootReducer)
