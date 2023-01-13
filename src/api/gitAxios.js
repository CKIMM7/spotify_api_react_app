export const getGitUserAxiosRest = async() => {


    let searchUrl = `https://api.github.com/users/ckimm7/repos`

      let optionsChicagoInst = {
        method: 'GET',
        url: searchUrl,
      };


    const response = await axios.get(optionsChicagoInst);
    return response.data;
}
