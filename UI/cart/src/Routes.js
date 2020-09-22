import React from 'react';

import Home from "../src/core/Home";

import Signup from './user/Signup';
import Signin from './user/Signin';

import { BrowserRouter, Switch, Route } from "react-router-dom";

import PrivateRoute from './auth/helper/PrivateRoutes';
import UserDashBoard from './user/UserDashBoard';
import AdminDashBoard from './user/AdminDashBoard';
import AdminRoute from './auth/helper/AdminRoutes';
import AddCategory from './admin/AddCategory';
import ManageCategories from './admin/ManageCategories';
import AddProduct from './admin/AddProduct';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';


const Routes = () => {
  return (
    <div>
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} /> 
                <Route path="/signup" exact component = {Signup} />
                <Route path="/signin" exact component = {Signin} />
                <PrivateRoute path="/user/dashboard" exact component = {UserDashBoard} />
                <AdminRoute path="/admin/dashboard" exact component = {AdminDashBoard} />
                <AdminRoute path="/admin/create/category" exact component = {AddCategory} />
                <AdminRoute path="/admin/categories" exact component = {ManageCategories} />
                {/* Got URL path from AdminDashBoard */}
                <AdminRoute path="/admin/create/product" exact component = {AddProduct} />
                <AdminRoute path="/admin/products" exact component = {ManageProducts} />
                {/* URL from Manage Product */}
                <AdminRoute path="/admin/product/update/:productId" exact component = {UpdateProduct} />
            </Switch>
        </BrowserRouter>
    </div>
  );
}

export default Routes;
