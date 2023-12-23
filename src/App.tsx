import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';

import { CarList, CarCreate, CarUpdate, CarDetail } from './pages/cars';
import Login from './pages/Login';
import { theme } from './config/theme';

const router = createBrowserRouter([
    {
        path: '/',
        element: <CarList />,
    },

    {
        path: '/detail/:id',
        element: <CarDetail />,
    },

    {
        path: '/create',
        element: <CarCreate />,
    },

    {
        path: '/update/:id',
        element: <CarUpdate />,
    },

    {
        path: '/login',
        element: <Login />,
    },
]);
export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}
