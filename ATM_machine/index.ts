#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

// Initialize user balance and pin code
let myBalance = 8000;
let myPin = 11223;

// Print welcome message
console.log(chalk.blue.bold('\n \t Welcome to code with shah Muhammad - ATM Machine \n'));

let pinAnswer = await inquirer.prompt([
    {
        name: 'pin',
        type: 'number',
        message: chalk.yellow('Enter Your pin code: ')
    }
])
if (pinAnswer.pin === myPin) {
    console.log(chalk.green.bold('\n Pin is Correct, Login Successfully! \n'));

    let operationAns = await inquirer.prompt([
        {
            name: 'operation',
            type: 'list',
            message: 'Select an operation',
            choices: ['Withdraw Amount','Check Balance']
        }
    ])
    if (operationAns.operation === 'Withdraw Amount') {
        let withdrawAns = await inquirer.prompt([
            {
                name: 'withdrawMethod',
                type: 'list',
                message: 'Select a withdrawal method:',
                choices: ['Fast Cash','Enter Amount']
            }
        ])
        if (withdrawAns.withdrawMethod === 'Fast Cash') {
            let fastCashAns = await inquirer.prompt([
                {
                    name: 'fastCash',
                    type: 'list',
                    message: 'Select Amount:',
                    choices: [1000, 2000, 5000, 10000, 20000, 50000]
                }
            ])
            if (fastCashAns.fastCash > myBalance) {
                console.log(chalk.blue('Insufficient Balance'));
            }else {
                myBalance -= fastCashAns.fastCash
                console.log(`${fastCashAns.fastCash} withdraw Successfully!`);
                console.log(chalk.green.bold(`Your Remaining Balance is: ${myBalance}`));
            }
        }
         else if (withdrawAns.withdrawMethod === 'Enter Amount') {
            let amountAns = await inquirer.prompt([
                {
                    name: 'amount',
                    type: 'number',
                    message: chalk.yellow('Enter the amount to Withdraw:')
                }
            ])
            if (amountAns.amount > myBalance ) {
                console.log(chalk.red.bold('Insufficient Balance'));
            }else {
                myBalance -= amountAns.amount
                console.log(`${amountAns.amount} Withdraw Successfully!`);
                console.log(chalk.white.bold(`Current Amount Balance is: ${myBalance}`));
            }
        }
        
    } else if (operationAns.operation === 'Check Balance') {
        console.log(chalk.green.bold(`Your Account Balance is: ${myBalance}`));
    }
}
else {
    console.log(chalk.red.bold('Pin is Incorrect, Try Again!'));
}