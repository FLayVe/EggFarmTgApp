document.addEventListener('DOMContentLoaded', function () {
	Telegram.WebApp.ready()

	const userData = Telegram.WebApp.initDataUnsafe.user
	let name

	function updateUserText(selector, text) {
		document.querySelectorAll(selector).forEach(element => {
			element.textContent = text
		})
	}

	if (userData) {
		name =
			userData.username && userData.username.startsWith('@')
				? userData.username
				: userData.first_name || 'User'
	} else {
		name = 'User'
	}

	updateUserText('.user-name', name) || updateUserText('.user-name-2', name)

	const clickableImg = document.getElementById('clickableImg')
	const balanceValue = document.getElementById('balanceValue')
	const balanceTextElements = document.querySelectorAll('.balance__text')

	let balance = parseInt(localStorage.getItem('balance')) || 0
	updateBalanceDisplay(balance)

	clickableImg.addEventListener('touchstart', function (event) {
		if (event.touches.length <= 3) {
			const incrementPerTouch = 14
			const newBalance = balance + event.touches.length * incrementPerTouch

			animateBalanceChange(balance, newBalance)
			localStorage.setItem('balance', newBalance)
			balance = newBalance

			Array.from(event.touches).forEach(touch => {
				const numberElement = document.createElement('div')
				numberElement.textContent = `+${incrementPerTouch}`
				numberElement.classList.add('number')

				const rect = clickableImg.getBoundingClientRect()
				numberElement.style.left = `${touch.clientX - rect.left}px`
				numberElement.style.top = `${touch.clientY - rect.top}px`

				clickableImg.parentElement.appendChild(numberElement)

				numberElement.addEventListener('animationend', function () {
					numberElement.remove()
				})
			})

			event.preventDefault()
		}
	})

	function animateBalanceChange(oldBalance, newBalance) {
		const duration = 400 // Duration of animation in milliseconds
		const difference = newBalance - oldBalance
		let stepTime = duration / difference
		let currentBalance = oldBalance

		const timer = setInterval(function () {
			currentBalance += 1
			updateBalanceDisplay(currentBalance)
			if (currentBalance >= newBalance) {
				clearInterval(timer)
			}
		}, Math.max(25, stepTime)) // Prevents too fast increments
	}

	function updateBalanceDisplay(balance) {
		const formattedBalance = balance.toLocaleString('en-US').replace(/,/g, ' ')
		balanceValue.textContent = formattedBalance
		balanceTextElements.forEach(element => {
			element.textContent = formattedBalance
		})
	}

	function isMobileDevice() {
		return (
			typeof window.orientation !== 'undefined' ||
			navigator.userAgent.indexOf('IEMobile') !== -1
		)
	}

	const qrCodeContainer = document.getElementById('qrCode')
	const contentContainer = document.getElementById('content')

	if (!isMobileDevice()) {
		qrCodeContainer.style.display = 'block'
		contentContainer.style.display = 'none'
	} else {
		qrCodeContainer.style.display = 'none'
		contentContainer.style.display = 'block'
	}

	const timerElement = document.getElementById('timer')
	const initialTimeInSeconds = 28 * 24 * 60 * 60
	let timeRemaining =
		localStorage.getItem('timeRemaining') !== null
			? parseInt(localStorage.getItem('timeRemaining'), 10)
			: initialTimeInSeconds

	function formatTime(seconds) {
		const days = Math.floor(seconds / (24 * 60 * 60))
		seconds %= 24 * 60 * 60
		const hours = Math.floor(seconds / (60 * 60))
		seconds %= 60 * 60
		const minutes = Math.floor(seconds / 60)
		seconds %= 60

		return `${days}d ${hours}h ${minutes}m ${seconds}s`
	}

	function updateTimer() {
		timerElement.textContent = formatTime(timeRemaining)
		if (timeRemaining > 0) {
			timeRemaining--
		} else {
			timeRemaining = initialTimeInSeconds // Перезапуск таймера
		}
		localStorage.setItem('timeRemaining', timeRemaining) // Зберігаємо залишок часу в localStorage
	}

	setInterval(updateTimer, 1000) // Оновлення таймера кожну секунду
	updateTimer() // Ініціалізуємо таймер відразу

	window.onload = function () {
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

		if (tapChick) {
			tapChick.addEventListener('click', function () {
				this.classList.add('animate')
				setTimeout(() => {
					this.classList.remove('animate')
				}, 30)
			})
		}

		function toggleHover(element) {
			element.addEventListener('mouseover', function () {
				this.classList.add('mine__item-hov')
			})
			element.addEventListener('mouseout', function () {
				this.classList.remove('mine__item-hov')
			})
		}

		function setupElementClick(element, overlay, mainClass, itemHoverClass) {
			element.addEventListener('click', function () {
				overlay.style.display = 'block'
				mainElement.classList.add(mainClass)
				element.classList.add(itemHoverClass)
			})
		}
		
		if (popupBtn) {
			popupBtn.addEventListener('click', function () {
				overlay.style.display = 'none'
				mainElement.classList.remove('popup-open')
				elements.forEach(element => {
					element.classList.remove('mine__item-hov--block')
				})
			})
		}

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

		buttons.forEach(button => {
			button.addEventListener('click', () => handleButtonClick(button))
		})

		if (/Mobi|Android/i.test(navigator.userAgent)) {
			preloader.style.display = 'block'
			setTimeout(function () {
				handleButtonClick(document.querySelector('.home-btn'))
				preloader.style.display = 'none'
				menu.style.display = 'block'
			}, 1450)
		} else {
			handleButtonClick(document.querySelector('.home-btn'))
			menu.style.display = 'block'
		}

		elements.forEach(element => {
			toggleHover(element)
			setupElementClick(element, overlay, 'popup-open', 'mine__item-hov--block')
		})

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
	}
})

document.getElementById('tap').addEventListener('click', function () {
		navigator.vibrate(200)
})


