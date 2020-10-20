let shoppingCart = [];

function add(evt) {
    let bookItem = library.bookItems.get(evt.target.parentNode.value);
    shoppingCart.push(bookItem);
    updateShoppingCart(bookItem);
}

function updateShoppingCart(bookItem) {
    let table = document.getElementById("shopping_cart");
    let row = document.createElement("tr");
    let td1 = document.createElement("td");
    td1.innerHTML = bookItem.name;
    let td2 = document.createElement("td");
    td2.innerHTML = bookItem.ret_due_date;
    let td3 = document.createElement("td");
    td3.innerHTML = bookItem.isbn_num;
    row.append(td1);
    row.append(td2);
    row.append(td3);
    table.append(row);
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

}


function pullInfo() {
    let student = library.students.get(document.getElementById("student_name").value);
    if (!student) {
        alert("Not found");
        return;
    }

    currentStudent = student;
    displayInfo();
}

function displayInfo() {
    document.getElementById("info").innerHTML = `Hi ${currentStudent.name}, your current balance is: ${currentStudent.memberId.balance} points.`;
}

function makePurchase() {
    if (!currentStudent) {
        alert("Please enter your name first.")
        return;
    }
    let balance_before_purchase = currentStudent.memberId.balance;
    for (let item of shoppingCart) {
        try {
            currentStudent.buyBookItem(item);
        } catch (e) {
            if (e instanceof ApplicationError) {
                alert("Insufficient balance");
                currentStudent.mealCard.balance = balance_before_purchase;
                return;
            }
        }
    }

    alert(`Thanks for the purchase, your remaining balance is ${currentStudent.memberId.balance}`)
    displayInfo();
    resetShoppingCart();
}

function resetShoppingCart() {
    let table = document.getElementById('shopping_cart');
    let rows = document.querySelectorAll('#shopping_cart>tr')
    for (let i = rows.length; i > 0; i--) {
        table.deleteRow(i);
    }
    shoppingCart = [];
}