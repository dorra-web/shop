function handleClick(event) {
    event.preventDefault();
    var link = event.currentTarget.href;
    var countdownElement = document.getElementById('countdown');
    var hiddenLink = document.getElementById('hiddenLink');
    var timeLeft = 10;

    countdownElement.style.display = 'block';
    countdownElement.innerText = 'Please Wait in ' + timeLeft + ' seconds...';

    var countdownInterval = setInterval(function() {
        timeLeft--;
        countdownElement.innerText = 'Please Wait in ' + timeLeft + ' seconds...';

        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            hiddenLink.href = link;
            hiddenLink.click();
        }
    }, 1000);
}
