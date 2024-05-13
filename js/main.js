document.getElementById('grain').addEventListener('mouseover', function () {
	this.classList.add('mine__item-hov')
})
document.getElementById('grain').addEventListener('mouseout', function () {
	this.classList.remove('mine__item-hov')
})

document
	.getElementById('incubators')
	.addEventListener('mouseover', function () {
		this.classList.add('mine__item-hov')
	})

document.getElementById('incubators').addEventListener('mouseout', function () {
	this.classList.remove('mine__item-hov')
})
document.getElementById('vitamins').addEventListener('mouseover', function () {
	this.classList.add('mine__item-hov')
})

document.getElementById('vitamins').addEventListener('mouseout', function () {
	this.classList.remove('mine__item-hov')
})
document.getElementById('trainer').addEventListener('mouseover', function () {
	this.classList.add('mine__item-hov')
})

document.getElementById('trainer').addEventListener('mouseout', function () {
	this.classList.remove('mine__item-hov')
})
document.getElementById('elixir').addEventListener('mouseover', function () {
	this.classList.add('mine__item-hov')
})

document.getElementById('elixir').addEventListener('mouseout', function () {
	this.classList.remove('mine__item-hov')
})


//////////////////////////////////////////////////////////////////////


document.addEventListener('DOMContentLoaded', function () {
	document
		.getElementById('popup__btn-grain')
		.addEventListener('click', function () {
			document.getElementById('myOverlay').style.display = 'none'
			document.querySelector('main').classList.remove('grain-open')
			document.getElementById('grain').classList.remove('mine__item-hov--block')
		})
})

document.addEventListener('DOMContentLoaded', function () {
	document
		.getElementById('popup__btn-incubators')
		.addEventListener('click', function () {
			document.getElementById('myOverlay').style.display = 'none'
			document.querySelector('main').classList.remove('incubators-open')
			document.getElementById('incubators').classList.remove('mine__item-hov--block')
		})
})

document.addEventListener('DOMContentLoaded', function () {
	document
		.getElementById('popup__btn-vitamins')
		.addEventListener('click', function () {
			document.getElementById('myOverlay').style.display = 'none'
			document.querySelector('main').classList.remove('vitamins-open')
			document.getElementById('vitamins').classList.remove('mine__item-hov--block')
		})
})

document.addEventListener('DOMContentLoaded', function () {
	document
		.getElementById('popup__btn-trainer')
		.addEventListener('click', function () {
			document.getElementById('myOverlay').style.display = 'none'
			document.querySelector('main').classList.remove('trainer-open')
			document.getElementById('trainer').classList.remove('mine__item-hov--block')
		})
})

document.addEventListener('DOMContentLoaded', function () {
	document
		.getElementById('popup__btn-elixir')
		.addEventListener('click', function () {
			document.getElementById('myOverlay').style.display = 'none'
			document.querySelector('main').classList.remove('elixir-open')
			document.getElementById('elixir').classList.remove('mine__item-hov--block')
		})
})


///////////////////////////////////////////////////////////////////


document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('grain').addEventListener('click', function () {
		document.getElementById('myOverlay').style.display = 'block'
		document.querySelector('main').classList.toggle('grain-open')
		document.getElementById('grain').classList.add('mine__item-hov--block')
	})
})
document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('incubators').addEventListener('click', function () {
		document.getElementById('myOverlay').style.display = 'block'
		document.querySelector('main').classList.toggle('incubators-open')
		document.getElementById('incubators').classList.add('mine__item-hov--block')
	})
})
document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('vitamins').addEventListener('click', function () {
		document.getElementById('myOverlay').style.display = 'block'
		document.querySelector('main').classList.toggle('vitamins-open')
		document.getElementById('vitamins').classList.add('mine__item-hov--block')
	})
})
document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('trainer').addEventListener('click', function () {
		document.getElementById('myOverlay').style.display = 'block'
		document.querySelector('main').classList.toggle('trainer-open')
		document.getElementById('trainer').classList.add('mine__item-hov--block')
	})
})
document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('elixir').addEventListener('click', function () {
		document.getElementById('myOverlay').style.display = 'block'
		document.querySelector('main').classList.toggle('elixir-open')
		document.getElementById('elixir').classList.add('mine__item-hov--block')
	})
})
