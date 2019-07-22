import "./index.scss";

const root = document.createElement('div');
root.classList.add('root');
document.body.insertBefore(root, document.body.firstChild);

// root.innerHTML = template();

const isDigit = (char: string): boolean => {
    return char >= '0' && char <= '9';
};

const PhoneInput = (mask: string): void => {
    const template = require('./phoneInput.pug');
    const result = [];

    for (let sym of mask) {

        if (sym === 'I') {

            result.push({ type: 'input' });
        } else if (sym === 'X') {

            result.push({ type: 'hideX' });
        } else if (sym === '*') {

            result.push({ type: 'hideStar' });
        } else if (isDigit(sym)) {

            result.push({ type: 'digit', value: sym });
        } else {

            result.push({ type: 'notDigit', value: sym });
        }
    }

    root.innerHTML = template({result: result});

    const inputs = Array.from(root.querySelectorAll('.phone_input__content__digit_theme_input'));

    inputs.forEach((input, i) => {
        input.addEventListener('input', (event) => {
            console.log(i, ' ', event);
            let { value } = input as HTMLInputElement;
            if (value.length > 1) {
                value = value.slice(0, 1);
            }
            if (!isDigit(value)) {
                value = '';
            }
            (input as HTMLInputElement).value = value;

            if (value !== '') {

                const nextInput = inputs[i + 1];
                if (nextInput) {
                    (nextInput as HTMLInputElement).focus();
                }
            }
        });
        input.addEventListener('keydown', (event) => {
            const { keyCode } = event as KeyboardEvent;

            console.log((input as HTMLInputElement).selectionStart);

            if (keyCode === 8) {
                const prevInput = inputs[i - 1];
                if ((input as HTMLInputElement).selectionStart === 0) {
                    if (prevInput) {
                        (prevInput as HTMLInputElement).value = '';
                        (prevInput as HTMLInputElement).focus();
                    }
                } else {
                    (input as HTMLInputElement).value = '';
                    if (prevInput) {
                        (prevInput as HTMLInputElement).focus();
                    }
                }
                event.preventDefault();

            }
            if (keyCode === 46) {
                console.log(i, ' ', (input as HTMLInputElement).value);
                if ((input as HTMLInputElement).selectionStart === 0 &&
                    (input as HTMLInputElement).value !== '') {

                    (input as HTMLInputElement).value = '';
                } else {
                    for (let j = i + 1; j < inputs.length; j++) {
                        if ((inputs[j] as HTMLInputElement).value !== '') {
                            (inputs[j] as HTMLInputElement).value = '';
                            break;
                        }
                    }
                }
                event.preventDefault();
            }
            if (keyCode === 37) {
                if ((input as HTMLInputElement).selectionStart === 0) {

                    const prevInput = inputs[i - 1];
                    if (prevInput) {
                        (prevInput as HTMLInputElement).focus();
                    }
                }
            }
            if (keyCode === 39) {

                if ((input as HTMLInputElement).selectionStart !== 0) {
                    const nextInput = inputs[i + 1];
                    if (nextInput) {
                        (nextInput as HTMLInputElement).focus();
                    }
                }
            }
        });
    })
};

PhoneInput('+7(985)0II-**-**');