var cart = {
    vegetables: {
        potato: 45,
        tomato: 250,
        carrot: 20,
        cucumber: 180, 
    },
    fruits: {
        cherry: 220, 
        strawberry: 300,
        peach: 200,
        orange: 90,
        apple: 200,
    },
    meat: {
        pork: 400, 
        chicken: 200, 
        Beef: 550,
        Turkey: 300,
        Rabbit: 500,
        Duck: 300.
    }
}

// b

function countBasketPrice(cartArray) {
    var cartSum = 0;
    for (var i in cart) {
        for (var j in cart[i]) {
        cartSum += cartArray[i][j];
        }
    }
    return cartSum;
}

console.log(countBasketPrice(cart));