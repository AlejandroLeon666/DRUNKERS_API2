import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./screens/Home";
import { RetornoPaypal } from "./screens/Retorno-paypal";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
  },
  {
    path: '/retorno-paypal',
    element: <RetornoPaypal />
  }
];

export default AppRoutes;
