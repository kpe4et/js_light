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

var cart = [];


// отображение списка (пока только корзины)
function listRender(id, array) {                            // пока отдельно запишу функцию для перерисовки корзины, может, придумаю как унифицировать
    var listDiv = {};
    
    
    for (var i=-1; i < array.length; i++) {
        listDiv.element = document.getElementById(id);
        var cell = document.createElement('div');
        cell.setAttribute('id', 'cart '+i);
        cell.classList.add('catalogLine');
        
        if (i == -1) {                                        // добавим заголовок. этот кусок кода довольно костыльный, зато будет работать при добавлении полей
            for (var j in array[0]) {
                var deepCell = document.createElement('div'); 
                deepCell.classList.add(j, 'lineElement', 'cellTitle');
                deepCell.append(j);
                cell.appendChild(deepCell);
                listDiv.element.appendChild(cell);
            }
        } else {
            for (var j in array[i]) {                         // обойдем каждый ключ элемента каталога
                if (j != 'amount') {                                // в корзине будем сразу использовать значение в инпуте
                    var deepCell = document.createElement('div');
                    deepCell.classList.add(j, 'lineElement');
                    deepCell.append(array[i][j]);
                    cell.appendChild(deepCell);
                }
            }
            var amountSelector = document.createElement('div');     // добавим блок выбора количества
            amountSelector.classList.add('amountSelector');

            var less = document.createElement('button');            // добавим кнопку уменьшения
            less.classList.add('less', 'selector', 'cartSelector');
            amountSelector.append(less);

            var amountInput = document.createElement('input');      // добавим инпут количества и его значение
            amountInput.type = 'number';
            amountInput.classList.add('amountInput');
            amountInput.id = 'input'+i;
            amountInput.value = array[i].amount;
            amountSelector.append(amountInput);

            var more = document.createElement('button');            // добавим кнопку увеличения
            more.classList.add('more', 'selector', 'cartSelector');
            amountSelector.append(more);

            cell.append(amountSelector);

            listDiv.element.appendChild(cell);
        }
        listDiv.element.appendChild(document.createElement('hr'));
    }
}


//отображение каталога (если успею, постараюсь переиспользовать функцию для корзины)
function catalogRender(catalog) {
    var catalogPage = {}; 
    catalogPage.element = document.getElementById('catalog');
    var catalogTitle = document.createElement('div');
    catalogTitle.classList.add('title');
    catalogTitle.append('Каталог');
    catalogPage.element.appendChild(catalogTitle);
    
    for (var i = -1; i < catalog.length; i++) {          // обойдем каждый элемент каталога
        catalogPage.element = document.getElementById('catalog'); 
        var cell = document.createElement('div');
        cell.setAttribute('id', 'product '+i);
        cell.classList.add('catalogLine');
        
        if (i == -1) {                                  // добавим заголовок. этот кусок кода довольно костыльный, зато будет работать при добавлении полей
            for (var j in catalog[0]) {
                var deepCell = document.createElement('div'); 
                deepCell.classList.add(j, 'lineElement', 'cellTitle');
                deepCell.append(j);
                cell.appendChild(deepCell);
            }
            var amountSelector = document.createElement('div');      // добавим заголовок к выбору количества
            amountSelector.classList.add('amountSelector', 'cellTitle');
            amountSelector.append('countToBuy');
            
            cell.appendChild(amountSelector);
            catalogPage.element.appendChild(cell);
            
        } else {
            for (var j in catalog[i]) {                             // обойдем каждый ключ элемента каталога
                var deepCell = document.createElement('div');
                deepCell.classList.add(j, 'lineElement');
                deepCell.append(catalog[i][j]);
                cell.appendChild(deepCell);
            }
            
        
            var amountSelector = document.createElement('div');     // добавим блок выбора количества
            amountSelector.classList.add('amountSelector');

            var less = document.createElement('button');            // добавим кнопку уменьшения
            less.classList.add('less', 'selector');
            amountSelector.append(less);

            var amountInput = document.createElement('input');      // добавим инпут количества
            amountInput.type = 'number';
            amountInput.classList.add('amountInput');
            amountInput.id = 'input'+i;
            amountSelector.append(amountInput);

            var more = document.createElement('button');            // добавим кнопку увеличения
            more.classList.add('more', 'selector');
            amountSelector.append(more);

            var buyButton = document.createElement('button');       // добавим кнопку добавления в корзину
            buyButton.classList.add('buyButton');
            buyButton.id = i;
            buyButton.append('Add To Cart');
            buyButton.addEventListener('click', addToCart);
            amountSelector.append(buyButton);
            
            cell.append(amountSelector);
            
            catalogPage.element.appendChild(cell);
            
        }
        catalogPage.element.appendChild(document.createElement('hr'));
    }
}

