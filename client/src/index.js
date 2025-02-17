import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './views/Home/Home';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EditFilm from './views/EditFilm/EditFilm';
import AddBook from './views/AddBook/AddBook';


const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/film/edit/:id",
    element: <EditFilm />
  },
  {
    path: "/createbook",
    element: <AddBook/>
  },

  
  
]);

root.render(
  <RouterProvider router={router} />
);
