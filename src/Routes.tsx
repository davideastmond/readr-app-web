import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { NavBar } from "./components/navbar";
import { setNullUserSession } from "./reducers/app/app.reducer";
import HeadlinesFeed from "./scenes/feed";
import { HomePage } from "./scenes/home";
import { HubPage } from "./scenes/hub";
import { LoginPage } from "./scenes/login";
import { RegisterPage } from "./scenes/register";
import { Settings } from "./scenes/settings";
import { SessionClient } from "./services/client/session-client";
import { TokenHandler } from "./services/handlers/token-handler";
import { AppDispatch } from "./store";

export function AppRoutes({ hasSession }: { hasSession: boolean }) {
  const dispatch = useDispatch<AppDispatch>();
  const LogOutUser = () => {
    useEffect(() => {
      logOutUser();
    }, []);

    const logOutUser = async () => {
      if (hasSession) {
        const sessionClient = new SessionClient();
        try {
          await sessionClient.logOut();
        } catch (err: any) {
          console.log(err.message);
        } finally {
          TokenHandler.clearAuthToken();
          dispatch(setNullUserSession());
        }
      } else {
        TokenHandler.clearAuthToken();
        dispatch(setNullUserSession());
      }
    };
    return <Navigate to="/" replace />;
  };
  return (
    <Router>
      <NavBar hasSession={hasSession} />
      <div className="MainPageBufferSpace">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/headlines"
            element={
              <HeadlinesFeed mode={"headlines"} hasSession={hasSession} />
            }
          />
          <Route
            path="/login"
            element={
              hasSession ? <HubPage hasSession={hasSession} /> : <LoginPage />
            }
          />
          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/hub"
            element={
              hasSession ? <HubPage hasSession={hasSession} /> : <HomePage />
            }
          />
          <Route path="/logout" element={<LogOutUser />} />
          <Route
            path="/settings"
            element={
              hasSession ? <Settings hasSession={hasSession} /> : <HomePage />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}
