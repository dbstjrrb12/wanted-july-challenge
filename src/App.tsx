import './App.css';
import { Router } from './component/Router';
import { Route } from './component/Route';
import Home from './pages';
import About from './pages/about';
import { Routes } from './component/Routes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" component={<Home />} />
        <Route path="/about" component={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
