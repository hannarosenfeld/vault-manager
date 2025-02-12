import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="flex flex-col m-auto w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-[800px]">
      <NavBar />
      <div className="h-[90vh]">
        <HomePage />
      </div>
    </div>
  );
}

export default App;
