let shoppingCart = [];

function add(evt) {
    let bookItem = library.bookItems.get(evt.target.parentNode.value);
    shoppingCart.push(bookItem);
    updateShoppingCart(bookItem);
}

function updateShoppingCart(bookItem) {
    let table2 = document.getElementById("shopping_cart");
    let row = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let td5 = document.createElement("td");
    let td6 = document.createElement("td");
    let td7 = document.createElement("td");

    let date = new Date();
    let date2 = new Date();
    date2.setDate(date2.getDate() + 7);

    td1.innerHTML = bookItem.name;
    td2.innerHTML = bookItem.authorName;
    td3.innerHTML = bookItem.isbn_num;
    td4.innerHTML = bookItem.chargePerDay;
    td5.innerHTML =
        date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
    td6.innerHTML =
        date2.getMonth() + 1 + "/" + date2.getDate() + "/" + date2.getFullYear();

    td7.innerHTML = currentStudent.membership.addLoan(
        new Loan(bookItem.name, date, date2)
    );


    row.append(td1);
    row.append(td2);
    row.append(td3);
    row.append(td4);
    row.append(td5);
    row.append(td6);
    row.append(td7);
    table2.append(row);
}

function showAccount() {
    let table1 = document.getElementById("account_info");
    let row = document.createElement("tr");
    let caption1 = document.createElement("td");

    let array = currentStudent.membership._loans.map(
        (n) =>
            "\r\n " +
            n.book +
            ", borrow date: " +
            n.startDate.getMonth() +
            "/" +
            n.startDate.getDate() +
            "/" +
            n.startDate.getFullYear() +
            ", due date: " +
            n.dueDate.getMonth() +
            "/" +
            n.dueDate.getDate() +
            "/" +
            n.dueDate.getFullYear() +
            ", total charge: $" +
            n.computeCharge(new Date()).toFixed(2)
    );
    console.log(array);

    caption1.innerHTML = "Borrowed Books: " + array;
    caption1.innerHTML = caption1.innerHTML.replace(/\n\r?/g, "<br />");

    row.append(caption1);

    table1.append(row);
}

let currentStudent;

let currentPassword;

function login() {
    let member = library.students.get(document.getElementById("student_name").value);
    let password = library.students.get(document.getElementById("member_password").value);
    let inputPassword = document.getElementById("member_password").value

    if (!member || inputPassword != member.password) {
        alert("Account not found. Try again!");
        return;
    }
    return window.location.href = "./index.html"
    currentStudent = member;
    currentPassword = password;
    // displayInfo();
    showAccount();
    return currentStudent;

}
function register() {
    students.set(
        prompt("Please enter your name: "),
        new Student(
            prompt("Please enter your name again: "),
            prompt("Please enter your password: "),
            new Membership(
                prompt("Are you a student or faculty: "),
                this.borrowedAmount
            )
        )
    );
}
function displayInfo() {
    document.getElementById("info").innerHTML = `[${currentStudent.membership._type} Account] Hi ${currentStudent.name}, you are having ${currentStudent.membership._borrowedAmount} borrowed books.`;
}
function borrowBook() {
    let date = new Date();
    let date2 = new Date();
    let dateStyle =
        date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
    date2.setDate(date2.getDate() + 7);
    let dateStyle2 =
        date2.getMonth() + 1 + "/" + date2.getDate() + "/" + date2.getFullYear();

    let rowLength = document.getElementById("shopping_cart").rows.length;
    let array2 = currentStudent.membership._loans.map(
        (n) =>
            "\r\n " +
            n.book +
            ", borrow date: " +
            dateStyle +
            ", due date: " +
            dateStyle2
    );
    if (document.getElementById("info").innerHTML.length > 0) {
        alert(
            `Thank you ${currentStudent.name}! you borrowed ${rowLength - 1} books.`
        );
        alert(array2);
    } else {
        alert(`Please log in to borrow books!`);
        return;
    }
}








// function pullInfo() {
//     let student = library.students.get(document.getElementById("student_name").value);
//     if (!student) {
//         alert("Not found");
//         return;
//     }

//     currentStudent = student;
//     displayInfo();
// }

// function displayInfo() {
//     document.getElementById("info").innerHTML = `Hi ${currentStudent.name}, your current balance is: ${currentStudent.memberId.balance} points.`;
// }

// function makePurchase() {
//     if (!currentStudent) {
//         alert("Please enter your name first.")
//         return;
//     }
//     let balance_before_purchase = currentStudent.memberId.balance;
//     for (let item of shoppingCart) {
//         try {
//             currentStudent.buyBookItem(item);
//         } catch (e) {
//             if (e instanceof ApplicationError) {
//                 alert("Insufficient balance");
//                 currentStudent.mealCard.balance = balance_before_purchase;
//                 return;
//             }
//         }
//     }

//     alert(`Thanks for the purchase, your remaining balance is ${currentStudent.memberId.balance}`)
//     displayInfo();
//     resetShoppingCart();
// }


function returnBook() {
    let chargeArr = currentStudent.membership._loans.map(
      (n) => +n.computeCharge(new Date()).toFixed(2)
    );
  
    let finalCharge = chargeArr.reduce((a, b) => a + b);
    if (finalCharge > 0) {
      alert(`Thank for returning books! Your total charge is $${finalCharge}`);
    } else alert(`Thank for returning books on time!`);
  }



function resetShoppingCart() {
    let table = document.getElementById('shopping_cart');
    let rows = document.querySelectorAll('#shopping_cart>tr')
    for (let i = rows.length; i > 0; i--) {
        table.deleteRow(i);
    }
    shoppingCart = [];
}