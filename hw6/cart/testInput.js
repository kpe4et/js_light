input = document.querySelector('input');
const log = document.getElementById('values');


function updateValue(e) {
    log.textContent = e.target.value;
}

console.log(input.addEventListener('input', updateValue));