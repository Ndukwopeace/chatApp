import {createBrowserRouter , RouterProvider , Route} from 'react-router-dom';
import App from './App';
import ChatWindow from './components/ChatWindow';
import Home from './Pages/Home';
import Chats from './Pages/Chats';
const router = createBrowserRouter([
    {
        path:"/",
        element: <App/>,
        children : [
            {
                path : "/",
                element : <Home/>
            },
            {
                path: "/chats",
                element : <Chats />
            }
        ]
    }
]);

export default router;