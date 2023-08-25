
import './App.css';
import SignUpPage from './components/auth/SignUpPage';
import WelcomePage from './components/WelcomePage';
import ProfilePage from './components/ProfilePage';
import {Routes,Route} from 'react-router-dom';
import VerifyEmail from './components/VerifyEmail';
import { ProductContextProvider } from './store/ProductContext';
function App() {
  return (
    <div>
      <ProductContextProvider>
      <Routes>
        <Route path='/' element={<SignUpPage/>}>
        </Route>
        <Route path='/welcome' element={<WelcomePage/>}>
        </Route>
        <Route path='/profile' element={<ProfilePage/>}>
        </Route>
        <Route path='/verifyEmail' element={<VerifyEmail/>}>
        </Route>
      </Routes>
      </ProductContextProvider>
    </div>
  );
}

export default App;
