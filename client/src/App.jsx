import "./App.css";
import Login from "./pages/login";
import Navbar from "./components/navbar.jsx";
import { HeroSection } from "./pages/student/HeroSection";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import { RouterProvider } from "react-router";
import Courses from "./pages/student/Courses";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <HeroSection />
            <Courses />
          </>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
