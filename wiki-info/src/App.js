import { Provider } from 'react-redux';
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import './App.css';
import Authentification from './Components/Authentification';
<<<<<<< HEAD
import TrashGame from './Components/TrashGame/TrashGame';
=======
import Home from './Components/Home';
>>>>>>> homeSearch
import store from './Store/Store';

function RequireAuth({ children }) {
  const auth = store.getState().user !== undefined;
  if (!auth) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" />;
  }

  return children;
}

const App = () => {

  return (
    <Router>
      <div className="App">
        <div className="logo"></div>
        <Routes>
          <Route path={"/login"} element={<Authentification />} />
          <Route path={"/"} element={<Home />} /*TODO find a way to multiple path to go on the same element*/ />
          <Route path='/trashgame' element={<p> TrashGame </p>} />
          {/*<Route path='/projects/:id' element={<RequireAuth> <ProjectInterface /></RequireAuth>} /> */}
        </Routes>
      </div>
    </Router>
  )
}

export default App;