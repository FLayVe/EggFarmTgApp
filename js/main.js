document.addEventListener('DOMContentLoaded', function () {
	// Function to handle animation on click
	document.querySelector('.tap__chick').addEventListener('click', function () {
		this.classList.add('animate')
		// Remove class after animation to allow re-animation
		setTimeout(() => {
			this.classList.remove('animate')
		}, 30) // Time should match the transition duration
	})

	// Function to toggle hover class
	function toggleHover(element) {
		element.addEventListener('mouseover', function () {
			this.classList.add('mine__item-hov')
		})
		element.addEventListener('mouseout', function () {
			this.classList.remove('mine__item-hov')
		})
	}

	// Function to setup element click
	function setupElementClick(elementId, overlayId, mainClass, itemHoverClass) {
		const element = document.getElementById(elementId)
		element.addEventListener('click', function () {
			document.getElementById(overlayId).style.display = 'block'
			document.querySelector('main').classList.add(mainClass)
			element.classList.add(itemHoverClass)
		})
	}

	// Function to setup popup button
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

	const sections = document.querySelectorAll('.page')
	const buttons = document.querySelectorAll('.menu__btn')
	const content = document.querySelectorAll('.menu__list-text')
	const paths = document.querySelectorAll('.path')
	const paths2 = document.querySelectorAll('.path-2')

	const buttonMapping = {
		'home-btn': 'home',
		'mine-btn': 'mine',
		'friends-btn': 'friends',
		'tasks-btn': 'tasks',
	}

	// Function to handle menu button click
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

		for (const [btnClass, sectionId] of Object.entries(buttonMapping)) {
			if (button.classList.contains(btnClass)) {
				document.getElementById(sectionId).classList.add('active')
				const textElement = document.getElementById(`${sectionId}-text`)
				if (textElement) {
					textElement.classList.add('active')
				}
				break // Exit loop after matching button class is found
			}
		}

		button.classList.add('active')
		const pathElement = button.querySelector('.path')
		const path2Element = button.querySelector('.path-2')
		if (pathElement) {
			pathElement.classList.add('active-path')
		}
		if (path2Element) {
			path2Element.classList.add('active-path')
		}
	}

	// Adding click event listener to buttons
	buttons.forEach(button => {
		button.addEventListener('click', () => handleButtonClick(button))
	})

	// Preloader logic
	window.onload = function () {
		document.getElementById('preloader').style.display = 'block'
		setTimeout(function () {
			handleButtonClick(document.querySelector('.home-btn')) // Default active page
			document.getElementById('preloader').style.display = 'none'
			document.getElementById('menu').style.display = 'block'
		}, 1400)
	}

	// Setup hover and click for elements
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

	// Function to handle link clicks
	function handleLinkClick(targetId) {
		sections.forEach(section => section.classList.remove('active'))
		buttons.forEach(button => button.classList.remove('active'))
		content.forEach(div => div.classList.remove('active'))

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

	// Adding click event listeners to links
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
