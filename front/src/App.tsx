import React, { useEffect } from "react";
import "./App.css";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Root from "./pages/Root/Root";
import {auth$} from "./services/Authentication/AuthenticationService";

interface ProtectedRouteProps {
    isAuthenticated: boolean;
    children?: React.ReactNode;
}


function App() {
    const [isAuthenticated, setIsAuthenticated] = React.useState(true);

    useEffect(() => {
        const sub = auth$.subscribe({
            next: (state: {isAuthenticated: boolean}) => {
                setIsAuthenticated(state.isAuthenticated);
            },
        });

        return () => {
            sub.unsubscribe();
        };
    }, []);

    /**
     * createBrowserRouter function creates a router object that is used to render the application.
     * Root components is the main components that is rendered when the path is '/'.
     * The router object is created with an array of route objects.
     * Each route object has the following properties:
     * - path: the path of the route
     * - element: the element to render when the route is matched
     * - errorElement: the element to render when the route is not matched
     * - children: an array of child route objects
     */
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root isAuthenticated={isAuthenticated} />,
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
