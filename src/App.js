import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import EditTask from "./components/EditTask";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit/:id" element={<EditTask />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
