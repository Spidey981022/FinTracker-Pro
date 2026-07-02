import darkTheme from "./darkTheme.js";
import charts from "./charts.js";
import logout from "./logout.js";
import entry from "./transactionEntries.js";

const loggedUser = localStorage.getItem('loggedUser');
const profile = JSON.parse(localStorage.getItem('profile'));
const form = document.querySelector("form");
const transactionBox = document.querySelector('.transaction-box');
const addTransaction = document.querySelector('#add-transaction');
const closeTransactionBox = document.querySelector('.ri-close-circle-line');
const currentAmount = document.querySelector('.current-amount span');
const incomeAmount = document.querySelector('.income-amount span');
const expenseAmount = document.querySelector('.expense-amount span');
const countAmount = document.querySelector('.count-amount');
const logoutBtn = document.querySelector('.logout button');
const username = document.querySelector('.username span');
const fullName = document.querySelector('.user-fullname span');
const userEmail = document.querySelector('.user-email span');
const activeBtn = document.querySelectorAll('#side-menu button');
const currencyCards = document.querySelectorAll('.amt h2');
const currencySelect = document.getElementById('currency');
const deleteAll = document.querySelector('.delete-all i');
const setting = document.querySelector('.side-setting');

username.textContent = profile.name;
fullName.textContent = profile.fname;
userEmail.textContent = profile.email.toUpperCase();

const storageKey = `transaction_${loggedUser}`;

const transactionArr = JSON.parse(localStorage.getItem(storageKey)) || [];
console.log(transactionArr);

entry();

// OPEN SETTING

setting.addEventListener('click', (e) => {
 const box = document.querySelector('.setting-box');
 box.style.display = box.style.display === 'block' ? 'none' : 'block';
});

// DELETE ALL TRANSACTION
deleteAll.style.cursor = 'pointer';
deleteAll.addEventListener('click', (e) => {
 const conf = window.prompt('Are you sure you want to delete all transactions? It will reset your all Transactions and Entries to Zero(0). Enter "CONFIRM" to proceed');
 if (conf === 'CONFIRM') {
  localStorage.removeItem(storageKey);
  charts(0, 0);
  entry();
  currentAmount.innerText = 0.00;
  incomeAmount.innerText = 0.00;
  expenseAmount.innerText = 0.00;
  countAmount.innerText = 0;
 }
})

// CURRENCY CHANGE VIA SELECT PROPERTY
currencySelect.addEventListener('change', (e) => {
 const newSymbol = e.target.value;
 localStorage.setItem('currHolder', newSymbol);
 const currHolder = localStorage.getItem('currHolder');

     currencyCards.forEach(card => {
  card.childNodes[0].textContent = currHolder;
 });
});

//CHANGE CURRENCY VALUE
function applyStoredCurrency() {
 const currHolder = localStorage.getItem('currHolder');
 if (!currHolder) return;

 currencyCards.forEach(card => {
  card.childNodes[0].textContent = currHolder;
 });
}

applyStoredCurrency(); // call immediately when script loads

//ACTIVE BUTTON TOGGLE COLOR IN SIDE-SECTION
activeBtn.forEach(btn => {
 btn.addEventListener('click', (e) => {
  document.querySelector('.active')?.classList.remove('active');
  btn.classList.add('active');
 })
})

// TRANSACTION BOX BLOCK STYLING
addTransaction.addEventListener('click', (e) => {
 transactionBox.style.display = "block";
})

closeTransactionBox.addEventListener('click', (e) => {
 transactionBox.style.display = "none";
})

// LOGOUT USER
logoutBtn.addEventListener('click', logout);

// UI RENDERING FUNCTION
const ui = function(){
 form.addEventListener("submit", (e) => {
  e.preventDefault();
  const amount = e.target[0].value;
  const type = e.target[1].value;
  const description = e.target[2].value;
  const category = e.target[3].value;
  const date = e.target[4].value;

  transactionArr.push({
   id: crypto.randomUUID(),
   amount,
   type,
   description,
   category,
   date,
  })

  localStorage.setItem(storageKey, JSON.stringify(transactionArr));

  e.target[0].value = "";
  e.target[2].value = "";
  e.target[3].value = "";
  e.target[4].value = "";

  renderTransactions();
 })
}
ui();

let tIncome = 0;
let tExpense = 0;
// let tTransaction = 0;


const renderTransactions = () => {
 tIncome = 0;
 tExpense = 0;

 // FILTERING INCOME ARRAY
 const incomeArr = transactionArr.filter((item1)=>{
  return item1.type === 'Income';
 })
// ITERATING INCOME ARRAY
 incomeArr.forEach((item1)=>{
  tIncome += Number(item1.amount);
 })
 incomeAmount.innerText = tIncome;


// FILTERING EXPENSE ARRAY
 const expenseArr = transactionArr.filter((item2)=>{
  return item2.type === 'Expense';
 })
// ITERATING EXPENSE ARRAY
 expenseArr.forEach((item2)=>{
  tExpense += Number(item2.amount);
 })
 expenseAmount.innerText = tExpense;


 let cBalance = 0;
 cBalance = tIncome - tExpense;
 currentAmount.innerText = cBalance;

 countAmount.innerText = transactionArr.length;
charts(tIncome, tExpense);
entry();
};
renderTransactions();
darkTheme();