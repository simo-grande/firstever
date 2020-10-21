class ApplicationError extends Error { };

class Student {
    constructor(name, password, membership) {
        this._name = name;
        this.password = password;
        this._membership = membership;

    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }
    get password() {
        return this._password;
    }
    set password(password) {
        this._password = password;
    }

    get membership() {
        return this._membership;
    }

    set membership(membership) {
        this._membership = membership;
    }


    borrowBook(books) {
        this.account.addBooks(books);
    }

    // buyBookItem(bookItem) {
    //     if (this.membership.balance >= bookItem.ret_due_date) {
    //         this.membership.deductPoints(bookItem.ret_due_date);
    //     } else {
    //         throw new ApplicationError("Insufficient Balance.");
    //     }
    // }
}

class Membership {
    constructor(type, borrowedAmount, loans = []) {
        this._type = type;
        this._borrowedAmount = loans.length;
        this._loans = loans;
    }

    get borrowedAmount() {
        return this._borrowedAmount;
    }

    set borrowedBooks(borrowedAmount) {
        this._borrowedAmount = borrowedAmount;
    }

    addLoan(loan) {
        this._loans.push(loan);
    }


}

class BookItem {
    constructor(name, authorName, isbn_num, chargePerDay = 0.5, maxCharge = 20) {
        this.name = name;
        this.authorName = authorName;
        this.isbn_num = isbn_num;
        // this.ret_due_date = ret_due_date;
        this.chargePerDay = chargePerDay;
        this.maxCharge = maxCharge;
    }
}

class Loan {
    constructor(book, startDate, dueDate, totalCharge) {
        this.book = book;
        this.startDate = startDate;
        this.dueDate = dueDate;
        this.totalCharge = totalCharge;
    }

    computeCharge(returnDate) {
        if (returnDate > this.dueDate) {
            let durationInDays =
                Math.round(returnDate - this.dueDate) / (1000 * 60 * 60 * 24);
            let totalCharge = durationInDays * 0.5;
            return totalCharge > 20 ? 20 : totalCharge;
        } else return 0.0;
    }
}

class Library {
    constructor(bookItems, students) {
        this.bookItems = bookItems;
        this.students = students;
    }

    addBookItem(newBookItem) {
        this.bookItems.set(newBookItem.name, newBookItem);
    }

    addStudent(newStudent) {
        this.students.set(newStudent.name, newStudent);
    }
}

// function membership(){
//     let membersarr = {};
//     let John = membersarr.push(new Student("John","abc123",new membership()));
//     let Jack = membersarr.push(new Student("Jack","abcabc",new membership()));
//     let simo = membersarr.push(new Student("simo","abc123",new membership()));
//     for()
// }



const bookItems = new Map();
bookItems.set("Book 1", new BookItem("A Smarter Way To Learn Javascript", "Mark Myers", "091-4568221199", this.chargePerDay, this.startDate));
bookItems.set("Book 2", new BookItem("A Smarter Way To Learn HTML & CSS", "Mark Myers", "078-3948274976", this.chargePerDay, this.startDate));
bookItems.set("Book 3", new BookItem("Automate The Boring Stuff With Python", "Al Sweigart", "082-7402299356", this.chargePerDay, this.startDate));
bookItems.set("Book 4", new BookItem("The Alchemist", "082-7402299356", "Paulo Coelho", this.chargePerDay, this.startDate));


const loanBook = [new BookItem("A Smarter Way To Learn Javascript", "Mark Myers", "091-4568221199", this.chargePerDay, this.startDate),
new BookItem("A Smarter Way To Learn HTML & CSS", "Mark Myers", "078-3948274976", this.chargePerDay, this.startDate),
new BookItem("Automate The Boring Stuff With Python", "Al Sweigart", "082-7402299356", this.chargePerDay, this.startDate),
new BookItem("The Alchemist", "Paulo Coelho", "082-7402299356", this.chargePerDay, this.startDate),];


const students = new Map();
students.set("John", new Student("John", "abc123", new Membership("Student", this.borrowedAmount, [new Loan(loanBook[0].bookName, new Date(2020, 08, 1), new Date(2020, 09, 2), this.totalCharge), new Loan(loanBook[1].bookName, new Date(2020, 08, 1), new Date(2020, 09, 2), this.totalCharge)])));

students.set("Jack", new Student("Jack", "abcabc", new Membership("Faculty", this.borrowedAmount)));
const library = new Library(bookItems, students);
//library.addStudent(new Student("Jack", "abcabc", new Membership()));





// function main() {
//     const JOHN = Library.students.get("John");
//     JOHN.buyBookItem(Library.bookItems.get("pizza"));
//     JOHN.purchasePoints(50);
//     console.log(JOHN.membership.balance);
//     try {
//         for (let i = 0; i < 10; i++) {
//             JOHN.buyBookItem(Library.bookItems.get("pizza"));
//         }
//     } catch (e) {
//         if (e instanceof ApplicationError) {
//             console.log(e.message);
//         } else {
//             throw e;
//         }
//     }
//     console.log(JOHN.membership.balance);

// }
// main();