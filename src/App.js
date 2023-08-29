
import './App.css';
import SignUpPage from './components/auth/SignUpPage';
import WelcomePage from './components/WelcomePage';
import ProfilePage from './components/ProfilePage';
import {Routes,Route} from 'react-router-dom';
import VerifyEmail from './components/VerifyEmail';
import { useSelector,useDispatch} from 'react-redux';
import { themeActions } from './store/theme';
import { useEffect } from 'react';



function App() {
//   const isDarkTheme = useSelector(state => state.theme.isDarkTheme);
// const dispatch=useDispatch();
//   // Apply dark or light theme based on the Redux state
//   useEffect(()=>{
//     if(isDarkTheme){
//       dispatch(themeActions.lightTheme()) 
//     }else{
//       dispatch(themeActions.darkTheme())
//     }
//   },[isDarkTheme,dispatch])
  
 
 
  return (
    <div>
     
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
      
    </div>
  );
}

export default App;
