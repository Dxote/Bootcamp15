const readline = require('readline');                          

const rl = readline.createInterface({                          
  input: process.stdin,                                        
  output: process.stdout,                                       
});                                                            
function question(prompt) {                                     
  return new Promise((resolve) => {                             
    rl.question(prompt, (answer) => resolve(answer.trim()));    
  });                                                           
}                                                              
module.exports = { rl, question };                              