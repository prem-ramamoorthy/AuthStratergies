import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'
import App from './App.tsx'
import { Dashboard } from './Dashboard.tsx';
import Cango from './Cango.tsx';

const router = createBrowserRouter([
  {
    path: '/', element: <App />,
  }, {
    element: <Cango />,
    children: [
      { path: '/dashboard', element: <Dashboard /> }
    ]
  }
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
