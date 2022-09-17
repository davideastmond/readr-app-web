import { NavBar } from "./components/navbar";
import { AppRoutes } from "./Routes";

function App() {
  return (
    <div className="App">
      <AppRoutes nav={<NavBar />} />
    </div>
  );
}

export default App;
