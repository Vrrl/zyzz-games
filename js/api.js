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

const categorySelected = {
  0: "&sort-by=popularity",
  1: "&category=pvp",
  2: "&category=mmofps",
  3: "&category=survival",
  4: "&category=card",
  5: "&category=fighting",
  6: "&category=shooter"
}

export async function selected (gamePlatform, gameCategory) {
    const url = `${navigationSelected[gamePlatform]}${categorySelected[gameCategory]}`
    return await getData(url);
};

export async function getMainGame(gameID){
  const url = `/game?id=${gameID}`
  return await getData(url) 
}
