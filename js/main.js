function toggleHover(element) {
	element.addEventListener('mouseover', function () {
		this.classList.add('mine__item-hov')
	})

	element.addEventListener('mouseout', function () {
		this.classList.remove('mine__item-hov')
	})
}

document.addEventListener('DOMContentLoaded', () => {
	const sections = document.querySelectorAll('.page')
	const buttons = document.querySelectorAll('.menu__btn')
	const content = document.querySelectorAll('.menu__list-text')

	buttons.forEach(button => {
		button.addEventListener('click', () => {
			// Remove 'active' class from all sections, buttons, and paths
			sections.forEach(section => section.classList.remove('active'))
			buttons.forEach(btn => btn.classList.remove('active'))
			content.forEach(div => div.classList.remove('active'))
			document
				.querySelectorAll('.path')
				.forEach(path => path.classList.remove('active-path'))
			document
				.querySelectorAll('.path')
				.forEach(path => path.classList.remove('home-path'))
			document
				.querySelectorAll('.path-2')
				.forEach(path => path.classList.remove('active-path'))
			document
				.querySelectorAll('.path-2')
				.forEach(path => path.classList.remove('home-path-2'))

			// Add 'active' class based on button clicked
			switch (true) {
				case button.classList.contains('home-btn'):
					document.getElementById('home').classList.add('active')
					document.getElementById('home-text').classList.add('active')
					break
				case button.classList.contains('mine-btn'):
					document.getElementById('mine').classList.add('active')
					document.getElementById('mine-text').classList.add('active')
					break
				case button.classList.contains('friends-btn'):
					document.getElementById('friends').classList.add('active')
					document.getElementById('friends-text').classList.add('active')
					break
				case button.classList.contains('tasks-btn'):
					document.getElementById('tasks').classList.add('active')
					document.getElementById('tasks-text').classList.add('active')
					break
			}

			// Add 'active' class to the clicked button and its paths
			button.classList.add('active')
			button.querySelector('.path').classList.add('active-path')
			button.querySelector('.path-2').classList.add('active-path')
		})
	})

	// Set initial active states for 'home' section
	document.getElementById('home').classList.add('active')
	document.querySelector('.home-text').classList.add('active')
	document.querySelector('.home-path').classList.add('active-path')
	document.querySelector('.home-path-2').classList.add('active-path')
})


function setupElementClick(elementId, overlayId, mainClass, itemHoverClass) {
	var element = document.getElementById(elementId)
	element.addEventListener('click', function () {
		document.getElementById(overlayId).style.display = 'block'
		document.querySelector('main').classList.add(mainClass)
		element.classList.add(itemHoverClass)
	})
}

function setupPopupButton(btnId, overlayId, mainClass, targetElements) {
	var btn = document.getElementById(btnId)
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
	var elements = [
		'grain',
		'incubators',
		'vitamins',
		'trainer',
		'elixir',
		'level',
	]
	elements.forEach(function (elementId) {
		toggleHover(document.getElementById(elementId))
		setupElementClick(
			elementId,
			'myOverlay',
			'popup-open',
			'mine__item-hov--block'
		)
	})

	setupPopupButton('popup__btn', 'myOverlay', 'popup-open', elements)
})
