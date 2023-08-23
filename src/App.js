
import './App.css';
import SignUpPage from './components/auth/SignUpPage';
import WelcomePage from './components/WelcomePage';
import ProfilePage from './components/ProfilePage';
import {Routes,Route} from 'react-router-dom';
function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<SignUpPage/>}>
        </Route>
        <Route path='/welcome' element={<WelcomePage/>}>
        </Route>
        <Route path='/profile' element={<ProfilePage/>}>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
