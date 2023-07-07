const cardQuantityByLevel = [6, 8, 12, 18, 24, 36, 48];
const cardsContainer = document.querySelector('.table__container');
const cardForInsert = `<div class="table__card">Card</div>`;
const levelCounter = document.querySelector('.progressbar__level-counter');
const cardsArray = []
const imagesArray = ["img1", "img2", "img3", "img4", "img5", "img6", "img7", "img8", "img9", "img10",
										"img11", "img12", "img13", "img14", "img15", "img16", "img17", "img18", "img19", 
										"img20", "img21", "img22", "img23", "img24"];
const levelsGridClasses = ["one-level-grid", "two-level-grid", "three-level-grid", "four-level-grid", 
													"five-level-grid", "six-level-grid", "seven-level-grid"];
const progressLine = document.querySelector('.progressbar__line');
const levelElement = document.querySelector('.progressbar__level-counter');
let newImagesArray = [];
let newRandomImagesArray = [];
let levelNumberByElement = 1;

// levelElement.insertAdjacentText(
// 	"beforeend",
// 	`${levelNumberByElement}`
// );

// Вставка нужного количества карточек на сайт (в зависимости от уровня)
// Наполнение массива с карточками нужным количеством элементов
function cloneNodesByLevel(number) {
	let cardsCounter = 0
	for ( let i = 0; i < cardQuantityByLevel[number-1]; i++ ) {
		cardsContainer.innerHTML += cardForInsert;
		cardsCounter++
	}
	for ( let i = 0; i < cardsCounter; i++ ) {
		cardsArray.push(cardsContainer.children[i]);
	}
}
cloneNodesByLevel(levelNumberByElement)

// Смена грид сетки путем замены класса
function changeGridLayout() {
	cardsContainer.classList.remove(
		"one-level-grid", 
		"two-level-grid",
		"three-level-grid",
		"four-level-grid",
		"five-level-grid",
		"six-level-grid",
		"seven-level-grid"
		);
		cardsContainer.classList.add(levelsGridClasses[levelNumberByElement - 1]);
}
changeGridLayout()

// Изменение ширины белой линии
function setProgresslineWidth() {
	let widthProgressLine = levelNumberByElement * 14.285714285714;
	progressLine.style.width = `${widthProgressLine}%`;
}
setProgresslineWidth()

// Создание массива нужной длины с изображениями
function createImageArray(array) {
	for ( let i = 0; i <= 24; i++ ) {
		newImagesArray.pop()
	}
	for ( let i = 0; i < cardsArray.length / 2; i++ ) {
		newImagesArray.push(imagesArray[i])
	}
}
createImageArray(cardQuantityByLevel[levelNumberByElement-1]);

// Создание рандомизированного массива из нужных изображений
function createRandomImagesArray(newImagesArray) {
	for (let i = 0; i <= 48; i++ ) {
		newRandomImagesArray.pop()
	}
	for ( let i = 0; i < newImagesArray.length; i++ ) {
		let randomNumber = Math.random() * 100;
		if ( randomNumber < 50 ) {
			newRandomImagesArray.push(newImagesArray[i])
		} else if ( randomNumber > 50 ) {
			newRandomImagesArray.unshift(newImagesArray[i])
		}
	}
		for ( let i = 0; i < newImagesArray.length; i++ ) {
		let randomNumber = Math.random() * 100;
		if ( randomNumber < 50 ) {
			newRandomImagesArray.push(newImagesArray[i])
		} else if ( randomNumber > 50 ) {
			newRandomImagesArray.unshift(newImagesArray[i])
		}
	}
	
}
createRandomImagesArray(newImagesArray);

// Отслеживавние клика по каждой отдельной карточке
// Отображение картинки по клику
// Присваивание карточке картинки по индексу
// Присваивание второй карточке картинки по индексу
// Сравнение двух результатов
// cardsArray.forEach((item, index) => {
// 	item.addEventListener("click", (event) => {
// 		console.log(index)
// 	})
// })
function addListenerForCards() {
	cardsArray.forEach((item, index) => {
		item.addEventListener("click", function(event){
			console.log(item, index)
		})
	})
}
addListenerForCards()



// Отслеживание изменения номера уровня
levelElement.addEventListener("DOMCharacterDataModified", function(){
	levelNumberByElement = Number(levelElement.textContent);
	cardsContainer.innerHTML = '';
	cardsArray.splice(0, cardsArray.length);
	cloneNodesByLevel(levelNumberByElement);
	changeGridLayout()
	setProgresslineWidth()
	createImageArray(cardQuantityByLevel[levelNumberByElement-1]);
	createRandomImagesArray(newImagesArray);
	addListenerForCards()
})












/*

1. 

*/



