import { BrowserRouter, Route, Routes } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";
import ScrollToTop from "./components/common/ScrollToTop";
import PrivateRoute from "./components/common/PrivateRoute";

import Home from "./pages/Home";
import Search from "./pages/Search";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import Library from "./pages/Library";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/movie/:id" element={<MovieDetailsPage />} />

          <Route
            path="/library"
            element={
              <PrivateRoute>
                <Library />
              </PrivateRoute>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;