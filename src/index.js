import { createRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
  useOutlet,
  useNavigate,
} from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import {actionScroll} from "./redux/actions/utils/utils"
import Menu from "./components/navigation/menus";
import Login from "./containers/pages/login";
import Signup from "./containers/pages/signup";
import Home from "./containers/pages/home";
import Retina from "./containers/pages/retina";
import NotFound from "./containers/errors/error404";
import "./assets/css/bootstrap.css";
import "./assets/css/administrador.css";
import "./styles.css";
import "./assets/css/styles.css";
import "./assets/css/utils.css";
import store from "./store";
import { Provider, useDispatch } from "react-redux";

const routes = [
 
 
  {
    path: "/login",
    value: "login-0",
    name: "Login",
    element: <Login />,
    nodeRef: createRef(),
    className: "Login",
  },
   {
    path: "/signup",
    value: "signup-0",
    name: "Signup",
    element: <Signup />,
    nodeRef: createRef(),
    className: "Signup",
  },
  
  {
    path: "/",
    value: "0-0",
    name: "Home",
    element: <Home />,
    nodeRef: createRef(),
    className: "Home",
  },
    {
    path: "/retina",
    value: "0-0",
    name: "Retina",
    element: <Retina />,
    nodeRef: createRef(),
    className: "Retina",
  },
   
  {
    path: "*",
    value: "NotFound",
    name: "NotFound",
    element: <NotFound />,
    nodeRef: createRef(),
    className: "NotFound",
  },
  
];
const router = createBrowserRouter([
  {
    path: "/",
    element: <Example />,
    children: routes.map((route) => ({
      index: route.path === "/",
      path: route.path === "/" ? undefined : route.path,
      element: route.element,
    })),
  },
]);

function Example() {
  const navegate = useNavigate();
  const dispatch = useDispatch()
  const location = useLocation();
  const currentOutlet = useOutlet();
  const pathname = location.pathname;
  const normalpath = pathname.replace(/\/+$/, "");
  const [token,setToken]  = useState(localStorage.getItem("tokends"))



let routecorrect = null;
let id = normalpath.split('/').pop(); 

if (id) {
    routecorrect = routes.find(route => {
        
        let routeSegments = route.path.split('/');
        let lastSegment = routeSegments.pop();

        if (lastSegment === ':id' && normalpath.startsWith(routeSegments.join('/'))) {
            return true;
        }
        return false;
    });
} else {
    routecorrect = routes.find(route => normalpath === route.path);
}

  const handleRightClick = (event) => {
    if (event.target.classList.contains('cardcatalogo')) {
      event.preventDefault();
    }
  }
  const onScroll = (event) =>{
    dispatch(actionScroll(event.currentTarget.scrollTop))

  }
  const routeclass = routecorrect?.value || "unknown";


  const { nodeRef } =
    routes.find((route) => route.path === location.pathname) ?? {};
  console.log(normalpath)
  
  return (
    <>
   
       
<div style={{background:"#f6f7fb"}} onScroll={(evt) => onScroll(evt)} onContextMenu={handleRightClick}>
        <div>
          <SwitchTransition>
            <CSSTransition
              key={location.pathname}
              nodeRef={nodeRef}
              timeout={200}
              classNames="page"
              unmountOnExit
            >
              {(state) => (
                <div ref={nodeRef} className="page">
                  {currentOutlet}
                </div>
              )}
            </CSSTransition>
          </SwitchTransition>
        </div>
      </div>
    </>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
