import About from "./component/About/About";
import Header from "./component/Header/Header";
import TodoApp from "./component/todoApp/TodoApp";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<TodoApp />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;
