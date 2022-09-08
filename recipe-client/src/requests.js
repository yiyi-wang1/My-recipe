const baseURL = "http://localhost:3000/api/v1";

export const Meal = {
    index() {
        return fetch(`${baseURL}/meals`)
        .then(response => {
            return response.json();
        })
    },

    create(params) {
        console.log(params)
        return fetch(`${baseURL}/meals`, {
            method: 'POST',
            credentials: 'include', 
            body: params
        }).then((res) => res.json());
    },

    show(id) {
        return fetch(`${baseURL}/meals/${id}`)
        .then(res => res.json());
    },

    top5() {
        return fetch(`${baseURL}/meals/top5`)
        .then(response => {
            return response.json();
        })
    },

    destroy(id) {
        return fetch(`${baseURL}/meals/${id}`, {
          method: 'DELETE',
          credentials: 'include',
        })
    }
}

export const Comment = {
    create(params) {
        return fetch(`${baseURL}/meals/${params.meal_id}/comments`, {
            method: 'POST',
            credentials: 'include', 
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(params)
        }).then((res) => res.json());
    }
}

export const Session = {
    create(params) {
        return fetch(`${baseURL}/session`, {
            method: 'POST',
            credentials: 'include', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        }).then(res => res.json());
    },

    destroy() {
        return fetch(`${baseURL}/session`, {
            method: 'DELETE',
            credentials: 'include' 
        }).then(res => res.json());
    }
}


export const User = {
    current() {
        return fetch(`${baseURL}/users/current`, {
            credentials: 'include'
        }).then(res => res.json());
    },

    create(params) {
        return fetch(`${baseURL}/users`, {
            method: 'POST',
            credentials: 'include',
            body: params
        }).then((res) => res.json());
    },

    update_password(id, params) {
        return fetch(`${baseURL}/users/${id}/update_password`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
              "Content-Type": 'application/json'
            },
            body: JSON.stringify(params)
        }).then(res => res.json())
    },

    update_profile_image(id, params) {
        return fetch(`${baseURL}/users/${id}/update_profile_image`, {
            method: 'PATCH',
            credentials: 'include',
            body: params
        }).then(res => res.json())
    },

    favourites(id) {
        return fetch(`${baseURL}/users/${id}/favourited`)
                .then(response => {
                    return response.json();
                })
     }
}

export const Favourite = {
    create(params) {
        return fetch(`${baseURL}/meals/${params.meal_id}/favourites`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(params)
        }).then((res) => res.json());
    },

    destroy(id) {
        return fetch(`${baseURL}/favourites/${id}`, {
          method: 'DELETE',
          credentials: 'include'
        })
    }
}

export const Search = {
    search(keyword) {
        return fetch(`${baseURL}/search/${keyword}`)
        .then(res => res.json());
    }
}

export const Category = {
    show(id) {
        return fetch(`${baseURL}/categories/${id}`)
        .then(res => res.json());
    }
}