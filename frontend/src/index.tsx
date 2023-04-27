import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './app/store';
import AddQuestion from './app/components/AddQuestion';
import LeetcodeProblemCardFront from './app/components/LeetcodeProblemCardComponents/LeetcodeProblemCardFront';
import LeetcodeProblemCardList from './app/components/LeetcodeProblemCardComponents/LeetcodeProblemCardList';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <AddQuestion /> */}
      <LeetcodeProblemCardList />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
