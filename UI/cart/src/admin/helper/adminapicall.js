import { API } from "../../backend";

// Create Category

export const createCategory = (userId, token, category) => {
    // Look from Back end so that we need to implement in same way
    return fetch(`${API}/category/create/${userId}`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
    .then(response => {
        return response.json();
      })
    .catch(err => console.log(err));
}


// get all categories

export const getCategories = () => {
    // Look from Back end so that we need to implement in same way
    return fetch(`${API}/categories`,{
        method: "GET"
    })
    .then(response => {
        return response.json();
      })
    .catch(err => console.log(err));
}

// Product Call

// Create Product

export const createProduct = (userId, token, product) => {
    return fetch(`${API}/product/create/${userId}`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}` 
        },
        body: product
    })
    .then(response => {
        return response.json();
    })
    .catch(err =>{
        console.log(err);
    }) 
}


// get all Products

export const getProducts = () => {
    // Look from Back end so that we need to implement in same way
    return fetch(`${API}/products`,{
        method: "GET"
    })
    .then(response => {
        return response.json();
      })
    .catch(err => console.log(err));
}


// delete a product

export const deleteProduct = (productId, userId, token) => {
    return fetch(`${API}/product/${productId}/${userId}`,{
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}` 
        }
    })
    .then(response => {
        return response.json();
    })
    .catch(err =>{
        console.log(err);
    }) 
}


// get Single Product

export const getProduct = (productId) => {
    // Look from Back end so that we need to implement in same way
    return fetch(`${API}/product/${productId}`,{
        method: "GET"
    })
    .then(response => {
        return response.json();
      })
    .catch(err => console.log(err));
}

// Update Product

export const updateProduct = (productId, userId, token, product) => {
    return fetch(`${API}/product/${productId}/${userId}`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}` 
        },
        body: product
    })
    .then(response => {
        return response.json();
    })
    .catch(err =>{
        console.log(err);
    }) 
}