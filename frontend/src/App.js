import React, { useEffect } from 'react';
import {BrowserRouter as Router, Route,Routes} from "react-router-dom"
import Home from './components/Home/Home';
import Header from './components/Layout/Header/Header';
import Courses from './components/Courses/Courses';
import Footer from './components/Layout/Footer/Footer';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ForgetPassword from './components/Auth/ForgetPassword';
import ResetPassword from './components/Auth/ResetPassword';
import Contact from './components/Contact/Contact';
import Request from './components/Request/Request';
import About from './components/About/About';
import Subscribe from './components/Payments/Subscribe';
import NotFound from './components/NotFound/NotFound';
import PaymentFail from './components/Payments/PaymentFail';
import PaymentSuccess from './components/Payments/PaymentSuccess';
import CoursePage from './components/Contact/CoursePage/CoursePage';
import Profile from './components/Profile/Profile';
import ChangePassword from './components/Profile/ChangePassword';
import UpdateProfile from './components/Profile/UpdateProfile';
import Dashboard from './components/Admin/Dashboard/Dashboard';
import CreateCourse from './components/Admin/CreateCourse/CreateCourse';
import Users from './components/Admin/Users/Users';
import AdminCourses from './components/Admin/AdminCourses/AdminCourses';
import { useDispatch, useSelector } from 'react-redux';
import toast, {Toaster} from "react-hot-toast"
import { loadUser } from './redux/actions/user';
import {ProtectedRoute} from "protected-route-react"
import Loader from './components/Layout/Loader/Loader';
function App() {
  const {isAuthenticated, user, message, error, loading} = useSelector(state => state.user)
  const dispatch = useDispatch()
  useEffect(() =>{
    if(error){
      toast.error(error);
      dispatch({type: "clearError"})
    }
    if(message){
      toast.success(message);
      dispatch({type: "clearMessage"})
    }
  },[dispatch, error, message])
  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])
  return (
    <Router>
      {
        loading ? (<Loader />):(
          <>
          <Header isAuthenticated={isAuthenticated} user={user}/>
      <Routes>
        <Route path = '/' element = {<Home/>} />
        <Route path = '/about' element = {<About />} />
        <Route path = '/profile' element = {<ProtectedRoute isAuthenticated = {isAuthenticated}><Profile user={user} /></ProtectedRoute>} />
        <Route path = '/changepassword' element = {<ProtectedRoute isAuthenticated={isAuthenticated}><ChangePassword /></ProtectedRoute>} />
        <Route path = '/updateprofile' element = {<ProtectedRoute isAuthenticated = {isAuthenticated}><UpdateProfile /></ProtectedRoute>} />
        <Route path = '/courses' element = {<Courses />} />
        <Route path = '/courses/:id' element = {<CoursePage />} />
        <Route path = '/contact' element = {<Contact />} />
        <Route path = '/request' element = {<Request />} />
        <Route path='/login' element = {<ProtectedRoute isAuthenticated = {!isAuthenticated} redirect = "/profile"><Login /></ProtectedRoute>} />
        <Route path='/register' element = {<ProtectedRoute isAuthenticated = {!isAuthenticated} redirect = "/profile"><Register /></ProtectedRoute>} />
        <Route path = '/forgetpassword' element = {<ProtectedRoute isAuthenticated = {!isAuthenticated} redirect = "/profile"><ForgetPassword /></ProtectedRoute>} />
        <Route path='/resetpassword/:token' element = {<ProtectedRoute isAuthenticated = {!isAuthenticated} redirect = "/profile"><ResetPassword /></ProtectedRoute>} />
        <Route path='/subscribe' element = {<ProtectedRoute isAuthenticated={isAuthenticated}><Subscribe /></ProtectedRoute>} />
        <Route path='*' element = {<NotFound />} />
        <Route path='/paymentfail' element = {<PaymentFail />} />
        <Route path='/paymentsuccess' element = {<PaymentSuccess />} />
        <Route path='admin/dashboard' element = {<ProtectedRoute adminRoute={true} isAdmin={user && user.role==="admin"} isAuthenticated={isAuthenticated}><Dashboard /></ProtectedRoute>} />
        <Route path='admin/createcourses' element = {<ProtectedRoute adminRoute={true} isAdmin={user && user.role==="admin"} isAuthenticated={isAuthenticated}><CreateCourse /></ProtectedRoute>} />
        <Route path='admin/admincourses' element = {<ProtectedRoute adminRoute={true} isAdmin={user && user.role==="admin"} isAuthenticated={isAuthenticated}><AdminCourses /></ProtectedRoute>}  />
        <Route path='admin/users' element = {<ProtectedRoute adminRoute={true} isAdmin={user && user.role==="admin"} isAuthenticated={isAuthenticated}><Users /></ProtectedRoute>} />
      </Routes>
      <Footer />
      <Toaster />
          </>
        )
      }
    </Router>
  );
}
export default App;
