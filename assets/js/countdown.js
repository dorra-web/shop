        function handleClick(event) {
            event.preventDefault(); 
            var link = event.currentTarget.href;
            var countdownElement = document.getElementById('countdown');
            var timeLeft = 10;

            countdownElement.style.display = 'block';
            countdownElement.innerText = 'Please Wait in ' + timeLeft + ' second...';

            var countdownInterval = setInterval(function() {
                timeLeft--;
                countdownElement.innerText = 'Please Wait in ' + timeLeft + ' second...';

                if (timeLeft <= 0) {
                    clearInterval(countdownInterval);
                    window.location.href = link; 
                }
            }, 1000);
        }
