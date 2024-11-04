import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Home } from './sections/Home.jsx'
import { Signup } from './sections/Signup'
import { AuthContextProvider } from './contexts/AuthContext.jsx'
import { Login } from './sections/Login.jsx'
import { Sidebar } from './sections/Sidebar.jsx'
import './index.css'
//import { Welcome } from './sections/Welcome.jsx'
import { UserHomeProvider } from './contexts/UserHomeContext.jsx'
import { ChannelProvider } from './contexts/ChannelContext.jsx'
import { SocketProvider } from './contexts/SocketContext.jsx'
const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },

  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/Sidebar',
    element: <Sidebar />,
  },
])

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <UserHomeProvider>
          <ChannelProvider>
            <SocketProvider>
              <RouterProvider router={router} />
            </SocketProvider>
          </ChannelProvider>
        </UserHomeProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  )
}
