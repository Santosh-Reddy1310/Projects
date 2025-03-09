const decrement = document.getElementById('decrease');
        const reset = document.getElementById('reset');
        const increment = document.getElementById('increase');
        const counter = document.getElementById('counter');

        let count = 0;

        increment.addEventListener('click', () => {
            count++;
            counter.textContent = count;
        });

        decrement.addEventListener('click', () => {
            count--;
            counter.textContent = count;
        });

        reset.addEventListener('click', () => {
            count = 0;
            counter.textContent = count;
        });