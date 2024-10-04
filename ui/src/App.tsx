import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useOutlet,
} from "react-router-dom";

import LoginPage from "pages/public/login";
// import DashboardPage from "pages/protected/dashboard";
import SettingsPage from "pages/protected/settings";
import NoMatchPage from "pages/generic/no_match";
import Users from "pages/protected/users";
import Projects from "pages/protected/projects";

import "./App.css";
import { useAuth, AuthProvider } from "components/hooks/useAuth";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { DataProvider } from "./context/data_context";

const HomeLayout = () => {
  const { token } = useAuth();
  const outlet = useOutlet();

  if (token) {
    return <Navigate to="/" replace />;
  }

  return <div>{outlet}</div>;
};

const ProtectedLayout = () => {
  const { token } = useAuth();
  const outlet = useOutlet();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <div>{outlet}</div>;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GoogleOAuthProvider
          clientId={process.env.REACT_APP_SOCIAL_AUTH_GOOGLE_APP_ID || ""}
        >
          <DataProvider>
            <Routes>
              <Route element={<HomeLayout />}>
                {/* <Route path="/" element={<HomePage />} /> */}
                <Route path="/login" element={<LoginPage />} />
              </Route>

              <Route path="/" element={<ProtectedLayout />}>
                <Route path="" element={<Users />} />
                <Route path="dashboard" element={<Users />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="/users" element={<Users />} />
                <Route path="/projects" element={<Projects />} />
              </Route>

              {/* This has to be at the end of the list */}
              <Route path="*" element={<NoMatchPage />} />
            </Routes>
          </DataProvider>
        </GoogleOAuthProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { DataProvider } from "./context/data_context";
// import Users from "pages/protected/users";
// import Projects from "pages/protected/Projects";

// const App: React.FC = () => {
//   return (
//     <DataProvider>
//       <Router>
//         <Routes>
//           <Route path="/users" element={<Users />} />
//           <Route path="/Projects" element={<Projects />} />
//         </Routes>
//       </Router>
//     </DataProvider>
//   );
// };

// export default App;
