
window.addEventListener(
	'mousewheel',
	function (e) {
		if (e.ctrlKey) {
			e.preventDefault()
			return false
		}
	},
	{ passive: false }
)