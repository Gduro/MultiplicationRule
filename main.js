const line_input = document.querySelector('#line');
const line_container_text = document.querySelector('#line_container_text');
const lines_container = document.querySelector('.lines');
const score_text= document.querySelector('.score');
const score_value= document.querySelector('#score');
let score = 0;

const doMath = () => {
    const allInputs = document.querySelectorAll('.line');
    score = Array.from(allInputs).reduce((a, input) => a * parseInt(input.value, 10), 1);
    score_text.style.display = "block";
    score_value.innerHTML = ` ${score}`;
    console.log("score", score);
}

function moveToNextInput(currentInput) {
    const enteredChar = currentInput.value;

    const nextInput = currentInput.nextElementSibling;
    if (nextInput && enteredChar.length === 1) {
        nextInput.focus();
    } else {
        const prevInput = currentInput.previousElementSibling;
        if (prevInput && enteredChar.length === 0) {
            prevInput.focus();
        }
    }

    const allInputs = document.querySelectorAll('.line');
    const enteredCode = Array.from(allInputs).map(input => input.value).join('');

    if (enteredCode.length === allInputs.length) {
        doMath();
    }else {
        score_text.style.display = "none"; 
    }
}

const generate_lines = (n) => {
    let lines = '';
    for (let i = 0; i < n; i++) {
        lines += '<input type="text" maxLength="1" class="line"></input>';
    }
    return lines;
}
if(line_input.value == 0) {
    line_container_text.style.display = "none";
    score_text.style.display = "none";

}

line_input.addEventListener('change', (e) => {
    if (line_input.value != 0) {
        line_container_text.style.display = "block";
    } 
    const n = e.target.value;
    const lines = generate_lines(n);
    lines_container.innerHTML = lines;

    const inputElements = document.querySelectorAll('.line');
    inputElements.forEach(input => {
        input.addEventListener('input', () => moveToNextInput(input));
    });
});
