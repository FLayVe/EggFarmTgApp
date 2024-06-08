document.addEventListener('DOMContentLoaded', function () {
	// Cached DOM elements
	const overlay = document.getElementById('myOverlay')
	const mainElement = document.querySelector('main')
	const preloader = document.getElementById('preloader')
	const menu = document.getElementById('menu')
	const popupBtn = document.getElementById('popup__btn')
	const sections = document.querySelectorAll('.page')
	const buttons = document.querySelectorAll('.menu__btn')
	const content = document.querySelectorAll('.menu__list-text')
	const paths = document.querySelectorAll('.path')
	const paths2 = document.querySelectorAll('.path-2')
	const tapChick = document.querySelector('.tap__chick')
	const headerInnerLinks = document.querySelectorAll('.header__inner')
	const boostLinks = document.querySelectorAll('.get__boost, .get__energy')

	const elements = [
		'grain',
		'incubators',
		'vitamins',
		'trainer',
		'elixir',
		'level',
	]
		.map(id => document.getElementById(id))
		.filter(el => el !== null)

	const buttonMapping = {
		'home-btn': 'home',
		'mine-btn': 'mine',
		'friends-btn': 'friends',
		'tasks-btn': 'tasks',
	}

	// Function to handle animation on click
	if (tapChick) {
		tapChick.addEventListener('click', function () {
			this.classList.add('animate')
			setTimeout(() => {
				this.classList.remove('animate')
			}, 30)
		})
	}

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
	function setupElementClick(element, overlay, mainClass, itemHoverClass) {
		element.addEventListener('click', function () {
			overlay.style.display = 'block'
			mainElement.classList.add(mainClass)
			element.classList.add(itemHoverClass)
		})
	}

	// Function to setup popup button
	if (popupBtn) {
		popupBtn.addEventListener('click', function () {
			overlay.style.display = 'none'
			mainElement.classList.remove('popup-open')
			elements.forEach(element => {
				element.classList.remove('mine__item-hov--block')
			})
		})
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
				const section = document.getElementById(sectionId)
				const textElement = document.getElementById(`${sectionId}-text`)
				if (section) section.classList.add('active')
				if (textElement) textElement.classList.add('active')
				break
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

	
	// Adding click event listeners to buttons
	buttons.forEach(button => {
		button.addEventListener('click', () => handleButtonClick(button))
	})

	// Preloader logic
	window.onload = function () {
		preloader.style.display = 'block'
		setTimeout(function () {
			handleButtonClick(document.querySelector('.home-btn'))
			preloader.style.display = 'none'
			menu.style.display = 'block'
		}, 1450)
	}

	// Setup hover and click for elements
	elements.forEach(element => {
		toggleHover(element)
		setupElementClick(element, overlay, 'popup-open', 'mine__item-hov--block')
	})

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
	headerInnerLinks.forEach(link => {
		link.addEventListener('click', function () {
			handleLinkClick('user')
		})
	})

	boostLinks.forEach(link => {
		link.addEventListener('click', function () {
			handleLinkClick('boost')
		})
	})
})

document.addEventListener('DOMContentLoaded', function () {
	const copyButton = document.getElementById('friends__btn')
	const link = document.getElementById('friends__link')

	function copyLinkToClipboard() {
		const linkHref = link.href

		navigator.clipboard.writeText(linkHref).then(
			function () {
				console.log('Посилання скопійовано до буфера обміну')
				alert('Посилання скопійовано до буфера обміну')
			},
			function (err) {
				console.error('Не вдалося скопіювати посилання: ', err)
			}
		)
	}

	copyButton.addEventListener('click', copyLinkToClipboard)
	link.addEventListener('click', function (event) {
		event.preventDefault() // Запобігає переходу за посиланням
		copyLinkToClipboard()
	})
})

