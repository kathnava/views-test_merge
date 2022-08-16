const searchCity = document.getElementById('citySearch');
const matchCityList = document.getElementById('cityList');

searchCity.addEventListener('keyup', () => filterCity(searchCity.value));

const filterCity = async searchText => {
    const res = await fetch('https://geo.api.gouv.fr/communes');
    const city = await res.json();
    
    let matches = city.filter(match => {
        const regex = new RegExp(`^${searchText}`, 'gi')
        return match.nom.match(regex)
    })

    if (searchText === ""){
      matchCityList.innerHTML = "";
      matches = [];
    }

    outputCityHtml(matches);
};

const outputCityHtml = (matches) => {
    matchCityList.innerHTML = "";
    matches.map(match => {
            outPutCityDiv(match)
    })
};   

function outPutCityDiv (match){
        var newMatchDiv = document.createElement('div')
        newMatchDiv.className = "cityMatch"
        newMatchDiv.onclick = function(){
            searchCity.value = match.nom 
            matchCityList.innerHTML = "";
            matches = [];
        }
        newMatchDiv.innerHTML = match.nom
        cityList.appendChild(newMatchDiv)
}