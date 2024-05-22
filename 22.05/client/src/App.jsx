
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ROUTES } from './routes/ROUTES';
import BasketProvider from './context/basketContext';
function App() {
  const router = createBrowserRouter(ROUTES)
  return (
    <>
    <BasketProvider>
    <RouterProvider router={router} />
    </BasketProvider>
      
    </>
  )
}

export default App
