const line_input = document.querySelector('#line');
const line_container_text = document.querySelector('#line_container_text');
const lines_container = document.querySelector('.lines');
const score_text = document.querySelector('.score');
const score_value = document.querySelector('#score');
let score = 0;

const isNumeric = (value) => {
    return !isNaN(parseFloat(value)) && isFinite(value);
};

const doMath = (input) => {
    const allInputs = document.querySelectorAll('.line');
    const enteredValues = Array.from(allInputs).map(input => input.value);
    const enteredChar = input.value;

    if (enteredChar.length === 0) {
        const prevInput = input.previousElementSibling;
        if (prevInput) {
            prevInput.focus();
        }
    }
    if (enteredValues.every(isNumeric)) {
        score = enteredValues.reduce((a, value) => a * parseFloat(value), 1);
        score_text.style.display = "block";
        score_value.innerHTML = ` ${score}`;
        console.log("score", score);
    } else {
        score_text.style.display = "none";
    }
};

const generate_lines = (n) => {
    let lines = '';
    for (let i = 0; i < n; i++) {
        lines += '<input type="text" class="line"></input>';
    }
    return lines;
};

if (line_input.value == 0) {
    line_container_text.style.display = "none";
    score_text.style.display = "none";
}

line_input.addEventListener('change', (e) => {
    if (line_input.value != 0) {
        line_container_text.style.display = "block";
    } else {
        line_container_text.style.display = "none";
    }

    const n = e.target.value;
    const lines = generate_lines(n);
    lines_container.innerHTML = lines;

    const inputElements = document.querySelectorAll('.line');
    inputElements.forEach(input => {
        input.addEventListener('input', () => doMath(input));
    });
});
