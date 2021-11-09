const postData = async (url = '', data = {}) => {
  const config = {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', 
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer'
  }
  
  const request = { ...config, body: JSON.stringify(data) }
  
  try { 
    const response = await fetch(url, request);
    return response.json(); 
  } catch (e) {
    console.error(e)
  }
}

export const mint = async (attendees = [], url, filename) => {
  const endpoint = "http://localhost:3000/mint"
  const json = await postData(endpoint, { attendees, url, filename })
  console.log('json', json);
  return json;
}
