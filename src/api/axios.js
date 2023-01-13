import axios from 'axios'

export const getArtsAxios = async(pageNum=1, signal, searchValue='') => {

  console.log(searchValue);
  console.log(pageNum);

    let searchUrl = `https://api.artic.edu/api/v1/artworks/search?q=${searchValue}`

      let optionsChicagoInst = {
        method: 'GET',
        url: searchValue ? searchUrl :'https://api.artic.edu/api/v1/artworks',
        params: {page: `${pageNum}`, limit: '20'},
        signal: signal
      };

      let optionsLocalHost = {
        method: 'GET',
        url: 'http://localhost:3000/'
      }

    const response = await axios.request(optionsChicagoInst);
    return response.data;
}
