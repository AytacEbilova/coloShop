import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ROUTES } from "./routes/ROUTES";
import BasketProvider from "./context/basketContext";
import FavProvider from "./context/wishlistContext";
function App() {
  const router = createBrowserRouter(ROUTES);
  return (
    <>
      <BasketProvider>
        <FavProvider>
          <RouterProvider router={router} />
        </FavProvider>
      </BasketProvider>
    </>
  );
}

export default App;
