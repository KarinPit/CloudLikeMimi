import { combineReducers, compose, legacy_createStore as createStore } from 'redux'
import { userReducer } from './reducers/user.reducer'
import { appReducer } from './reducers/app.reducer'
import { folderReducer } from './reducers/folder.reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
    userModule: userReducer,
    appModule: appReducer,
    folderModule: folderReducer
})

export const store = createStore(rootReducer, composeEnhancers())

window.gStore = store