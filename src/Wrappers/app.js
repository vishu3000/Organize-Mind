"use client";

import { store } from "@/store";
import { Provider } from "react-redux";
import AuthWrapper from "./Auth";

const App = (props) => {
  return (
    <>
      <Provider store={store}>
        <AuthWrapper>{props.children}</AuthWrapper>
      </Provider>
    </>
  );
};

export default App;
