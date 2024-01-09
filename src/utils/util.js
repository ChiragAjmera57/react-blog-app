export const fetchBlog = () => {
    return new Promise((resolve,reject)=>{
       try {
        const headers = new Headers({
            'Content-Type': 'application/json',
          });
          const request = new Request('http://192.168.1.10:8000/api/posts/', {
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
  
    // Create a Date object from the input string
    const date = new Date(inputDate);
  
    // Get the month, day, and year
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
  
    // Format the date string
    const formattedDate = `${month} ${day}, ${year}`;
  
    return formattedDate;
  }