document.addEventListener('click', function (e) {                   // написал не сам, но код в целом понятен, просто дефолтные кнопки +/- совсем не нравятся
  if (e.target.classList.contains("more")) {
    ++e.target.parentElement.querySelector("input").value;
  } else if (e.target.classList.contains("less")) {
    --e.target.parentElement.querySelector("input").value;
  }
})


function countCartPrice(cartArray) {                                // считаем общую сумму товаров в корзине
    var cartSum = 0;
    for (var i = 0; i < cartArray.length; i++) {
        cartSum += cart[i].price * cart[i].amount;
    }
    return cartSum;
}

function countCartAmount(cartArray) {                               // считаем количество товаров в корзине
    var cartAmount = 0;
    for (var i = 0; i < cartArray.length; i++) {
        cartAmount += cart[i].amount;
    }
    return cartAmount;                                              // почему ответ начинается с нуля??? надо отдебажить
}

function cartRender(cart) {                                         // отрисовываем корзину
    var cartPage = {};
    cartPage.element = document.getElementById('cart');
    var cartTitle = document.createElement('div');
    cartTitle.classList.add('title');
    cartTitle.append('Корзина');
    cartPage.element.appendChild(cartTitle);
    var cell = document.createElement('div');
    cell.classList.add('cart');
    listRender('cart', cart);
    if (cart.length < 1) {
        cell.append('Ваша корзина пуста');
    } else {
        cell.append('В корзине '+countCartAmount(cart)+ ' товаров на сумму ' +countCartPrice(cart)+ ' рублей.');
    }
    cell.classList.add('cartStatus');
    cartPage.element.appendChild(cell);
    // здесь могла бы быть кнопка оформления заказа
}

function decreaseCatalog(catalog, name, amount) {
    for (var i = 0; i < catalog.length; i++) {
        if (catalog[i].name == name) {
            catalog[i].amount -= amount;
        }
    }
}

function addToCart(obj) {                                           // добавляем в корзину товар из каталога
    var id = obj.target.id;      
    var itemName = catalog[id].name;
    var itemAmount = parseInt(document.getElementById('input'+id).value, 10);
    
    if (cart.length == 0) {                                         // если корзина пуста
        var itemPrice = catalog[id].price;
        cart.push({name: itemName, price: itemPrice, amount: itemAmount});
        
    } else {                                                        // если в корзине что-то есть, нужно  по ней пробежаться или все же изменить структуру корзины на объект
        var needToAdd = true;
        var i = 0;
        
        while (needToAdd) {
            if (i >= cart.length) {
                var itemPrice = catalog[id].price;
                cart.push({name: itemName, price: itemPrice, amount: itemAmount});
                needToAdd = false;
            } else if (itemName == cart[i].name) {
                cart[i].amount = cart[i].amount + itemAmount;
                needToAdd = false;
            }
            i++;
        }
        
    } 
    decreaseCatalog(catalog, itemName, itemAmount);
    document.getElementById('catalog').innerHTML = '';
    document.getElementById('cart').innerHTML = '';                 // очищаем див корзины
    cartRender(cart);                                               // рисуем корзину заново
    catalogRender(catalog);
}




cartRender(cart);
catalogRender(catalog);



//function increaseCatalog(catalog, name, amount) {                   // возвращаем в каталог из корзины
//    for (var i = 0; i < catalog.length; i++) {
//        if (catalog[i].name == name) {
//            catalog[i].amount += amount;
//        }
//    }
//    document.getElementById('catalog').innerHTML = '';
//    catalogRender(catalog);
//}

//function listenCartInput(eventObj) {                               // здесь будет функция обработки изменений инпутов в корзине
//    console.log(id, value, 'слухаем инпут')
//    for (i = 0; i < cart.length; i++) {                             // здесь мы найдем в корзине соответствующую запись
//        if (cart[i].name == id) {
//            var difValue = cart[i].amount - value;                  // посчитаем, насколько изменилось это значение
//            cart[i].amount = value;                                 // изменим значение в корзине
//            break;
//        }
//    }   
//}