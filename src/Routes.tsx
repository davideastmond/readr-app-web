import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./scenes/home";

export function AppRoutes({ nav }: { nav?: JSX.Element }) {
  return (
    <Router>
      {nav}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="headlines" element={<p>Headlines Page placeholder</p>} />
      </Routes>
    </Router>
  );
}
