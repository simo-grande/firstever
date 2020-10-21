class ApplicationError extends Error { }
class Member {
    constructor(name, password, membership) {
        this._name = name;
        this._password = password;
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
        this._account.addBooks(books);
    }
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
    constructor(bookName, authorName, isbn, chargePerDay = 0.5, maxCharge = 20) {
        this.bookName = bookName;
        this.authorName = authorName;
        this.isbn = isbn;
        this.chargePerDay = chargePerDay;
        this.maxCharge = maxCharge;
    }
}

class Loan extends BookItem {
    constructor(book, startDate, dueDate, chargePerDay, maxCharge, totalCharge) {
        super(chargePerDay, maxCharge);

        this.book = book;
        this.startDate = startDate;
        this.dueDate = dueDate;
        this.totalCharge = totalCharge;
    }

    computeCharge(returnDate) {
        if (returnDate > this.dueDate) {
            let durationInDays =
                Math.round(returnDate - this.dueDate) / (1000 * 60 * 60 * 24);
            let totalCharge = durationInDays * this.chargePerDay;
            return totalCharge > this.maxCharge ? this.maxCharge : totalCharge;
        } else return 0.0;
    }
}

class Library {
    constructor(bookItems, members) {
        this.bookItems = bookItems;
        this.members = members;
    }

    addBookItem(newBookItem) {
        this.bookItems.set(newBookItem.name, newBookItem);
    }
    addMember(newMember) {
        this.members.set(newMember.name, newMember);
    }
}

const bookItems = new Map();
bookItems.set(
    "javascript",
    new BookItem(
        "A Smarter Way To Learn Javascript",
        "Mark Myers",
        "978-1497408180",
        this.chargePerDay,
        this.startDate
    )
);
bookItems.set(
    "python",
    new BookItem(
        "Automate The Boring Stuff With Python",
        "Al Sweigart",
        "978-1593275990",
        this.chargePerDay,
        this.startDate
    )
);
bookItems.set(
    "html",
    new BookItem(
        "A Smarter Way To Learn HTML & CSS",
        "Mark Myers",
        "978-1508673873",
        this.chargePerDay,
        this.startDate
    )
);
bookItems.set(
    "ios",
    new BookItem(
        "Beginning IOS13 & Swift App Development",
        "Greg Lim",
        "978-1670294661",
        this.chargePerDay,
        this.startDate
    )
);

const loanBook = [
    new BookItem(
        "A Smarter Way To Learn Javascript",
        "Mark Myers",
        "978-1497408180",
        this.chargePerDay,
        this.startDate
    ),
    new BookItem(
        "Automate The Boring Stuff With Python",
        "Al Sweigart",
        "978-1593275990",
        this.chargePerDay,
        this.startDate
    ),
    new BookItem(
        "A Smarter Way To Learn HTML & CSS",
        "Mark Myers",
        "978-1508673873",
        this.chargePerDay,
        this.startDate
    ),
    new BookItem(
        "Beginning IOS13 & Swift App Development",
        "Greg Lim",
        "978-1670294661",
        this.chargePerDay,
        this.startDate
    ),
];

const members = new Map();
members.set(
    "John",
    new Member(
        "John",
        "abcabc",
        new Membership("Student", this.borrowedAmount, [
            new Loan(
                loanBook[0].bookName,
                new Date(2020, 08, 1),
                new Date(2020, 09, 2),
                this.totalCharge
            ),
            new Loan(
                loanBook[1].bookName,
                new Date(2020, 08, 1),
                new Date(2020, 09, 2),
                this.totalCharge
            ),
        ])
    )
);

members.set(
    "Jack",
    new Member("Jack", "defdef", new Membership("Faculty", this.borrowedAmount))
);

console.log(bookItems);
console.log(members);
const library = new Library(bookItems, members);