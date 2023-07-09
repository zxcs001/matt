import React, { lazy } from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const Dashboard = lazy(() => import('./features/Dashboard'));
const Podcast = lazy(() => import('./features/Podcast'));
const Episode = lazy(() => import('./features/Episode'));

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <Dashboard />
      },
      {
        path: '/podcast/:podcastId',
        element: <Podcast />
      },
      {
        path: '/podcast/:podcastId/episode/:episodeId',
        element: <Episode />
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient} >
      <RouterProvider router={router} ></RouterProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

reportWebVitals();
