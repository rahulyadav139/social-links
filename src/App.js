import './App.css';
import HomePage from './components/pages/HomePage';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';
import UserPage from './components/pages/UserPage';
import Admin from './components/pages/Admin';
import NoUserFound from './components/pages/NoUserFound';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function App() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        {isLoggedIn && <Route path="/admin" element={<Admin />} />}
        {!isLoggedIn && (
          <Route
            path="/admin"
            element={<Navigate to="/" element={<HomePage />} />}
          />
        )}
        <Route path="/:username" element={<UserPage />} />
        <Route path="/no-user-found" element={<NoUserFound />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
