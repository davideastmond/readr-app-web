import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HeadlinesPage } from "./scenes/headlines";
import { HomePage } from "./scenes/home";

export function AppRoutes({ nav }: { nav?: JSX.Element }) {
  return (
    <Router>
      {nav}
      <div className="MainPageBufferSpace">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/headlines" element={<HeadlinesPage />} />
        </Routes>
      </div>
    </Router>
  );
}
