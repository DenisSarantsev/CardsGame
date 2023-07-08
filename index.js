const cardQuantityByLevel = [6, 8, 12, 18, 24, 36, 48];
const cardsContainer = document.querySelector('.table__container');
const cardForInsert = `<div class="table__card"><span class="table__card-content">Card</span></div>`;
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

// Вставка нужного количества карточек на сайт (в зависимости от уровня)
// Наполнение массива с карточками нужным количеством элементов
function cloneNodesByLevel(number) {
	cardsArray.forEach((card) => {
		card.classList.remove("selected-card")
		card.classList.remove("red-card")
		card.classList.remove("_open-card")
	})
	let cardsCounter = 0
	for ( let i = 0; i < cardQuantityByLevel[number-1]; i++ ) {
		cardsContainer.innerHTML += cardForInsert;
		cardsCounter++
	}
	for ( let i = 0; i < cardsCounter; i++ ) {
		cardsArray.push(cardsContainer.children[i]);
	}
	console.log(cardsArray)
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
function addListenerForCards() {
	let openCardsCounter = [];
	cardsArray.forEach((item, index) => {
		item.addEventListener("click", function(event){
			item.firstChild.classList.toggle("_hidden");
			if ( item.classList.contains("selected-card") !== true ) {
				item.insertAdjacentHTML("beforeend", `<div class="table__card-info">${newRandomImagesArray[index]}</div>`);
			}
			let itemInfoLength = item.querySelectorAll(".table__card-info").length;
			item.classList.add("_open-card");
			if ( itemInfoLength > 1 ) {
				let itemInfo = item.querySelectorAll(".table__card-info")
				itemInfo.forEach((elem) => {
					elem.remove()
				})
				item.classList.remove("_open-card");
			} 
			cardsArray.forEach((element) => {
				element.classList.remove("red-card")
				if ( element.classList.contains("_open-card") ) {
					openCardsCounter.push(element)
				}
			})
			if ( openCardsCounter.length === 2) {
				let overlapCards = [];
				cardsArray.forEach((card) => {
					if ( card.classList.contains("_open-card") ) {
						overlapCards.push(card)
					}
				})
				if ( overlapCards[0].lastChild.textContent === overlapCards[1].lastChild.textContent ) {
					cardsArray.forEach((card) => {
						if ( card.classList.contains("_open-card") && card.classList.contains("selected-card") !== true ) {
							card.classList.add("selected-card");
							card.firstChild.classList.add("selected-hidden");
							card.insertAdjacentHTML ("beforeend", `<div>Selected</div>`);
							card.querySelector(".table__card-info").remove();
							openCardsCounter = [];
						} 
					})
					closeNotSelectedCars();
				} else {
					setTimeout(closeNotSelectedCars, 500)
				}
			} else if ( openCardsCounter.length > 2 ) {
				openCardsCounter = [];
				closeNotSelectedCars()
			}
			openCardsCounter = [];
		})
	})
}
addListenerForCards()

// Функция закрывает несовпавшие пары карточек, и добавляет анимацию красного фона для этих карточек
function closeNotSelectedCars() {
	cardsArray.forEach((item) => {
		if ( item.classList.contains("_open-card") ) {
			item.classList.add("red-card")
		}
		let elementChildrensArray = item.children;
		for ( let i = 0; i < elementChildrensArray.length; i++ ) {
			if ( elementChildrensArray[i].classList.contains("table__card-info") ) {
				elementChildrensArray[i].remove()
			} else if ( elementChildrensArray[i].classList.contains("table__card-content") ) {
				elementChildrensArray[i].classList.remove("_hidden")
				item.classList.remove("_open-card")
			}
		}
	})
}

// Проверка на завершение уровня
document.addEventListener("click", function(){
	let selectedCardsCounter = 0
	cardsArray.forEach((item) => {
		if ( item.classList.contains("selected-card") ) {
			selectedCardsCounter++
		}
	})
	if ( cardsArray.length === selectedCardsCounter && selectedCardsCounter < 50 ) {
		levelNumberByElement++;
		cardsArray.forEach((cardItem) => {
			cardItem.remove()
		})
		selectedCardsCounter = 0;
		document.querySelector(".progressbar__level-counter").textContent = `${levelNumberByElement}`;
		newLevel()
	}
})

// Отслеживание изменения номера уровня
function newLevel() {
	levelNumberByElement = Number(levelElement.textContent);
	cardsContainer.innerHTML = '';
	cardsArray.splice(0, cardsArray.length);
	cloneNodesByLevel(levelNumberByElement);
	changeGridLayout()
	setProgresslineWidth()
	createImageArray(cardQuantityByLevel[levelNumberByElement-1]);
	createRandomImagesArray(newImagesArray);
	addListenerForCards()
}













