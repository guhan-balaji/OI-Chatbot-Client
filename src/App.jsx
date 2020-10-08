import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import Chatbot from "./components/Chatbot";

function App() {
  return (
    <Provider store={store}>
      <Chatbot />
    </Provider>
  );
}

export default App;
