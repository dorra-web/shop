function handleClick(event) {
    event.preventDefault();
    var link = event.currentTarget.href;
    var countdownElement = document.getElementById('countdown');
    var timeLeft = 10;

    countdownElement.style.display = 'block';
    countdownElement.innerText = 'Please Wait in ' + timeLeft + ' seconds...';

    var countdownInterval = setInterval(function() {
        timeLeft--;
        countdownElement.innerText = 'Please Wait in ' + timeLeft + ' seconds...';

        if (timeLeft <= 0) {
            clearInterval(countdownInterval);

            // Buka jendela sementara yang akan ditutup
            var newWindow = window.open('', '_blank');
            if (newWindow) {
                newWindow.location = link;
                newWindow.focus();
            } else {
                // Jika jendela tidak dapat dibuka, fallback ke tab yang sama
                window.location.href = link;
            }
        }
    }, 1000);
}
