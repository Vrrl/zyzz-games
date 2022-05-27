const url = "https://free-to-play-games-database.p.rapidapi.com/api";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    "X-RapidAPI-Key": "975d432858msh0023267fd6375adp116d8bjsn7f3e4cba4dbd",
  },
};

const paramsUrl = {
  pc: "/games?platform=pc",
  relavance: "/games?sort-by=relevance",
  browser: "/games?platform=browser"
};


const getData = async (params) => {
  return await fetch(`${url}${params}`, options)
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((err) => console.error(err));
};

const navigationSelected = {
  0: paramsUrl.pc,
  1: paramsUrl.browser,
  2: paramsUrl.relavance
}

export async function selected (opc) {
    const url = navigationSelected[opc]
    return await getData(url);
};
