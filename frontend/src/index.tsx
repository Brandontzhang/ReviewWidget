import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import LeetcodeProblemCardList from './app/components/LeetcodeProblemCardComponents/LeetcodeProblemCardList';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AddQuestion from './app/components/FormComponents/AddQuestion';
import Main from './app/components/HomeComponents/Main';
import Review from './app/components/ReviewComponents/Review';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element : <Main />
  },
  {
    path: "/cards",
    element : <LeetcodeProblemCardList />
  }, 
  {
    path : "/create",
    element : <AddQuestion />
  },
  {
    path : "/update/:id",
    element : <AddQuestion />
  },
  {
    path : "/review",
    element : <Review />
  }
])

root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
