import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

// interface Props {
//   component: React.ComponentType;
//   path?: string;
//   roles: Array<string>;
// }

// export const PrivateRoute: React.FC<Props> = ({
//   component: RouteComponent,
//   roles,
// }) => {
//   let auth = useAuth();
//   const userHasRequiredRole =
//     auth.user && roles.includes(auth.user.role) ? true : false;

//   if (auth.user && userHasRequiredRole) {
//     return <RouteComponent />;
//   }

//   if (auth.user && !userHasRequiredRole) {
//     // return <AccessDenied />
//     return <div>Access denied</div>;
//   }

//   return <Navigate to="/" />;
// };

/**
 //Usage
 function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<NotFound />} />
        <Route
          path="dashboard"
          element={<PrivateRoute roles={[ROLE.ADMIN]} component={Dashboard} />}
        />
        <Route
          path="users"
          element={<PrivateRoute roles={[ROLE.ADMIN, ROLE.USER]} component={Users} />}
        />
      </Routes>
    </div>
  )
}
 */
