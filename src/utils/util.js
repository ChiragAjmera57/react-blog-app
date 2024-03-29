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
      if (!postData || !postData.title || !postData.author || !postData.text || !postData.published_date || !postData.image || !postData.feature_img || !postData.post_cat || !postData.tags) {
        reject(new Error('Invalid or missing data'));
        return;
      }
      const{tags} = postData
      postData.tags = [Number(tags)]
      const formData = new FormData();
      for (const key in postData) {
        
        formData.append(key, postData[key]);
      }
      
      fetch('http://127.0.0.1:8000/api/posts/', {
        method: 'POST',
        headers: {
          // 'Content-Type': 'application/json',
          // 'Content-Type': 'multipart/form-data; ',
          // 'enctype': 'multipart/form-data',
        },
        // enctype: 'multipart/form-data',
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

export function organizeComments(comments) {
  const ans = {}
  comments.forEach((ele) => {
    if (ele.parent == null) {
      const id = ele.id;
      ans[id] = ele;
      ans[id]['reply'] = []
    }
  });
  comments.forEach((ele)=>{
    if(ele.parent !==null){
      const parentId = ele.parent.id
      ans[parentId]['reply'].push(ele)
    }
  })
 console.log(ans)
 return ans

  }

export function getDurationString(dateString) {
  // Parse the input date string
  const inputDate = new Date(dateString);

  // Get the current date
  const currentDate = new Date();

  // Calculate the time difference in milliseconds
  const timeDifference = currentDate - inputDate;

  // Convert the time difference to days, weeks, and years
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(days / 7);
  const years = Math.floor(weeks / 52);

  // Determine the appropriate unit and value
  if (years > 50) {
      return `${years} ${years === 1 ? 'year' : 'years'}`;
  } else if (weeks > 50) {
      return `${weeks} ${weeks === 1 ? 'week' : 'weeks'}`;
  } else {
      return `${days} ${days === 1 ? 'day' : 'days'}`;
  }
}

export function formatDatetostring(dateString) {
  const dateObject = new Date(dateString);

  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(dateObject.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function updatepostData(postData,slug) {
  return new Promise((resolve, reject) => {
    if (!postData || !postData.title || !postData.author || !postData.text || !postData.published_date || !postData.image || !postData.feature_img || !postData.post_cat || !postData.tags) {
      reject(new Error('Invalid or missing data'));
      return;
    }
    const{tags} = postData
    postData.tags = [Number(tags)]
    const formData = new FormData();
    for (const key in postData) {
      
      formData.append(key, postData[key]);
    }
    
    fetch(`http://127.0.0.1:8000/api/posts/${slug}/`, {
      method: 'PATCH',
      headers: {
        // 'Content-Type': 'application/json',
        // 'Content-Type': 'multipart/form-data; ',
        // 'enctype': 'multipart/form-data',
      },
      // enctype: 'multipart/form-data',
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