const restaurantList = [];

fetch('/index')
  .then(blob => blob.json())
  .then(data => restaurantList.push(...data))  //... == spreading into the push!

function findMatching(wordsToMatch, restaurants) {
  return restaurants.filter(place => {
    const matches = new RegExp(wordsToMatch, 'gi');
     // g = global, i = insensitive
    if(wordsToMatch === '') {
      return null;
    }
    return place.city.match(matches) || place.state.match(matches) || place.name.match(matches);
  });
}

function displayMatches() {
  const matchingArray = findMatching(this.value, restaurantList);
  const html = matchingArray.map(place => {
    return `
      <li>
        <span class = "name">${place.name}</span>
        <span class = "location">${place.city}, ${place.state}</span>
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