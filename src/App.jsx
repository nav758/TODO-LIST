import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashbord from "./pages/Dashbord/Dashbord";
function App({ toggleTheme }) {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Dashbord toggleTheme={toggleTheme} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
