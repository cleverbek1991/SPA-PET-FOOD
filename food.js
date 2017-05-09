var container = document.getElementById('container');

function dataRequestComplete(e) {
	console.log('dataRequestComplete');
	var data = JSON.parse(e.target.responseText);
	console.log('data:', data);
	display(data);
}

function dataRequestFailed(event) {
	console.log("dataRequestFailed");
}

var dogFoodJSON = new XMLHttpRequest();

dogFoodJSON.addEventListener("load", dataRequestComplete);
dogFoodJSON.addEventListener("error", dataRequestFailed);

dogFoodJSON.open("GET", "dogfood.json");
dogFoodJSON.send();

var catFoodJSON = new XMLHttpRequest();

catFoodJSON.addEventListener("load", dataRequestComplete);
catFoodJSON.addEventListener("error", dataRequestFailed);

catFoodJSON.open("GET", "catfood.json");
catFoodJSON.send();

function display(dataInput) {
	var data = dataInput.dog_brands;
	var cat = false;
	if (data == null) {
		data = dataInput.cat_brands;
		cat = true;
	}

	var holdFood = '';

	for (var i = 0; i < data.length; i++) {
		holdFood += `<div class="new${i}">`;
		if (cat) {
			holdFood += `<h1>Cat Food</h1>`;
		} else {
			holdFood += `<h1>Dog Food</h1>`;
		}

			holdFood += `<h2>${data[i].name}</h2>`;

			for (var j = 0; j < data[i].types.length; j++) {
				holdFood += `<h3>${data[i].types[j].type}</h3>`;

				for (var k = 0; k < data[i].types[j].volumes.length; k++) {
					if (cat) {
						holdFood += `<p>${data[i].types[j].volumes[k].age}: ${data[i].types[j].volumes[k].name} -- $${data[i].types[j].volumes[k].price}</p>`;
					} else {
						holdFood += `<p>${data[i].types[j].volumes[k].name} -- $${data[i].types[j].volumes[k].price}</p>`;
					}
				}
			}
			holdFood += `</div>`;
	}

	var holdDiv = document.createElement("div");
	holdDiv.setAttribute('class', 'food');
	holdDiv.innerHTML = holdFood;
	container.appendChild(holdDiv);
}