import "./App.css";
import Home from "./component/Pages/Home";
import Sidebar from "./component/Sidebar";

function App() {
  return (
    <>
      <Sidebar title={"Real Estate Price Prediction"} />
      <Home />
    </>
  );
}

export default App;
