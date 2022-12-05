import Auth from "./pages/Auth"
import History from "./pages/History"
import Hub from "./pages/Hub"
import MainPage from "./pages/MainPage"
import Transaction from "./pages/Transaction"
import { AUTH_ROUTE, HISTORY_ROUTE, HUB_ROUTE, REGISTRATION_ROUTE, MAINPAGE_ROUTE, TRANSACTION_ROUTE } from "./utils/consts"


export const authRoutes = [
    {
        path: HUB_ROUTE,
        Component: <Hub />
    },
    {
        path: TRANSACTION_ROUTE,
        Component: <Transaction />
    },
    {
        path: HISTORY_ROUTE,
        Component: <History />
    },
    {
        path: HUB_ROUTE,
        Component: <Hub />
    },
]

export const publicRoutes = [
    {
        path: REGISTRATION_ROUTE,
        Component: <Auth/>
    },
    {
        path: AUTH_ROUTE,
        Component: <Auth/>
    },
    {
        path: MAINPAGE_ROUTE,
        Component: <MainPage />
    },
]