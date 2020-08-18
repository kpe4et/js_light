//  3. Товары в корзине хранятся в массиве. Задачи:
//  a) Организовать такой массив для хранения товаров в корзине;
//  b) Организовать функцию countBasketPrice, которая будет считать стоимость корзины.


// a

var cart = [5, 10, 25, 50];

// b

function countBasketPrice(cartArray) {
    var cartSum = 0;
    for (var i=0; i < cartArray.length; i++) {
        cartSum += cartArray[i];
    }
    return cartSum;
}

console.log(countBasketPrice(cart));