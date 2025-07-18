import ReactDOM from 'react-dom/client'
import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter as Router } from "react-router-dom";

import { App } from './App.jsx'
import './assets/scss/main.scss'
import 'animate.css'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
);