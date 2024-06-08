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
	const customAlert = document.getElementById('customAlert')

	function copyLinkToClipboard() {
		const linkHref = link.href

		navigator.clipboard.writeText(linkHref).then(
			function () {
				console.log('Link copied')
				showCustomAlert()
			},
			function (err) {
				console.error('Error: ', err)
			}
		)
	}

	function showCustomAlert() {
		customAlert.classList.remove('hidden')
		customAlert.classList.add('show')
		setTimeout(hideCustomAlert, 2000) // Автоматично приховати через 2 секунди
	}

	function hideCustomAlert() {
		customAlert.classList.remove('show')
		setTimeout(function () {
			customAlert.classList.add('hidden')
		}, 500) // Затримка, щоб завершити анімацію
	}

	copyButton.addEventListener('click', copyLinkToClipboard)
	link.addEventListener('click', function (event) {
		event.preventDefault()
		copyLinkToClipboard()
	})
})

document.addEventListener('DOMContentLoaded', function () {
	const clickableImg = document.getElementById('clickableImg')
	const balanceValue = document.getElementById('balanceValue')
	const balanceTextElements = document.querySelectorAll('.balance__text')

	// Initialize the balance from local storage or set to 0 if none exists
	let balance = parseInt(localStorage.getItem('balance')) || 0
	updateBalanceDisplay(balance)

	clickableImg.addEventListener('touchstart', function (event) {
		if (event.touches.length <= 3) {
			// Check if 1 to 3 fingers are touching the screen
			const number = 5 // Fixed increment value
			balance += event.touches.length * number // Increment balance by number of touches * 5
			updateBalanceDisplay(balance)
			localStorage.setItem('balance', balance) // Save the updated balance to local storage

			Array.from(event.touches).forEach(touch => {
				// Create and animate the number element for each touch point
				const numberElement = document.createElement('div')
				numberElement.textContent = `+${number}`
				numberElement.classList.add('number')

				// Calculate the position of the touch relative to the image
				const rect = clickableImg.getBoundingClientRect()
				numberElement.style.left = `${touch.clientX - rect.left}px`
				numberElement.style.top = `${touch.clientY - rect.top}px`

				// Append the number element to the parent container
				clickableImg.parentElement.appendChild(numberElement)

				// Remove the element after animation ends
				numberElement.addEventListener('animationend', function () {
					numberElement.remove()
				})
			})

			// Prevent default action to avoid triggering other touch events
			event.preventDefault()
		}
	})

	function updateBalanceDisplay(balance) {
		balanceValue.textContent = balance
		balanceTextElements.forEach(element => {
			element.textContent = balance
		})
	}
})







