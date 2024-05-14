function toggleHover(element) {
    element.addEventListener('mouseover', function () {
        this.classList.add('mine__item-hov');
    });
    
    element.addEventListener('mouseout', function () {
        this.classList.remove('mine__item-hov');
    });
}


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

