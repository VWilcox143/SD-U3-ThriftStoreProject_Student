//? This array is not to be changed.
const salesTax = [
    {state: 'Alabama', tax: .04},
    {state: 'Alaska', tax: .00},
    {state: 'Arizona', tax: .056},
    {state: 'Arkansas', tax: .065},
    {state: 'California', tax: .0725},
    {state: 'Colorado', tax: .029},
    {state: 'Connecticut', tax: .0635},
    {state: 'Delaware', tax: .00},
    {state: 'DC', tax: .06},
    {state: 'Florida', tax: .06},
    {state: 'Georgia', tax: .04},
    {state: 'Hawaii', tax: .04166},
    {state: 'Idaho', tax: .06},
    {state: 'Illinois', tax: .0625},
    {state: 'Indiana', tax: .07},
    {state: 'Iowa', tax: .06},
    {state: 'Kansas', tax: .065},
    {state: 'Kentucky', tax: .06},
    {state: 'Louisiana', tax: .0445},
    {state: 'Maine', tax: .055},
    {state: 'Maryland', tax: .06},
    {state: 'Massachusetts', tax: .0625},
    {state: 'Michigan', tax: .06},
    {state: 'Minnesota', tax: .06875},
    {state: 'Mississippi', tax: .07},
    {state: 'Missouri', tax: .04225},
    {state: 'Montana', tax: .00},
    {state: 'Nebraska', tax: .055},
    {state: 'Nevada', tax: .0685},
    {state: 'New Hampshire', tax: .00},
    {state: 'New Jersey', tax: .06625},
    {state: 'New Mexico', tax: .05125},
    {state: 'New York', tax: .04},
    {state: 'North Carolina', tax: .0475},
    {state: 'North Dakota', tax: .05},
    {state: 'Ohio', tax: .0575},
    {state: 'Oklahoma', tax: .045},
    {state: 'Oregon', tax: .00},
    {state: 'Pennsylvania', tax: .06},
    {state: 'Rhode Island', tax: .07},
    {state: 'South Carolina', tax: .06},
    {state: 'South Dakota', tax: .06},
    {state: 'Tennessee', tax: .07},
    {state: 'Texas', tax: .0625},
    {state: 'Utah', tax: .061},
    {state: 'Vermont', tax: .06},
    {state: 'Virginia', tax: .053},
    {state: 'Washington', tax: .065},
    {state: 'West Virginia', tax: .06},
    {state: 'Wisconsin', tax: .05},
    {state: 'Wyoming', tax: .04},
];

//! Classes
class Store {
    constructor(state, name, city, taxRate) {
        this.state = state;
        this.name = name;
        this.city = city;
        this.taxRate = taxRate;
        this.inventory = [];
        this.profit = 0;
        this.balance = 200;
        this.expense = 0;
        this.taxPaid = 0;
    }
    static createStore(state, name, city) {
        const stateTax = salesTax.find(item => item.state === state);
        const taxRate = stateTax ? stateTax.tax : 0;
    
        return new Store(state, name, city, taxRate);
    }
    
    addToInventory(product, markup) {
        const itemExists = this.inventory.find(item => item.upc === product.upc);
            if (itemExists) {
            itemExists.quantity += product.quantity; 
            } else {
                const marketPrice = product.purchasePrice + (product.purchasePrice * markup);
                product.salePrice = marketPrice;
                this.inventory.push(product);
                this.balance -= product.purchasePrice * product.quantity;
                    }
    }


    sellItem(upc, quantity) {
        const item = this.inventory.find(item => item.upc === upc);
            if (!item) {
            return 'Item not found in inventory.';
            } 
        const salesTax = item.salePrice * this.taxRate;
        this.taxPaid += salesTax.toFixed(2);
        const totalPrice = item.salePrice + salesTax;
        this.balance += totalPrice * quantity;
        this.profit += (totalPrice - item.purchasePrice) * quantity;
        item.quantity -= quantity;
        return totalPrice * quantity;
    }
}

class Product {
    constructor(name, type, price, quantity) {
        this.name = name;
        this.type = type;
        this.purchasePrice = price;
        this.quantity = quantity;
        this.salePrice;
    }
}

class Kaleidoscope extends Product {
    constructor(name, type, price, salePrice, quantity) {
        super(name, type, price, salePrice, quantity);
        this.upc = 1
    }
}

class BeerStein extends Product {
    constructor(name, type, price, salePrice, quantity) {
        super(name, type, price, salePrice, quantity);
        this.upc = 2
    }
}

class TubeMan extends Product {
    constructor(name, type, price, salePrice, quantity) {
        super(name, type, price, salePrice, quantity);
        this.upc = 3
    }
}

class Instrument extends Product {
    constructor(name, type, price, salePrice, quantity) {
        super(name, type, price, salePrice, quantity);
        this.upc = 4
    }
}



//! CREATE STORES
// Generate 3 different stores, each in a different state.
const rockinWilly = Store.createStore('Vermont', 'Rocking Willy', 'Rutland');


const snoogins = Store.createStore('New Jersey', 'Snoogins', 'Redbank');


const boobooKittyFun = Store.createStore('California', 'Boobookittyfun', 'San Diego');


//! Inventory
let kaleidoscope = new Kaleidoscope('Kaleidoscope', 'toys', 1, 5, 5);
let stein1 = new BeerStein('Stein', 'kitchenware', 20, 1, 1);
let stein2 = new BeerStein('Stein', 'kitchenware', 20, 1, 1);
let stein3 = new BeerStein('Stein', 'kitchenware', 20, 1, 1);
let wackyWaving = new TubeMan('Herbert','party', 100, 1, 3);
let citar = new Instrument('Citar', 'musical_instrument', 60, 75, 1);
let harp = new Instrument('Harp', 'musical_instrument', 50, 100, 1);
//! Stocking

//* First Store
rockinWilly.addToInventory(stein2, .1);
rockinWilly.addToInventory(stein1, .1);
rockinWilly.addToInventory(stein3, .1);
rockinWilly.addToInventory(wackyWaving, .3);
rockinWilly.addToInventory(kaleidoscope, .4);

//* Second Store
snoogins.addToInventory(citar, .4);
snoogins.addToInventory(kaleidoscope, .4);
snoogins.addToInventory(wackyWaving, .3);

//* Third Store
boobooKittyFun.addToInventory(harp, .5);
boobooKittyFun.addToInventory(stein1, .1);
boobooKittyFun.addToInventory(wackyWaving, .3);

//! Selling

//* First Store
rockinWilly.sellItem(citar, .4);

//* Second Store
snoogins.sellItem(stein2, .1);
//* Third Store
boobooKittyFun.sellItem(kaleidoscope, .4);
//! Testing
console.log(rockinWilly);
console.log(snoogins);
console.log(boobooKittyFun);