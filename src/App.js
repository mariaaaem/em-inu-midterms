import React from "react";

// import FirstComponent from "./practice/components/FirstComponent";
// import SecondComponent from "./practice/components/SecondComponent";
// import ThirdComponent from "./practice/components/ThirdComponent";
// import FourthComponent from "./practice/components/FourthComponent";
// import FifthComponent from "./practice/components/FifthComponent";

import { Provider } from "react-redux";
import store from "./redux/store";
import Routes from "./utils/routers/myRoutes";


function App() {

  return (
    <Provider store={store}>
      <Routes/>
    </Provider>
  );
}

export default App;