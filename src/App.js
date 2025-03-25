import { productsData } from "./api/Api";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Product from "./components/Product";
import { Cart } from "./pages/Cart";
import { Home } from "./pages/Home";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Redirect from "./components/Redirect";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAuth } from "firebase/auth";
import { addUser, loadUserCart, removeTempCart } from "./redux/bazarSlice";
import Loader from "./components/Loader";

const Layout = () => {
  return (
    <div>
      <Loader />
      <Header />
      <ScrollRestoration />
      <Outlet />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: productsData,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },
      {
        path: "/cart",
        element: <Cart />,
        // <ProtectedRoute message="Log in to access your cart">
        // {

        // // </ProtectedRoute>
        // },
      },
      {
        path: "/login",
        element: (
          <Redirect>
            <Login />
          </Redirect>
        ),
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      dispatch(
        addUser({
          uid: user.uid,
          email: user.email,
          name: user.displayName,
          image: user.photoURL,
        })
      );

      const storedCart =
        JSON.parse(localStorage.getItem(`cart_${user.uid}`)) || [];
      dispatch(loadUserCart({ userCart: storedCart, userId: user.uid }));
    } else {
      dispatch(removeTempCart());
    }
  }, [dispatch]);
  return (
    <div className="font-bodyFont">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
