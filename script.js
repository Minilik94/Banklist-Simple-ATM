'use strict'

//Data
const account1 = {
    owner: "Jonas Schmedtmann",
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2,
    pin: 1111,

    movementsDate: [
        '2022-01-18T21:31:17.178Z',
        '2022-02-23T07:42:02.383Z',
        '2022-04-28T09:15:04.904Z',
        '2022-05-01T10:17:24.185Z',
        '2022-05-08T14:11:59.604Z',
        '2022-05-27T17:01:17.194Z',
        '2022-05-31T23:36:17.929Z',
        '2022-06-01T10:51:36.790Z',
    ],
};
const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222, movementsDate: [
        '2022-11-18T21:31:17.178Z',
        '2022-11-23T07:42:02.383Z',
        '2022-11-28T09:15:04.904Z',
        '2022-11-01T10:17:24.185Z',
        '2022-11-08T14:11:59.604Z',
        '2022-10-27T17:01:17.194Z',
        '2022-10-31T23:36:17.929Z',
        '2022-10-01T10:51:36.790Z',
    ],
};

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333, movementsDate: [
        '2022-9-18T21:31:17.178Z',
        '2022-9-23T07:42:02.383Z',
        '2022-9-28T09:15:04.904Z',
        '2022-11-01T10:17:24.185Z',
        '2022-11-08T14:11:59.604Z',
        '2022-10-27T17:01:17.194Z',
        '2022-10-31T23:36:17.929Z',
        '2022-8-01T10:51:36.790Z',
    ],
};

const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444, movementsDate: [
        '2022-10-18T21:31:17.178Z',
        '2022-10-23T07:42:02.383Z',
        '2022-11-28T09:15:04.904Z',
        '2022-9-01T10:17:24.185Z',
        '2022-11-08T14:11:59.604Z',
    ],
};
const account5 = {
    owner: 'Minilik Zeru',
    movements: [100000, 20000, -6000, -100000, 90],
    interestRate: 1,
    pin: 1212, movementsDate: [
        '2022-11-01T10:17:24.185Z',
        '2022-11-08T14:11:59.604Z',
        '2022-10-31T17:01:17.194Z',
        '2022-11-02T23:36:17.929Z',
        '2022-11-04T10:51:36.790Z',
    ],
};

const accounts = [account1, account2, account3, account4, account5]

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balNum');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.time');
const containerApp = document.querySelector('.container');
const containerMovements = document.querySelector('.all');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.amount-btn');
const btnLoan = document.querySelector('.reqAmo-btn');
const btnClose = document.querySelector('.userName-btn');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.user');
const inputLoginPin = document.querySelector('.pass');
const inputTransferTo = document.getElementById('form__input--to');
const inputTransferAmount = document.getElementById('form__input--amount');
const inputLoanAmount = document.getElementById('form__input--loan-amount');
const inputCloseUsername = document.getElementById('form__input--user');
const inputClosePin = document.getElementById('form__input--pin');

const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const formatMovementDate = function (date) {
    const calcDaysPassed = (date1, date2) =>
        Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24))

    const daysPassed = calcDaysPassed(new Date(), date)

    if (daysPassed === 0) return 'Today'
    if (daysPassed === 1) return 'Yesterday'
    if (daysPassed <= 7) return `${daysPassed} days ago`
    else {
        const day = `${date.getDate()}`.padStart(2, 0)
        const month = `${date.getMonth() + 1}`.padStart(2, 0)
        const year = date.getFullYear()
        return `${day}/${month}/${year}`
    }

}

const displayMovement = function (acc, sort = false) {
    containerMovements.innerHTML = ''
    const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements
    movs.forEach((mov, i) => {

        const date = new Date(acc.movementsDate[i])
        const type = mov > 0 ? 'deposit' : 'withdrawal'
        const withD = type == 'withdrawal' ? 'withDraw' : ''

        const displayDate = formatMovementDate(date)
        const html = `
        <div class="history ${type}">
                        <p><span class="withDepo ${withD}">${i + 1} ${type}</span></span> 
                        ${displayDate}<span class="balAmo">
                            <span class="balAmo">${mov}€</span></p>
                    </div>
        `
        containerMovements.insertAdjacentHTML('afterbegin', html)
    })

}

const calcDisplayBalance = function (acc) {
    acc.balance = acc.movements.reduce((acc, cur) =>
        acc + cur, 0
    )
      labelBalance.textContent = `${acc.balance}€`
}


