alert("Please login your account to borrow or return books!");
let bookSelection = [];

function add(evt) {
  let bookItem = library.bookItems.get(evt.target.parentNode.value);
  bookSelection.push(bookItem);
  updateBookSelection(bookItem);
}

function updateBookSelection(bookItem) {
  let table2 = document.getElementById("book_cart");
  let row = document.createElement("tr");
  let td1 = document.createElement("td");
  let td2 = document.createElement("td");
  let td3 = document.createElement("td");
  let td4 = document.createElement("td");
  let td5 = document.createElement("td");
  let td6 = document.createElement("td");
  let td7 = document.createElement("td");

  let date = new Date(); //the current date
  let date2 = new Date(); //a week a after the current date, which is the due date

  date2.setDate(date2.getDate() + 7);

  td1.innerHTML = bookItem.bookName;
  td2.innerHTML = bookItem.authorName;
  td3.innerHTML = bookItem.isbn;
  td4.innerHTML = bookItem.chargePerDay;
  td5.innerHTML =
    date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
  td6.innerHTML =
    date2.getMonth() + 1 + "/" + date2.getDate() + "/" + date2.getFullYear();

  td7.innerHTML = currentMember.membership.addLoan(
    new Loan(bookItem.bookName, date, date2)
  );

  row.append(td1);
  row.append(td2);
  row.append(td3);
  row.append(td4);
  row.append(td5);
  row.append(td6);

  table2.append(row);
}

function showAccount() {
  let table1 = document.getElementById("account_info");
  let row = document.createElement("tr");
  let caption1 = document.createElement("td");

  let array = currentMember.membership._loans.map(
    (n) =>
      "\r\n " +
      n.book +
      ", borrow date: " +
      (+n.startDate.getMonth() + 1) +
      "/" +
      n.startDate.getDate() +
      "/" +
      n.startDate.getFullYear() +
      ", due date: " +
      (+n.dueDate.getMonth() + 1) +
      "/" +
      n.dueDate.getDate() +
      "/" +
      n.dueDate.getFullYear() +
      ", total late fee charge: $" +
      n.computeCharge(new Date()).toFixed(2)
  );
  console.log(array);

  caption1.innerHTML = array;
  caption1.innerHTML = caption1.innerHTML.replace(/\n\r?/g, "<br />");

  row.append(caption1);

  table1.append(row);
}

let currentMember;
let currentPassword;

function login() {
  let member = library.members.get(
    document.getElementById("member_name").value
  );
  let password = library.members.get(
    document.getElementById("member_password").value
  );
  let inputPassword = document.getElementById("member_password").value;

  if (!member || inputPassword != member.password) {
    alert("Account not found. Try again!");
    return;
  }

  currentMember = member;
  currentPassword = password;
  displayInfo();
  showAccount();
  return currentMember;
}
function register() {
  members.set(
    prompt("Please enter your name: "),
    new Member(
      prompt("Please enter your name again: "),
      prompt("Please enter your password: "),
      new Membership(
        prompt("Are you a Student or Faculty: "),
        this.borrowedAmount
      )
    )
  );
}
function displayInfo() {
  document.getElementById(
    "info"
  ).innerHTML = `[${currentMember.membership._type} Account] Hi ${currentMember.name}, you are having ${currentMember.membership._loans.length} borrowed books.`;
}

function borrowBook() {
  let rowLength = document.getElementById("book_cart").rows.length;
  let loanArray = currentMember.membership._loans.map(
    (n) =>
      "\r\n " +
      n.book +
      ", borrow date: " +
      (+n.startDate.getMonth() + 1) +
      "/" +
      n.startDate.getDate() +
      "/" +
      n.startDate.getFullYear() +
      ", due date: " +
      (+n.dueDate.getMonth() + 1) +
      "/" +
      n.dueDate.getDate() +
      "/" +
      n.dueDate.getFullYear()
  );
  if (document.getElementById("info").innerHTML.length > 0) {
    alert(
      `Thank you ${currentMember.name}! You borrowed ${rowLength - 1} books.`
    );
    alert(`Books you are borrowing from our library are: ${loanArray}`);
    resetCart();
  }
}

function returnBook() {
  let chargeArr = currentMember.membership._loans.map(
    (n) => +n.computeCharge(new Date()).toFixed(2)
  );

  let finalCharge = chargeArr.reduce((a, b) => a + b);
  if (finalCharge > 0) {
    alert(
      `Thank you for returning books! Your total late fee charge is $${finalCharge}`
    );
  } else alert(`Thank you for returning books on time!`);
  currentMember.membership._loans = [];
  resetCart();
}

function checkAccount() {
  alert(
    `[${currentMember.membership._type} Account] Hi ${currentMember.name}, you are having ${currentMember.membership._loans.length} borrowed books.`
  );

  let array = currentMember.membership._loans.map(
    (n) =>
      "\r\n " +
      n.book +
      ", borrow date: " +
      (+n.startDate.getMonth() + 1) +
      "/" +
      n.startDate.getDate() +
      "/" +
      n.startDate.getFullYear() +
      ", due date: " +
      (+n.dueDate.getMonth() + 1) +
      "/" +
      n.dueDate.getDate() +
      "/" +
      n.dueDate.getFullYear() +
      ", total late fee charge: $" +
      n.computeCharge(new Date()).toFixed(2)
  );
  if (currentMember.membership._loans.length > 0) alert(array);
}

function resetCart() {
  let table = document.getElementById("book_cart");
  let rows = document.querySelectorAll("#book_cart>tr");
  for (let i = rows.length; i > 0; i--) {
    table.deleteRow(i);
  }
  bookSelection = [];
}

function logout() {
  location.reload();
  return false;
}