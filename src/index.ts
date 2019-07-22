import "./index.scss";
import { PhoneInput } from './phone-input/PhoneInput';

const root = document.createElement('div');
root.classList.add('root');
document.body.insertBefore(root, document.body.firstChild);

PhoneInput(root, '+7(985)0II-**-**', '55');