import { AppRoutes } from "./Routes";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store";
import { useEffect } from "react";
import { selectIsSessionActive } from "./reducers/app/app.reducer";
import { useAppSelector } from "./hooks";
import { isSessionActiveAsync } from "./reducers/app/thunks/app.thunks";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const isSessionActive = useAppSelector(selectIsSessionActive);

  useEffect(() => {
    dispatch(isSessionActiveAsync());
    window.addEventListener("focus", handleOnFocus);
    return () => {
      window.removeEventListener("focus", handleOnFocus);
    };
  }, []);

  const handleOnFocus = () => {
    dispatch(isSessionActiveAsync());
  };

  return (
    <div className="App">
      <AppRoutes hasSession={isSessionActive} />
    </div>
  );
}

export default App;
