import React from "react";
import { add, TestComponent } from "@example-app/shared";

const App = () => {
  return (
    <div>
      <button onClick={() => console.log(add(1, 2))}>Run add function</button>
      <TestComponent /> {/** React Native component inside React app!  **/}
    </div>
  );
};

export default App;
