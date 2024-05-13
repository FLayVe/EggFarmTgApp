function toggleHover(element) {
	element.addEventListener('mouseover', function () {
		this.classList.add('mine__item-hov')
	})

	element.addEventListener('mouseout', function () {
		this.classList.remove('mine__item-hov')
	})
}

function setupPopupButton(btnId, targetId, classToRemove) {
	document.getElementById(btnId).addEventListener('click', function () {
		document.getElementById('myOverlay').style.display = 'none'
		document.querySelector('main').classList.remove(classToRemove)
		document.getElementById(targetId).classList.remove('mine__item-hov--block')
	})
}

function setupElementClick(elementId, classToToggle, classToAdd) {
	document.getElementById(elementId).addEventListener('click', function () {
		document.getElementById('myOverlay').style.display = 'block'
		document.querySelector('main').classList.toggle(classToToggle)
		document.getElementById(elementId).classList.add(classToAdd)
	})
}

document.addEventListener('DOMContentLoaded', function () {
	toggleHover(document.getElementById('grain'))
	setupPopupButton('popup__btn-grain', 'grain', 'grain-open')
	setupElementClick('grain', 'grain-open', 'mine__item-hov--block')

	toggleHover(document.getElementById('incubators'))
	setupPopupButton('popup__btn-incubators', 'incubators', 'incubators-open')
	setupElementClick('incubators', 'incubators-open', 'mine__item-hov--block')

	toggleHover(document.getElementById('vitamins'))
	setupPopupButton('popup__btn-vitamins', 'vitamins', 'vitamins-open')
	setupElementClick('vitamins', 'vitamins-open', 'mine__item-hov--block')

	toggleHover(document.getElementById('trainer'))
	setupPopupButton('popup__btn-trainer', 'trainer', 'trainer-open')
	setupElementClick('trainer', 'trainer-open', 'mine__item-hov--block')

	toggleHover(document.getElementById('elixir'))
	setupPopupButton('popup__btn-elixir', 'elixir', 'elixir-open')
	setupElementClick('elixir', 'elixir-open', 'mine__item-hov--block')
})
