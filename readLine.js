const readline = require('readline');
const validator = require('validator');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

    (function askName() {
        rl.question('What is your name? ', (name) => {
            askNumber(name); 
        });
    })();

function askNumber(name) {
    rl.question('What is your number? ', (num) => {
if (!validator.isMobilePhone(num, 'id-ID')) {
console.log('Please enter a valid input for number.');
return askNumber(name);
      
    }
    askEmail(name, num);
    });
}

function askEmail(name, num) {
    rl.question('What is your Email? ', (email) => {
if (!validator.isEmail(email)) {
console.log('Please enter a valid input for email.');
return askEmail(name, num);
     }
            console.log("Your name is " + name);
            console.log("Your number is " + num);
            console.log("Your Email is " + email);
            rl.close();
        });
}
