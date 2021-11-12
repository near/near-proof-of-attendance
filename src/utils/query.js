import { BASE_URL } from "./endpoints";

const getData = async (url = '') => {
  const config = {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', 
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer'
  }
  
  try {
    const response = await fetch(url);
    return response.json(); 
  } catch (e) {
    console.error(e)
  }
}

export const query = async (account_id) => {
  // Server side query logic
  // const endpoint = "http://localhost:3000/badges/" + account_id
  const endpoint = `${BASE_URL}/badges/${account_id}`
  const json = await getData(endpoint);
  // console.log('json', json);
  let data, error;

  try {
    const json = await getData(endpoint);
    data = json
  } catch (error) {
    console.log('Error query', error);
    error = error
  }
  
  // Client side query logic
  // try {
  //   const token_ids = await window.contract.nft_tokens_for_owner({ account_id });
  //   const nft_tokens = async (token_id) => {
  //     const nft_token = await window.contract.nft_token({ token_id })
  //     return nft_token.metadata;
  //   }
  //   const nfts = Promise.all(token_ids.map(nft_tokens));
  //   data = await nfts;
  // 
  // } catch (error) {
  //   console.log('Error query', error);
  //   error = error
  // }
  console.log(data);
  return {
    data,
    error
  }
}
