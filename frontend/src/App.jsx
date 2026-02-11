import { Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Customize from "./pages/Customize";
import { userDataContext } from "./context/UserContext";
import Customize2 from "./pages/Customize2";

function App() {
  const { userData } = useContext(userDataContext);

  const isAuthenticated = Boolean(userData?._id); 
  const isCustomized = Boolean(
    userData?.assistantImage && userData?.assistantName
  );

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated
            ? isCustomized
              ? <Home />
              : <Navigate to="/customize" />
            : <Navigate to="/signin" />
        }
      />

      <Route
        path="/signup"
        element={!isAuthenticated ? <SignUp /> : <Navigate to="/" />}
      />

      <Route
        path="/signin"
        element={!isAuthenticated ? <SignIn /> : <Navigate to="/" />}
      />

      <Route
        path="/customize"
        element={isAuthenticated ? <Customize /> : <Navigate to="/signup" />}
      />
      <Route
        path="/customize2"
        element={isAuthenticated ? <Customize2 /> : <Navigate to="/signup" />}
      />
    </Routes>
  );
}

export default App;
