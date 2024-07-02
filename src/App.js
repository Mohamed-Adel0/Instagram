import { RouterProvider } from "react-router-dom";
import { Routing } from "./Routing/ArrowRouting";
import "./App.css";
import { ThemeProvider } from "./Components/ThemeContext/ThemeContext";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <ThemeProvider>
      <Toaster position="top-center" reverseOrder={true} />
      <RouterProvider router={Routing} />
    </ThemeProvider>
  );
}

export default App;
