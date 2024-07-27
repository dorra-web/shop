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
            console.log("Redirecting to: ", link);  // Log URL yang dituju
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

        // Dapatkan parameter 'link' dari URL
        var encodedLink = getParameterByName('link');
        console.log("Encoded link: ", encodedLink);  // Log encoded link

        var link = base64Decode(encodedLink);
        console.log("Decoded link: ", link);  // Log decoded link

        if (link) {
            document.getElementById('delayedLink').href = link;
            handleClick({ preventDefault: function() {}, currentTarget: { href: link } });
        } else {
            document.getElementById('countdown').innerText = 'Link parameter not found or invalid!';
        }
