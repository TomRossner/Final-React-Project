import { Route, Routes } from 'react-router-dom';
import './index.css';
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import SignupBiz from "./components/SignupBiz";
import Logout from "./components/Logout";
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import MyCards from './components/MyCards';
import ProtectedRoute from "./components/ProtectedRoute";
import CreateCard from "./components/CreateCard";
import DeleteCard from "./components/DeleteCard";
import EditCard from "./components/EditCard";

function App() {
  return (
    <div className='container'>
      <NavBar/>
      <main className='content'>
        <Routes>
            <Route path="/" element={<Home/>}/> 
            <Route path="my-cards" element={<MyCards/>}/>
            <Route
            path="/my-cards/edit/:id"
            element={
              <ProtectedRoute onlyBiz>
                <EditCard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-cards/delete/:id"
            element={
              <ProtectedRoute onlyBiz>
                <DeleteCard />
              </ProtectedRoute>
            }
          />
          <Route
            path="create-card"
            element={
              <ProtectedRoute onlyBiz>
                <CreateCard />
              </ProtectedRoute>
            }
          />
          <Route
            path="my-cards"
            element={
              <ProtectedRoute onlyBiz>
                <MyCards />
              </ProtectedRoute>
            }
          />
            <Route path="sign-in" element={<SignIn/>}/>
            <Route path="sign-up" element={<SignUp/>}/>
            <Route path="sign-up-biz" element={<SignupBiz/>}/>
            <Route path="logout" element={<Logout/>}/>
        </Routes>
      </main>
        <Footer></Footer>
    </div>
  );
}

export default App;
