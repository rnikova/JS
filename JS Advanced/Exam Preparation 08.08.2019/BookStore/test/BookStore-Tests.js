const { expect } = require('chai');
const { beforeEach } = require('mocha');
const BookStore = require('../02. Book Store_Ресурси.js');

describe('BookStore tests', function () {
    let store;
    beforeEach(function () {
        store = new BookStore('Test');
    });

    describe('constructor', function () {
        it('should initialize correctly', function () {
            expect(store.name).to.equal('Test');
            expect(store.books).to.deep.equal([]);
            expect(store.workers).to.deep.equal([]);
        })
    });

    describe('stockBooks()', function () {
        it('should push corect item', function () {
            const expectedBook = {
                title = 'book1',
                author = 'author1'
            };
            store.stockBooks(['book1-author1']);
            expect(store.books.length).to.equal(1);
            expect(store.books[0]).to.deep.equal(expectedBook);
        });
    });

    describe('hire()', function () {
        it('should throw error', function () {
            store.hire('Name', 'Position');
            const hire = () => store.hire('Name', 'Position');

            expect(hire).to.throw(Error, 'This person is our employee');
        });
        it('should hire a person', function(){
            let worker = {
                name: "Name",
                position: "Position",
                booksSold: 0
            };

            let message = store.hire(worker);

            expect(store.workers.length).to.equal(1);
            expect(message).to.equal(`Name started work at Test as Position`);
            expect(store.workers[0]).to.deep.equal(worker);
        });
    });

    describe('fire()', function () {
        it('should throw error', function () {
            store.fire('Name');
            const fire = () => store.fire('Name');

            expect(fire).to.throw(Error, `Name doesn't work here`);
        });
        it('should fire a person', function(){
            store.hire('Name', 'Position');
            let message = store.fire('Name');

            expect(store.workers.length).to.equal(0);
            expect(message).to.equal(`Name is fired`);
        });
    });

    describe('sellBook()', function () {
        it('should throw error - book is not found', function () {
            const sellBook = () => store.sellBook('Book', 'Worker');

            expect(sellBook).to.throw(Error, 'This book is out of stock');
        });
        it('should throw error - worker is not found', function () {
            store.stockBooks(['Book'-'Author']);
            const sellBook = () => store.sellBook('Book', 'Worker');

            expect(sellBook).to.throw(Error, 'Worker is not working here');
        });
        it('should sell book correctly', function(){
            store.stockBooks(['Book'-'Author']);
            store.hire('Name', 'Position');
            store.sellBook('Book', 'Name');

            expect(store.workers[0].booksSold).to.equal(1);
            expect(store.books.length).to.equal(0);
        });
    });
    describe('print', function(){
        it('should print correctly', function(){
            store.hire('Name', 'Position');
            let message = store.printWorkers();

            expect(message).to.equal('Name:Name Position:Position BooksSold:0')
        })
    });
});