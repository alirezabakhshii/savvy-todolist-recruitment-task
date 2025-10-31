import React from "react";
import { Provider } from "react-redux";
import { persistor, store } from "./Store/store";
import { Router } from "./Router/Router";
import { Modals } from "./Components/Modals/Modals";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router />
        <Modals />
      </PersistGate>
    </Provider>
  );
}

export default App;
