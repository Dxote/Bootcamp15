const validator = require('validator');
const { rl, question } = require('./readingline');
const { loadJSON, saveJSON } = require('./file');

async function main() {
    const name = await question('What is your name? ');

    var phone;
    do {
        phone = await question('What is your number? ');
        if (!validator.isMobilePhone(phone, 'id-ID')) {
            console.log('Your phone number is incorrect');
        }
    } while (!validator.isMobilePhone(phone, 'id-ID'));

    var email;
    do {
        email = await question('What is your email? ');
        if (!validator.isEmail(email)) {
            console.log('Your email is incorrect');
        }
    } while (!validator.isEmail(email));

    const users = loadJSON('data.json');
    users.push({ name, phone, email });
    saveJSON('data.json', users);

    console.log('Data saved');
    rl.close();
}

main();
