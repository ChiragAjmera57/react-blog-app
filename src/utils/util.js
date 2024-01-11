export const fetchBlog = () => {
    return new Promise((resolve,reject)=>{
       try {
        const headers = new Headers({
            'Content-Type': 'application/json',
          });
          const request = new Request('http://127.0.0.1:8000/api/posts/', {
            method: 'GET', // or 'POST', 'PUT', etc. depending on your use case
            headers: headers
          });
        fetch(request).then((res)=>{
            if(res.ok){
                return res.json()
            }
            reject("something went wrong")
        }).then((res)=>{
            resolve(res)
        })
       } catch (error) {
        reject(error)
       }
    })
}
export const fetchSingleblog = (slug)=>{
  return new Promise((resolve,reject)=>{
    try {
      const headers = new Headers({
          'Content-Type': 'application/json',
        });
        const request = new Request(`http://127.0.0.1:8000/api/posts/${slug}/`, {
          method: 'GET', // or 'POST', 'PUT', etc. depending on your use case
          headers: headers
        });
      fetch(request).then((res)=>{
          if(res.ok){
              return res.json()
          }
          reject("something went wrong")
      }).then((res)=>{
          resolve(res)
      })
     } catch (error) {
      reject(error)
     }
  })
}

export function formatDate(inputDate) {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
  
    const date = new Date(inputDate);
  
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
  
    const formattedDate = `${month} ${day}, ${year}`;
  
    return formattedDate;
  }

 export function signUp({username, email, password}) {
    if (!username || !email || !password) {
      return Promise.reject(new Error("Please provide all required data."));
    }
  
    const data = {
      username: username,
      email: email,
      password: password,
    };
  
    return fetch('http://127.0.0.1:8000/api/signup/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Invalid credentials or server Error ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // console.log('Sign up successful:', data);
      return data;
    })
    .catch(error => {
      console.error('Error during sign up:', error.message);
      throw error;
    });
  }

 export function login({username, password}) {
    if (!username || !password) {
      return Promise.reject(new Error("Please provide both username and password."));
    }
  
    const data = {
      username: username,
      password: password,
    };
  
    return fetch('http://127.0.0.1:8000/api/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Invalid credentials or server Error `);
      }
      return response.json();
    })
    .then(data => {
      // console.log('Login successful:', data);
      return data;
    })
    .catch(error => {
      console.error('Error during login:', error.message);
      throw error;
    });
  }

  export function getUserById(id) {
    return new Promise((resolve, reject) => {
      if (!id) {
        reject(new Error("Please provide a user ID."));
      }
      const headers = new Headers({
        'Content-Type': 'application/json',
      });
      const request = new Request(`http://127.0.0.1:8000/api/users/${id}/`, {
        method: 'GET', // or 'POST', 'PUT', etc. depending on your use case
        headers: headers
      });
  
      fetch(request)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to fetch user data for ID ${id}`);
          }
          return response.json();
        })
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          console.error(`Error fetching user data for ID ${id}:`, error.message);
          reject(error);
        });
    });
  }

  export function fetchTags(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  
  export function postData(postData) {
    return new Promise((resolve, reject) => {
      if (!postData || !postData.title || !postData.text || !postData.published_date || !postData.image || !postData.feature_img || !postData.post_cat || !postData.tags) {
        reject(new Error('Invalid or missing data'));
        return;
      }
      const{title,text,published_date,image,feature_img,post_cat,tags} = postData
      postData.tags = [Number(tags)]
      const formData = new FormData();
      for (const key in postData) {
        formData.append(key, postData[key]);
      }
      
      fetch('http://127.0.0.1:8000/api/posts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: formData,
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  
  