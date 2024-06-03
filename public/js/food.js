let dishes = [];

function addDish(label, image, price) {
    dishes.push({ label, image, price });
}

addDish("Jollof rice", "../images/jellof.jpg", 2000);
addDish("Egusi soup with Pounded yam", "../images/egusi.jpeg", 3500);
addDish("Suya", "../images/suya.jpg", 1000);
addDish("Efo riro", "../images/efo-riro.jpg", 3500);
addDish("Moi moi with fresh fish and egg", "../images/Moi_moi_with_fresh_fish_and_boiled_egg.jpg", 1500);
addDish("Catfish Pepper soup", "../images/catfish.jpg", 4500);
addDish("Bitterleaf Soupwith pounded Yam", "../images/bitter leaf soup.png", 3500);
addDish("Akpu and Ofe Nsala (White Soup)", "../images/ofe nsala.png", 6000);
addDish("Abacha (African Salad) ", "../images/abacha.png", 2000);
addDish("Ofada Rice ", "../images/ofada.png", 2000);

function displayDishes() {
    const foodList = document.getElementById('foodList');
    foodList.innerHTML = '';

    dishes.forEach(dish => {
        const foodItem = document.createElement('div');
        foodItem.className = 'col-md-6';
        
        foodItem.innerHTML = `
            <div class="d-flex align-items-center">
                <img loading="lazy" class="flex-shrink-0 img-fluid rounded-circle" src="${dish.image}" alt="${dish.label}" style="width: 80px; aspect-ratio: 1;">
                <div class="w-100 d-flex flex-column text-start ps-4">
                    <h5 class="d-flex justify-content-between border-bottom pb-2">
                        <span>${dish.label}</span>
                        <span>#${dish.price}</span>
                    </h5>
                </div>
            </div>
        `;

        foodList.appendChild(foodItem);
    });
}

displayDishes();


// appetizer
let dishes2 = [];

function appetizer(label, image, price) {
    dishes2.push({ label, image, price });
}

appetizer("Meat Pie", "../images/meatpie.jpg", 800);
appetizer("Potato Croquettes", "../images/potatocrunch.jpg", 1000);
appetizer("Suya", "../images/suya.jpg", 1000);
appetizer("Akara", "../images/akara.jpg", 500);
appetizer("Puff Puff", "../images/puffpuff.jpg", 500);
appetizer("Chin Chin", "../images/chin_chin.jpg", 700);
appetizer("Asun (Spicy smoked goat meat)", "../images/asun.jpg", 1500);
appetizer("Peppered Snails", "../images/PepperedSnails.jpg", 2000);

function displayAppetizer() {
    const appetizerList = document.getElementById('appetizerList');
    appetizerList.innerHTML = ''; 

    dishes2.forEach(dish => {
        const foodItem = document.createElement('div');
        foodItem.className = 'col-md-6';
        
        foodItem.innerHTML = `
            <div class="d-flex align-items-center">
                <img loading="lazy" class="flex-shrink-0 img-fluid rounded-circle" src="${dish.image}" alt="${dish.label}" style="width: 80px; aspect-ratio: 1;">
                <div class="w-100 d-flex flex-column text-start ps-4">
                    <h5 class="d-flex justify-content-between border-bottom pb-2">
                        <span>${dish.label}</span>
                        <span>#${dish.price}</span>
                    </h5>
                </div>
            </div>
        `;

        appetizerList.appendChild(foodItem);
    });
}

displayAppetizer();


// refreshments
let dishes3 = [];

function drink(label, image, price) {
    dishes3.push({ label, image, price });
}

drink("Zobo Drink", "../images/zobo.jpg", 300);
drink("Chapman", "../images/Chapman.jpg", 1000);
drink("Palm Wine", "../images/PalmWine.jpg", 2000);
drink("Kunu", "../images/Kunu.jpg", 500);
drink("Malt Drink", "../images/maltDrink.jpg", 2000);
drink("Bottled Water", "../images/bottleWater.jpg", 1000);
drink("Soft Drinks (e.g., Coca-Cola, Fanta)", "../images/softdrinks.jpg", 700);
drink("Local Brewed Beer (e.g., Star, Gulder)", "../images/beer.jpg", 1500);


function displayDrinks() {
    const drinkList = document.getElementById('drinkList');
    drinkList.innerHTML = ''; 

    dishes3.forEach(dish => {
        const drinkItems = document.createElement('div');
        drinkItems.className = 'col-md-6';
        
        drinkItems.innerHTML = `
            <div class="d-flex align-items-center">
                <img loading="lazy" class="flex-shrink-0 img-fluid rounded-circle" src="${dish.image}" alt="${dish.label}" style="width: 80px; aspect-ratio: 1;">
                <div class="w-100 d-flex flex-column text-start ps-4">
                    <h5 class="d-flex justify-content-between border-bottom pb-2">
                        <span>${dish.label}</span>
                        <span>#${dish.price}</span>
                    </h5>
                </div>
            </div>
        `;

        drinkList.appendChild(drinkItems);
    });
}

displayDrinks();


