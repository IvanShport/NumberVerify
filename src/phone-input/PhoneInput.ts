const isDigit = (char: string): boolean => {
    return char >= '0' && char <= '9';
};

export const PhoneInput = (parent: HTMLElement, mask: string, realValues?: string): void => {
    const template = require('./PhoneInput.pug');
    const result = [];

    for (const sym of mask) {

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

    const phoneInputElem = document.createElement('div');
    phoneInputElem.innerHTML = template({result});
    parent.append(phoneInputElem);

    const inputs = Array.from(phoneInputElem.querySelectorAll('.phone_input__content__digit_theme_input'));

    inputs.forEach((input, i) => {
        input.addEventListener('input', (event) => {

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

            if (realValues) {
                validateNumber(getValuesFromInputs(inputs), realValues);
            }
        });
        input.addEventListener('keydown', (event) => {
            const { keyCode } = event as KeyboardEvent;

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

                if (realValues) {
                    validateNumber(getValuesFromInputs(inputs), realValues);
                }
                event.preventDefault();

            }
            if (keyCode === 46) {

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

                if (realValues) {
                    validateNumber(getValuesFromInputs(inputs), realValues);
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
    });

    const getValuesFromInputs = (inputs: Element[]): string => {
        let result = '';

        inputs.forEach((input) => {
            if ((input as HTMLInputElement).value === '') {
                result = 'error';
                return;
            }
            result += (input as HTMLInputElement).value;
        });

        return result;
    };

    const validateNumber = (inputValues: string, realValues: string): boolean => {
        const result = inputValues === realValues;
        const errorField = phoneInputElem.querySelector('.phone_input__error');
        if (inputValues === 'error' || result) {

            if (errorField) {

                errorField.textContent = '';
                inputs.forEach((input) => {
                    input.classList.remove('phone_input__content__digit_theme_error')
                });
            }
        } else {

            if (errorField) {

                inputs.forEach((input) => {
                    input.classList.add('phone_input__content__digit_theme_error')
                });
                errorField.textContent = 'Неверный номер, попробуйте еще раз';
            }
        }
        return result;
    };
};
