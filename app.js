import { rl, question } from './utils/readLine.js';
import { read, write } from './utils/file.js';
import { validatePhone, validateEmail } from './utils/validator.js';

const PATH_DATA = './data/data.json';

async function main() {
    const name = await question('What is your name? ');

    let phone;
    do {
        phone = await question('What is your number? ');
        if (!validatePhone(phone)) {
            console.log('Your phone number is incorrect');
        }
    } while (!validatePhone(phone));

    let email;
    do {
        email = await question('What is your email? ');
        if (!validateEmail(email)) {
            console.log('Your email is incorrect');
        }
    } while (!validateEmail(email));

    const users = read(PATH_DATA);
    users.push({ name, phone, email });
    write(PATH_DATA, users);

    console.log('Data saved');
    rl.close();
}

main();
