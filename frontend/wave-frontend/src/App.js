import React from "react";
import logo from "./logo.png";
import "./App.css";
function App() {
  const Wave = () => {};
  return (
    <div className="h-screen flex justify-center background items-center">
      <div>
        <p class="text-5xl text-yellow-500	">Hey 👋 </p>
        <button
          onClick={() => Wave()}
          class="p-2 pl-5 pr-5 bg-yellow-500 mt-10 text-black  text-lg rounded-lg focus:border-4 border-yellow-300"
        >
          Wave at me
        </button>
      </div>
    </div>
  );
}

export default App;
