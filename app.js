fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then(res => res.json())
    .then(data => loadFoods(data.categories));

function loadFoods(foods) {
    // console.log(foods);
    const foodProducts = document.getElementById('foods');
    for (let i = 0; i < foods.length; i++) {
        const food = foods[i];
        const foodDiv = document.createElement('div');
        foodDiv.className = 'food-div';

        const foodItem = `
            <div>
                <img src="${food.strCategoryThumb}">
            </div>
            <div>
                <h3>${food.strCategory}</h3>
            </div>
        `;

        foodDiv.innerHTML = foodItem;
        foodProducts.appendChild(foodDiv);
    }
}


// Search Foods : 
const input = document.getElementById('input');
document.getElementById('search').addEventListener('click', function () {
    document.getElementById('default-foods').style.display = 'none';
    document.getElementById('search-foods').style.display = 'block';

    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${input.value}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayFoods(data.meals))
        .catch(error => {
            document.getElementById('errorMsg').style.display = 'block';
            document.getElementById('search-foods').style.display = 'none';
        })

    function displayFoods(data) {
        const foodProducts = document.getElementById('searchFoods');
        foodProducts.innerHTML = '';
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            // console.log(item);
            const foodDiv = document.createElement('div');
            foodDiv.className = 'food-div';

            const foodItem = `
                <div>
                    <img src="${item.strMealThumb}">
                </div>
                <div>
                    <h3>${item.strMeal}</h3>
                    <p>${item.strArea}</p>
                </div>
            `;

            foodDiv.innerHTML = foodItem;
            foodProducts.appendChild(foodDiv);

            document.getElementById('errorMsg').style.display = 'none';
            document.getElementById('input').value = '';
        }
    }
})