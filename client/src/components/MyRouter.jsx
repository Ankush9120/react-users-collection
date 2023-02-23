import { HashRouter, Route, Routes } from "react-router-dom";
import MainHeader from './MainHeader'
import Home from './Home'
import Login from './Login'
import About from './About'
import Register from './Register'
import Contact from './Contact'
import Logout from './Logout'
import Error from './Error'

const MyRouter = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainHeader />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default MyRouter;
