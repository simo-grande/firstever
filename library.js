class ApplicationError extends Error { };

class Student {
    constructor(name, password, memberId) {
        this._name = name;
        this.password = password;
        this._memberId = memberId;

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

    get memberId() {
        return this._memberId;
    }

    set memberId(memberId) {
        this._memberId = memberId;
    }


    purchasePoints(points) {
        this.memberId.addPoints(points);
    }

    buyBookItem(bookItem) {
        if (this.memberId.balance >= bookItem.ret_due_date) {
            this.memberId.deductPoints(bookItem.ret_due_date);
        } else {
            throw new ApplicationError("Insufficient Balance.");
        }
    }
}

class MemberId {
    constructor(points = 100) {
        this._balance = points;
    }

    get balance() {
        return this._balance;
    }

    set balance(balance) {
        this._balance = balance;
    }

    addPoints(points) {
        return this.balance += points;
    }

    deductPoints(points) {
        return this.balance -= points;
    }
}

class BookItem {
    constructor(name, isbn_num, ret_due_date) {
        this.name = name;
        this.isbn_num = isbn_num;
        this.ret_due_date = ret_due_date;

    }
}


class Library {
    constructor(bookItems, students) {
        this.bookItems = bookItems;
        this.students = students;
    }

    addBookItem(newBookItem) {
        this.BookItems.set(newBookItem.name, newBookItem);
    }

    addStudent(newStudent) {
        this.students.set(newStudent.name, newStudent);
    }
}

// function membership(){
//     let membersarr = {};
//     let John = membersarr.push(new Student("John","abc123",new MemberId()));
//     let Jack = membersarr.push(new Student("Jack","abcabc",new MemberId()));
//     let simo = membersarr.push(new Student("simo","abc123",new MemberId()));
//     for()
// }



const bookItems = new Map();
bookItems.set("Book 1", new BookItem("A Smarter Way To Learn Javascript", "091-4568221199", "Nov-1-2020"));
bookItems.set("Book 2", new BookItem("A Smarter Way To Learn HTML & CSS", "078-3948274976", "Nov-1-2020"));
bookItems.set("Book 3", new BookItem("Automate The Boring Stuff With Python", "082-7402299356", "Nov-1-2020"));
bookItems.set("Book 4", new BookItem("The Alchemist", "082-7402299356", "Nov-1-2020"));

const students = new Map();
students.set("John", new Student("John", "abc123", new MemberId()));

const library = new Library(bookItems, students);
library.addStudent(new Student("Jack", "abcabc", new MemberId()));

// function main() {
//     const JOHN = Library.students.get("John");
//     JOHN.buyBookItem(Library.bookItems.get("pizza"));
//     JOHN.purchasePoints(50);
//     console.log(JOHN.memberId.balance);
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
//     console.log(JOHN.memberId.balance);

// }
// main();