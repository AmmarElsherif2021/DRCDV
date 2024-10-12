import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { Home } from './sections/Home.jsx'
import { Signup } from './sections/Signup'
import { AuthContextProvider } from './contexts/AuthContext.jsx'
import { Login } from './sections/Login.jsx'
import { ChannelsBoard } from './sections/ChannelsBoard.jsx'
import './index.css'
const queryClient = new QueryClient()
export default function App() {
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
      path: '/channelsBoard',
      element: <ChannelsBoard />,
    },
  ])
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </QueryClientProvider>
  )
}