const calcDisplaySummery = function (acc) {
    const income = acc.movements.filter(mov => mov > 0).reduce((acc, cur) => acc + cur, 0)
    labelSumIn.textContent = `${income}€ `

    const outcome = acc.movements.filter(mov => mov < 0).reduce((acc, cur) => acc + cur, 0)
    labelSumOut.textContent = `${Math.abs(outcome)}€ `

    const interest = acc.movements.filter(mov => mov > 0).map((deposit) => deposit * 1.1 / 100)
        .filter(int => int >= 1)
        .reduce((acc, cur) => acc + cur, 0)
    labelSumInterest.textContent = `${Math.floor(interest)}€ `
}

const updateUI = function (acc) {
    // Display movement
    displayMovement(acc)
    // Display balance
    calcDisplayBalance(acc)
    // Display  summery
    calcDisplaySummery(acc)
}

const startLogOutTimer = function() {
    // Set time
    let time = 300
const tiks = function() {
    //print the remaining time to UI
    const min = String(Math.trunc(time /60)).padStart(2,0); 
    const sec = String(time % 60).padStart(2,0)
    labelTimer.textContent = `${min}:${sec}`
    
    // When 0 seconds, stop timer and log out user
    if(time === 0){
        clearInterval(timer)
        labelWelcome.textContent = 'Login to get started'
containerApp.style.opacity = 0
}
time--
}

     // Call the timer every second
const timer = setInterval(tiks, 1000);
tiks()

return timer
}
const creatUsernames = function (accs) {
    accs.forEach(acc => {
        acc.username = acc.owner.toLowerCase().split(' ').map(name => name[0]).join('')
    })
}
creatUsernames(accounts)

let currentAccount, timer;


//Implementing fake ui

// currentAccount = account1
// updateUI(currentAccount)
// containerApp.style.opacity = 1

const now = new Date()
const day = `${now.getDate()}`.padStart(2, 0)
const month = `${now.getMonth() + 1}`.padStart(2, 0)
const year = now.getFullYear()
const hour = `${now.getHours()}`.padStart(2, 0)
const min = `${now.getMinutes()}`.padStart(2, 0)
labelDate.innerHTML = `${day}/${month}/${year}, ${hour}:${min}`


btnLogin.addEventListener('click', (e) => {
    e.preventDefault()
    currentAccount = accounts.find((acc) => acc.username === inputLoginUsername.value)

    //Check if the pin is correct
    if (currentAccount?.pin === Number(inputLoginPin.value)) {
        containerApp.style.opacity = 100
        labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`
    }
    //Clear Input field
    inputLoginUsername.value = inputLoginPin.value = ''

    //Display Welcome message

    // Display movement
    displayMovement(currentAccount)
    // Display balance
    calcDisplayBalance(currentAccount)
    // Display  summery
    calcDisplaySummery(currentAccount)

    if(timer) clearInterval(timer)
    timer = startLogOutTimer()

})


btnTransfer.addEventListener('click', function (e) {
    e.preventDefault()
    const amount = Number(inputTransferAmount.value)
    const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value)
    if (
        amount > 0 &&
        receiverAcc &&
        currentAccount.balance >= amount &&
        receiverAcc?.username !== currentAccount.username
    ) {
        currentAccount.movements.push(-amount)
        receiverAcc.movements.push(amount)

        currentAccount.movementsDate.push(new Date())
        receiverAcc.movements.push(new Date())
    }
    timer = clearInterval(timer)
    timer = startLogOutTimer()
    
    updateUI(currentAccount)
    inputTransferAmount.value = ''
    inputTransferTo.value = ''
})


btnClose.addEventListener('click', function (e) {
    e.preventDefault()

    if (inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin) {
        const index = accounts.findIndex(acc => acc.username === currentAccount.username)
        //Delete account
        accounts.splice(index, 1)
        //Hide UI
        containerApp.style.opacity = 0
        labelWelcome.textContent = 'Login here'
    }

    inputClosePin.value = inputCloseUsername.value = ''

    timer = clearInterval(timer)
    timer = startLogOutTimer()
})


btnLoan.addEventListener('click', function (e) {
    e.preventDefault()
    const amount = Number(inputLoanAmount.value)
    setTimeout(function () {
        if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
            currentAccount.movements.push(amount)
            // Add loan Date

            currentAccount.movementsDate.push(new Date())
            updateUI(currentAccount)
        }
    }, 3000)
    inputLoanAmount.value = ''
    
    timer = clearInterval(timer)
    timer = startLogOutTimer()
})


let sorted = false
btnSort.addEventListener('click', (e) => {
    e.preventDefault()
    displayMovement(currentAccount.movements, !sorted)

    sorted = !sorted
})











