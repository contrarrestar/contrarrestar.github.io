document.addEventListener('DOMContentLoaded', function () {
    // Fetch the balance values from vars.json using a fetch request
    fetch('vars.json')
        .then(response => response.json())
        .then(data => {
            const targetBalanceUSD = data.amount; // Access the 'amount' property from the JSON response
            const targetBalanceRUB = data.amount_rub; // Access the 'amount_rub' property for RUB balance
            const balanceElementUSD = document.getElementById('balanceAmount');
            const balanceElementRUB = document.getElementById('rublesBalanceAmount');

            // Function to format the balance with commas (e.g., 1,000)
            function formatBalance(balance) {
                return balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }

            // Function to update the balance in the HTML element
            function updateBalance(balance, element) {
                element.textContent = formatBalance(balance);
            }

            // Animation settings
            const animationDuration = 1000; // Animation duration in milliseconds
            const framesPerSecond = 60;
            const totalFrames = framesPerSecond * (animationDuration / 1000);

            // Animate the balance
            function animate(element, targetBalance) {
                const stepSize = Math.ceil((targetBalance - 0) / totalFrames);
                let currentBalance = 0;
                let currentFrame = 0;

                function animateStep() {
                    currentFrame++;
                    currentBalance += stepSize;

                    if (currentFrame <= totalFrames) {
                        updateBalance(currentBalance, element);
                        requestAnimationFrame(animateStep);
                    } else {
                        updateBalance(targetBalance, element);
                    }
                }

                setTimeout(function () {
                    animateStep(); // Start the animation
                }, 1000); // Delay in milliseconds before starting the animation
            }

            // Start the animations for both balances
            animate(balanceElementUSD, targetBalanceUSD); // USD balance
            animate(balanceElementRUB, targetBalanceRUB); // RUB balance
        })
        .catch(error => {
            console.error('Error fetching balance:', error);
        });
});
