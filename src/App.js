import React from "react";

// import FirstComponent from "./practice/components/FirstComponent";
// import SecondComponent from "./practice/components/SecondComponent";
// import ThirdComponent from "./practice/components/ThirdComponent";
// import FourthComponent from "./practice/components/FourthComponent";
// import FifthComponent from "./practice/components/FifthComponent";

import { Provider } from "react-redux";

import Routes from "./utils/routers/Routes";

import store from "./redux/store";


function App() {

  return (
    <Provider store={store}>

        {/* <StudentList /> */}

        {/* <Button variant="contained" color="primary"> Primary </Button>
        <Button variant="contained" color="secondary"> Secondary </Button> */}
        <Routes />


        {/* <FirstComponent />
        <ThirdComponent />
        <SecondComponent />
        <FourthComponent />
        <FifthComponent /> */}

    </Provider>
  );
}

export default App;