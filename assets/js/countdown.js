 function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '=([^&#]*)'),
        results = regex.exec(url);
    if (!results) return null;
    return decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function base64Decode(str) {
    try {
        return decodeURIComponent(atob(str).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    } catch (e) {
        console.error('Base64 decoding failed:', e);
        return null;
    }
}

function handleClick(event) {
    event.preventDefault(); 
    var link = event.currentTarget.href;
    var countdownElement = document.getElementById('countdown');
    var timeLeft = 10;
    var buttonElement = document.getElementById('redirect-button');

    countdownElement.style.display = 'block';
    countdownElement.innerText = 'Please Wait in ' + timeLeft + ' seconds...';
    buttonElement.style.display = 'none';

    var countdownInterval = setInterval(function() {
        timeLeft--;
        countdownElement.innerText = 'Please Wait in ' + timeLeft + ' seconds...';

        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            countdownElement.innerText = 'You can now proceed to the link:';
            buttonElement.style.display = 'block'; // Show the button
            buttonElement.href = link; // Set button link
        }
    }, 1000);
}

function startCountdown() {
    var encodedLink = getParameterByName('link');
    var link = base64Decode(encodedLink);

    if (link) {
        document.getElementById('delayedLink').href = link;
        handleClick({ preventDefault: function() {}, currentTarget: { href: link } });
    } else {
        document.getElementById('countdown').innerText = 'Link parameter not found or invalid!';
        document.getElementById('redirect-button').style.display = 'none';
    }
}

document.addEventListener("DOMContentLoaded", function() {
    startCountdown();
});
