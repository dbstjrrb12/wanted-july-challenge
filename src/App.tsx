import './App.css';
import { Router } from './component/Router';
import { Route } from './component/Route';
import Home from './pages';
import About from './pages/about';

function App() {
  return (
    <Router>
      <Route path="/" component={<Home />} />
      <Route path="/about" component={<About />} />
    </Router>
  );
}

export default App;
