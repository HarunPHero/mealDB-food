const input = document.getElementById("search-text");
input.addEventListener("keyup", function (event) {

  if (event.key === 'Enter') {
    document.getElementById("search").click();
  }
});

const searchBtn = document.getElementById('search').addEventListener('click', function () {
  const searchText = document.getElementById('search-text').value;
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
  fetch(url)
    .then(res => res.json())
    .then(data => displayFood(data))
    .catch(error => displayError('Sorry, no food found'))

})

const displayError = (error) => {
  const errortext = document.getElementById('error-text');
  errortext.innerText = error;

}

const displayFood = data => {
  document.getElementById('error-text').innerText = ""
  const food = document.getElementById('foods');
  const text = document.getElementById('search-text').value
  if (text.length == 0) {
    alert('no food selected')
  }
  food.innerHTML = "";
  if (text.length > 0) {

    for (const meal of data.meals) {
      const { strMealThumb, strMeal, strYoutube } = meal
      const div = document.createElement('div');
      div.innerHTML = `
          <div class="card">
          <img src="${strMealThumb}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${strMeal}</h5>
            <a href="${strYoutube}" class="btn btn-primary">Show video recipe on youtube</a>
          </div>
        </div>
          `;
      food.appendChild(div);

    }
  }

}