import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap'
import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { User } from './requests';
import NavBar from './components/navbar/NavBar';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import UserShowPage from './pages/UserShowPage';
import MealIndexPage from './pages/MealIndexPage';
import MealShowPage from './pages/MealShowPage';
import NewMealPage from './pages/NewMealPage';
import SearchResultPage from './pages/SearchResultPage';
import UserEditPassword from './components/user/UserEditPassword';
import UserEditProfileImage from './components/user/UserEditProfileImage';
import UserFavourites from './components/user/UserFavourites';
import CategoryPage from './pages/CategoryPage';


function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    getCurrentUser();
  }, [])
  
  const getCurrentUser = () => {
    User.current().then(user => { 
      if (user?.id) { 
        setUser(user);
      }
    })
  }

  const onSignOut = () => {
    setUser(null);
  }

  return (
    <BrowserRouter>
    <NavBar currentUser={user} onSignOut={ onSignOut }/>
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route exact path='/sign_in'
        element={ <SignInPage onSignIn={getCurrentUser} />}
        >
        </Route>
        <Route exact path='/sign_up'
          element={<SignUpPage onSignUp={getCurrentUser} />}
        />
        <Route exact path='/users/:id'
          element={<UserShowPage />}
        />
        <Route exact path='/users/:id/update_password'
          element={<UserEditPassword />}
        />
        <Route exact path='/users/:id/update_profile_image'
          element={<UserEditProfileImage />}
        />
        <Route exact path='/users/:id/favourited'
          element={<UserFavourites />}
        />
        <Route exact path='/meals' element={< MealIndexPage />} />
        <Route exact path='/meals/new' element={< NewMealPage />} />
        <Route exact path='/meals/:id' element={< MealShowPage />} />
        <Route exact path='/search/:keyword' element={< SearchResultPage />} />
        <Route exact path='/categories/:id' element={< CategoryPage />}/>
      </Routes>
      </BrowserRouter>
  );
}

export default App;
