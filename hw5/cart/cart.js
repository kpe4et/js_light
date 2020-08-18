//каталог продуктов 
var catalog = [
        {name: 'potato', price: 45, amount: 1000},
        {name: 'tomato', price: 250, amount: 1000},
        {name: 'carrot', price: 20,amount: 1000},
        {name: 'cucumber', price: 180,amount: 1000}, 
        {name: 'cherry', price: 220,amount: 1000}, 
        {name: 'strawberry', price: 300,amount: 1000},
        {name: 'peach', price: 200,amount: 1000},
        {name: 'orange', price: 90,amount: 1000},
        {name: 'apple', price: 200,amount: 1000},
        {name: 'pork', price: 400,amount: 1000}, 
        {name: 'chicken', price: 200,amount: 1000}, 
        {name: 'beef', price: 550,amount: 1000},
        {name: 'turkey', price: 300,amount: 1000},
        {name: 'rabbit', price: 500,amount: 1000},
        {name: 'duck', price: 300, amount: 1000},
];
 
var cart = [{name: 'potato', price: 45, amount: 3},{name: 'rabbit', price: 500,amount: 7} ];

//var cart = [];

function countCartPrice(cartArray) {
    var cartSum = 0;
    for (var i = 0; i < cartArray.length; i++) {
        cartSum += cart[i].price * cart[i].amount;
    }
    return cartSum;
}

function countCartAmount(cartArray) {
    var cartAmount = 0;
    for (var i = 0; i < cartArray.length; i++) {
        cartAmount += cart[i].amount;
    }
    return cartAmount;
}

function cartRender(cart) {
    var cartPage = {};
    cartPage.element = document.getElementById('cart');
    var cell = document.createElement('div');
    if (cart.length < 1) {
        cell.append('Ваша корзина пуста');
    } else {
        cell.append('В корзине '+countCartAmount(cart)+ ' товаров на сумму ' +countCartPrice(cart)+ ' рублей.');
    }
    cartPage.element.appendChild(cell);
}

cartRender(cart);

