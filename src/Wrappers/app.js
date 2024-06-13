"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import Navigation from "@/components/navigation";

const App = (props) => {
  return (
    <Provider store={store}>
      <Navigation />
      {props.children}
    </Provider>
  );
};

export default App;
