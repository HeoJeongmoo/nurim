import { createBrowserRouter } from 'react-router-dom'
import PageLayout from '../components/layout/PageLayout'
import Home from '../pages/Home'

const router = createBrowserRouter([
  {
    path: '/',
    element: <PageLayout />,
    children: [
      { index: true, element: <Home /> }
    ],
  },
])

export default router