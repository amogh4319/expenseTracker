
import './App.css';
import SignUpPage from './components/auth/SignUpPage';
import WelcomePage from './components/WelcomePage';
import {Routes,Route} from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<SignUpPage/>}>
        </Route>
      </Routes>
      <Routes>
        <Route path='/welcome' element={<WelcomePage/>}>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
