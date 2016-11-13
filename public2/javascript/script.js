function randomizePersonPosition() {
	var person = document.querySelector('.person');

	// make random percentage from 0 to 100%
	var top = Math.floor(Math.random() * 100),
		left = Math.floor(Math.random() * 100);

	person.style.top = top + '%';
	person.style.left = left + '%';
}

randomizePersonPosition();