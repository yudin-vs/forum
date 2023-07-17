import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import CreateUser from './pages/user/CreateUser';
import CreateResource from './pages/resources/CreateResource';
import ServiceResourcesList from './pages/resources/ResourcesViewPage';
import UserResourcesList from './pages/UserResourcesList';
import ResourcesService from './pages/dashboard/ResourcesService';
import Users from './pages/user/UserViewPage';
import EditUser from './pages/user/EditUser';
import EditResource from './pages/resources/EditResource';
import { Provider } from 'react-redux';
import store from './store'; 


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Users" element={<Users />} />
        <Route path="/EditUser/:id" element={<EditUser />} />
        <Route path="/CreateUser" element={<CreateUser />} />
        <Route path="/resourcesList" element={<ServiceResourcesList />} />
        <Route path="/UserResourcesList" element={<UserResourcesList />} />
        <Route path="/CreateResource" element={<CreateResource />} />
        <Route path="/EditResource/:id" element={<EditResource />} />
        <Route path="/ResourcesService" element={<ResourcesService />} />      
      </Routes>
    </BrowserRouter>
  </Provider>  
);


EditResource

 