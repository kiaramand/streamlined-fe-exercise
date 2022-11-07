import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import preferences from "./preferences"

//we would normally also need to set up a persistor here

const reducer = combineReducers({
  preferences,
})

const middleware = composeWithDevTools(
  applyMiddleware(
    thunkMiddleware,
    createLogger({ collapsed: true })
))

const store = createStore(reducer, middleware)

export { store }
