import { lazy } from "react";
import { Navigate } from "react-router-dom";

const Home = lazy(() => import("./pages/home/page"));
const AdminControl = lazy(() => import("./layouts/admin/page"));
const Install = lazy(() => import("./pages/install/page"));
const Dashboard = lazy(() => import("./pages/dashboard/page"));
const Hero = lazy(() => import("./pages/hero/page"));
const About = lazy(() => import("./pages/about/page"));
const Services = lazy(() => import("./pages/services/page"));
const Gallery = lazy(() => import("./pages/gallery/page"));
const Experience = lazy(() => import("./pages/experience/page"));
const Testimonial = lazy(() => import("./pages/testimonial/page"));
const Contact = lazy(() => import("./pages/contact/page"));
const Blog = lazy(() => import("./pages/blog/page"));
const Profile = lazy(() => import("./pages/profile/page"));
const Settings = lazy(() => import("./pages/settings/page"));
const NotFound = lazy(() => import("./pages/not-found/page"));
const Login = lazy(() => import("./pages/login/page"));

const routes = [
  {
    index: true,
    path: "/",
    element: <Home />,
  },
  {
    path: "/admin",
    element: <AdminControl />,
    children: [
      {
        index: true,
        element: <Navigate to={"install"} replace />,
      },
      {
        path: "install",
        element: <Install />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "hero",
        element: <Hero />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "gallery",
        element: <Gallery />,
      },
      {
        path: "experience",
        element: <Experience />,
      },
      {
        path: "testimonials",
        element: <Testimonial />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export { routes };
