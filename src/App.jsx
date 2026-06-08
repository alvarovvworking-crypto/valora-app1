import { Routes, Route } from "react-router-dom";

import Landingpage from "./pages/Landingpage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Landingpage />}
      />

      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/dashboard"
        element={<Dashboard />}
      />

      <Route
        path="/settings"
        element={<Settings />}
      />
    </Routes>
  );
}

export default App;