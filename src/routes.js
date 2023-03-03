/*!

=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

/** 
  All of the routes for the Vision UI Dashboard React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Vision UI Dashboard React layouts
import Dashboard from "layouts/dashboard";
import Functions from "layouts/functions";
import Jobs from "layouts/jobs";
import Monitoring from "layouts/monitoring";
import Backends from "layouts/backends"
import Providers from "layouts/providers"
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Notfound from "layouts/404page"

// Vision UI Dashboard React icons
import { IoRocketSharp } from "react-icons/io5";
import { IoIosDocument } from "react-icons/io";
import { BsFillPersonFill } from "react-icons/bs";
// import { IoBuild } from "react-icons/io5";
import { AiOutlineMonitor, AiFillCarryOut, AiFillRightCircle } from "react-icons/ai";
import { IoStatsChart } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { MdMarkunreadMailbox, MdAccountBalance } from "react-icons/md"



export const routesAuth = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <IoHome size="15px" color="inherit" />,
    component: Dashboard,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Functions",
    key: "functions",
    route: "/functions",
    icon: <AiFillRightCircle size="15px" color="inherit" />,
    component: Functions,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Jobs",
    key: "jobs",
    route: "/jobs",
    icon: <AiFillCarryOut size="15px" color="inherit" />,
    component: Jobs,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Backends",
    key: "backends",
    route: "/backends",
    icon: <MdMarkunreadMailbox size="15px" color="inherit" />,
    component: Backends,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Providers",
    key: "providers",
    route: "/providers",
    icon: <MdAccountBalance size="15px" color="inherit" />,
    component: Providers,
    noCollapse: true,
  },
  { type: "title", title: "Monitoring", key: "monitor-pages" },
  {
    type: "collapse",
    name: "System Monitoring",
    key: "monitoring",
    route: "/monitoring",
    icon: <AiOutlineMonitor size="15px" color="inherit" />,
    component: Monitoring,
    noCollapse: true,
  },
  { type: "title", title: "Account Pages", key: "account-pages" },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <BsFillPersonFill size="15px" color="inherit" />,
    component: Profile,
    noCollapse: true,
  },
];

export const routesNoAuth = [
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    route: "/",
    icon: <IoIosDocument size="15px" color="inherit" />,
    component: SignIn,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: <IoIosDocument size="15px" color="inherit" />,
    component: SignIn,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    route: "/authentication/sign-up",
    icon: <IoRocketSharp size="15px" color="inherit" />,
    component: SignUp,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Not Found",
    key: "not-found",
    route: "/notfound",
    icon: <IoRocketSharp size="15px" color="inherit" />,
    component: Notfound,
    noCollapse: true,
  },
];

