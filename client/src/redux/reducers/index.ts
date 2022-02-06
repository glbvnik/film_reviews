import { combineReducers } from 'redux'
import administration from './administration'
import app from './app'
import auth from './auth'
import omdb from './omdb'
import reviews from './reviews'

const rootReducer = {
    administration,
    app,
    auth,
    omdb,
    reviews,
}

export default combineReducers(rootReducer)
