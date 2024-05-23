document.querySelector('.tap__chick').addEventListener('click', function () {
	this.classList.add('animate')

	// Після завершення анімації видаляємо клас, щоб можна було анімувати знову
	setTimeout(() => {
		this.classList.remove('animate')
	}, 30) // Час повинен співпадати з часом у transition
})

function toggleHover(element) {
	element.addEventListener('mouseover', function () {
		this.classList.add('mine__item-hov')
	})

	element.addEventListener('mouseout', function () {
		this.classList.remove('mine__item-hov')
	})
}

function setupElementClick(elementId, overlayId, mainClass, itemHoverClass) {
	const element = document.getElementById(elementId)
	element.addEventListener('click', function () {
		document.getElementById(overlayId).style.display = 'block'
		document.querySelector('main').classList.add(mainClass)
		element.classList.add(itemHoverClass)
	})
}

function setupPopupButton(btnId, overlayId, mainClass, targetElements) {
	const btn = document.getElementById(btnId)
	btn.addEventListener('click', function () {
		document.getElementById(overlayId).style.display = 'none'
		document.querySelector('main').classList.remove(mainClass)
		targetElements.forEach(function (elementId) {
			document
				.getElementById(elementId)
				.classList.remove('mine__item-hov--block')
		})
	})
}

document.addEventListener('DOMContentLoaded', function () {
	const sections = document.querySelectorAll('.page')
	const buttons = document.querySelectorAll('.menu__btn')
	const content = document.querySelectorAll('.menu__list-text')
	const paths = document.querySelectorAll('.path')
	const paths2 = document.querySelectorAll('.path-2')

	function handleButtonClick(button) {
		sections.forEach(section => section.classList.remove('active'))
		buttons.forEach(btn => btn.classList.remove('active'))
		content.forEach(div => div.classList.remove('active'))
		paths.forEach(path => {
			path.classList.remove('active-path')
			path.classList.remove('home-path')
		})
		paths2.forEach(path => {
			path.classList.remove('active-path')
			path.classList.remove('home-path-2')
		})

		const buttonMapping = {
			'home-btn': 'home',
			'mine-btn': 'mine',
			'friends-btn': 'friends',
			'tasks-btn': 'tasks',
		}

		for (const [btnClass, sectionId] of Object.entries(buttonMapping)) {
			if (button.classList.contains(btnClass)) {
				document.getElementById(sectionId).classList.add('active')
				document.getElementById(`${sectionId}-text`).classList.add('active')
				break
			}
		}

		button.classList.add('active')
		button.querySelector('.path').classList.add('active-path')
		button.querySelector('.path-2').classList.add('active-path')
	}

	buttons.forEach(button => {
		button.addEventListener('click', () => handleButtonClick(button))
	})

	handleButtonClick(document.querySelector('.home-btn'))

	const elements = [
		'grain',
		'incubators',
		'vitamins',
		'trainer',
		'elixir',
		'level',
	]
	elements.forEach(function (elementId) {
		const element = document.getElementById(elementId)
		toggleHover(element)
		setupElementClick(
			elementId,
			'myOverlay',
			'popup-open',
			'mine__item-hov--block'
		)
	})

	setupPopupButton('popup__btn', 'myOverlay', 'popup-open', elements)

	function handleLinkClick(targetId) {
		sections.forEach(section => section.classList.remove('active'))

		buttons.forEach(button => button.classList.remove('active'))
		content.forEach(div => div.classList.remove('active'))

		const homeButton = document.querySelector('.home-btn')
		const homeText = document.querySelector('.home-text')
		if (homeButton) homeButton.classList.remove('active')
		if (homeText) homeText.classList.remove('active')

		const targetSection = document.getElementById(targetId)
		if (targetSection) targetSection.classList.add('active')
		paths.forEach(path => {
			path.classList.remove('active-path')
			path.classList.remove('home-path')
		})
		paths2.forEach(path => {
			path.classList.remove('active-path')
			path.classList.remove('home-path-2')
		})
	}

	document.querySelectorAll('.header__inner').forEach(link => {
		link.addEventListener('click', function () {
			handleLinkClick('user')
		})
	})

	document.querySelectorAll('.get__boost, .get__energy').forEach(link => {
		link.addEventListener('click', function () {
			handleLinkClick('boost')
		})
	})
})
