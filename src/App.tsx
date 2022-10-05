import { AppRoutes } from "./Routes";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store";
import { useEffect } from "react";
import {
  isSessionActiveAsync,
  selectIsSessionActive,
} from "./reducers/app-reducer";
import { useAppSelector } from "./hooks";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const isSessionActive = useAppSelector(selectIsSessionActive);

  useEffect(() => {
    dispatch(isSessionActiveAsync());
  }, []);

  return (
    <div className="App">
      <AppRoutes hasSession={isSessionActive} />
    </div>
  );
}

export default App;
