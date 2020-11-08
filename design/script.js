const pgData = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

const cities = [];

fetch(pgData)
  .then(blob => blob.json())
  .then(data => cities.push(...data))  /*... == spreading into the push!*/

function findMatching(wordsToMatch, cities){
  return cities.filter(place => {
    const matches = new RegExp(wordsToMatch, 'gi'); 
    /* g = global, i = insensitive */
    if(wordsToMatch === '') {
      return null;
    }
    return place.city.match(matches) || place.state.match(matches) || place.name.match(matches);
  });
}

function displayMatches() {
  const matchingArray = findMatching(this.value, cities);
  const html = matchingArray.map(place => {
    return `
      <li>
        <span class = "name">${place.name}</span>
        <span class = "location">${place.city}, ${place.state}, ${place.zipcode}</span>
        <span class = "category">${place.category}</span>
      </li>
    `;
  }).join('');
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);


