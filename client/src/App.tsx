import { FC } from "react";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import { Route, Routes, Navigate } from "react-router";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import EditProfile from "./pages/EditProfile";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchMe } from "./redux/slices/auth.slice";
import { AppDispatch } from "./redux/store";
import FullPost from "./pages/FullPost";

const App: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchMe());
  }, []);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/posts" element={<Home />} />
        <Route path="/posts/:id" element={<FullPost />} />
        <Route path="/me" element={<Profile />} />
        <Route path="/me/edit" element={<EditProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<CreatePost />} />
      </Routes>
    </>
  );
};

export default App;
