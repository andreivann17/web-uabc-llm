import { createRef } from "react";
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
import Profiles from "./containers/pages/profiles";
import Home from "./containers/pages/home";
import Consult from "./containers/pages/consult"
import Patients from "./containers/pages/patients";
import History from "./containers/pages/history";
import Statistics from "./containers/pages/statistics";
import Records from "./containers/pages/records";
import NotFound from "./containers/errors/error404";
import "./assets/css/bootstrap.css";
import "./assets/css/administrador.css";
import "./styles.css";
import "./assets/css/styles.css";
import "./assets/css/scroll.css";
import "./assets/css/utils.css";
import store from "./store";
import { Provider, useDispatch } from "react-redux";
import DiagnosisAi from "./containers/pages/diagnosisai";
const token = localStorage.getItem("tokends");
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
    path: "/profiles",
    value: "profiles-0",
    name: "Profiles",
    element: <Profiles />,
    nodeRef: createRef(),
    className: "Profiles",
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
    path: "/records",
    value: "1-0",
    name: "Records",
    element: <Records />,
    nodeRef: createRef(),
    className: "Records",
  },
  
  {
    path: "/patient",
    value: "1-1",
    name: "Patients",
    element: <Patients />,
    nodeRef: createRef(),
    className: "Patients",
  },
  {
    path: "/history",
    value: "1-1",
    name: "History",
    element: <History />,
    nodeRef: createRef(),
    className: "History",
  },
  {
    path: "/statistics",
    value: "1-0",
    name: "Statistics",
    element: <Statistics />,
    nodeRef: createRef(),
    className: "Statistics",
  },
  {
    path: "/diagnosis",
    value: "1-0",
    name: "Diagnosisai",
    element: <DiagnosisAi />,
    nodeRef: createRef(),
    className: "Diagnosisai",
  },
  {
    path: "/consult",
    value: "1-0",
    name: "Consult",
    element: <Consult />,
    nodeRef: createRef(),
    className: "Consult",
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
  if (token == null) {
    if (normalpath != "/login") {
      navegate("/login");
    }
  }


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
  
  return (
    <>
    {
     ( normalpath !== "/login" &&  normalpath !== "/profiles") &&

     <Menu
   
          valuenav={routeclass.split("-")[0]}
          subvalue={routeclass.split("-")[1]}
        ></Menu>
      }
<div onScroll={(evt) => onScroll(evt)} onContextMenu={handleRightClick} className={(normalpath === "/login" || normalpath ==="/profiles") ? "" : "div_contentmaster"}>
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
