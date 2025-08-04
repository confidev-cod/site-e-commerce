import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import { store } from './app/lib/store'
import App from './app/views/components'
import { AppContainer } from './app/views/containers/index'
import { addtoCart } from "./app/lib/actions";

// Log the initial state
console.log(store.getState())
const unsubscribe = store.subscribe(() => console.log(store.getState()))
//store.dispatch(addtoCart({name: "citron"}, 2))
//store.dispatch(addtoCart({name: "kiwi"}, 5))
unsubscribe()

ReactDOM.render(
<Provider store={store}>
    <AppContainer />
</Provider>
, document.getElementById("root")
);

