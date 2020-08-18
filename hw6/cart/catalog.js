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
        cell.classList.add('cartLine');
        
        if (i == -1) {                                        // добавим заголовок. этот кусок кода довольно костыльный, зато будет работать при добавлении полей
            for (var j in array[0]) {
                var deepCell = document.createElement('div'); 
                deepCell.classList.add(j, 'lineElement', 'cellTitle');
                deepCell.append(j);
                cell.appendChild(deepCell);
                listDiv.element.appendChild(cell);
            }
            var totalItemPrice = document.createElement('div'); 
            totalItemPrice.classList.add('totalItemPrice', 'lineElement', 'cellTitle');
            totalItemPrice.append('Total');
            cell.appendChild(totalItemPrice);
            listDiv.element.appendChild(cell);
        } else {
            for (var j in array[i]) {                         // обойдем каждый ключ элемента каталога
                if (j != 'amount') {                                // в корзине будем сразу использовать значение в инпуте
                    var deepCell = document.createElement('div');
                    deepCell.classList.add(j, 'lineElement');
                    if (j == 'name') {                                  // добавим картинку
                        var img = document.createElement('img');
                        img.src = 'img/'+catalog[i][j]+'.jpg';
                        img.height = "60";
                        img.width = "60";
                        img.classList.add('cartImg');
                        img.id = 'img '+catalog[i][j];
                        img.onclick = showBigImg;
                        deepCell.append(img);
                    }
                    deepCell.append(array[i][j]);
                    cell.appendChild(deepCell);
                }
            }
            var amountSelector = document.createElement('div');     // добавим блок выбора количества
            amountSelector.classList.add('amountSelector');

            var less = document.createElement('button');            // добавим кнопку уменьшения
            less.classList.add('less', 'selector', 'cartSelector');
            amountSelector.append(less);

            var amountCartInput = document.createElement('input');      // добавим инпут количества и его значение
            amountCartInput.type = 'number';
            amountCartInput.classList.add('amountInput');
            amountCartInput.id = array[i].name;
            amountCartInput.value = array[i].amount;
            amountCartInput.addEventListener('change', listenCartInput); // и почему эта хрень срабатывает на кнопке, а не на инпуте, куда я ее запихиваю????
            amountSelector.append(amountCartInput);

            var more = document.createElement('button');            // добавим кнопку увеличения
            more.classList.add('more', 'selector', 'cartSelector');
            amountSelector.append(more);

            cell.append(amountSelector);
            
            var totalItemPrice = document.createElement('div'); 
            totalItemPrice.classList.add('totalItemPrice', 'lineElement');
            totalItemPrice.append(array[i].price * array[i].amount);
            cell.appendChild(totalItemPrice);
            
            listDiv.element.appendChild(cell);
        }
        listDiv.element.appendChild(document.createElement('hr'));
    }
}


//отображение каталога
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
            amountSelector.classList.add('amountSelector', 'cellTitle', 'lineElement');
            amountSelector.append('countToBuy');
            
            cell.appendChild(amountSelector);
            catalogPage.element.appendChild(cell);
            
        } else {
            for (var j in catalog[i]) {                             // обойдем каждый ключ элемента каталога
                var deepCell = document.createElement('div');
                deepCell.classList.add(j, 'lineElement');
                if (j == 'name') {                                  // добавим картинку
                    var img = document.createElement('img');
                    img.src = 'img/'+catalog[i][j]+'.jpg';
                    img.height = "60";
                    img.width = "60";
                    img.classList.add('catalogImg');
                    img.id = 'img '+catalog[i][j];
                    img.onclick = showBigImg;
                    deepCell.append(img);
                }
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


// обрабатываем клик по картинке
function showBigImg(eventObj) {
    overlayOn();
    modalOn();
    imageToModal(eventObj);
//    imgHandler(getAllImgs(eventObj.target.parentElement.parentElement.parentElement.id), eventObj);
}

// создаем оверлей
function overlayOn() {
    var overlay = document.createElement('div');
    overlay.id = 'overlay';
    document.body.append(overlay);
}

// создаем подложку
function modalOn() {
    var modal = document.createElement('div');
    modal.id = 'modal';
    var left = document.createElement('button');
    left.id = 'left';
    left.classList.add('imgNav');
    left.onclick = imgHandler;
    var right = document.createElement('button');
    right.id = 'right';
    right.classList.add('imgNav');
    right.onclick = imgHandler;
    var close = document.createElement('button');
    close.id = 'close';
    close.append('Close');
    close.onclick = imgViewerClose;
    modal.append(left, right, close);
    document.body.append(modal);
}

// показать картинку поверх модального
function imageToModal(eventObj) {
    var placeForImg = document.getElementById('modal');
    var img = document.createElement('img');
    img.src = eventObj.srcElement.src;
//    console.log(eventObj.target.className.slice(0, -3));
    img.id = (eventObj.target.className);
    placeForImg.append(img);
}

// найдем все картинки
function getAllImgs(id) {
    var element = document.getElementById(id.slice(0, -3));
    var imgs = element.getElementsByClassName(id);
    var imgSrcs = [];
    for (var i = 0; i < imgs.length; i++) {
        imgSrcs.push(imgs[i].src);
    }
    return imgSrcs;
}

// соберем информацию и переключим картинки
function imgHandler(eventObj) {
    var direction = eventObj.target.id;                                                             // из объекта получим направление
    var currentSrc = eventObj.target.parentElement.getElementsByTagName('img')[0].src;              // получим текущую ссылку на изображение
    var id = eventObj.target.parentElement.getElementsByTagName('img')[0].id;          // получим место, откуда картинка была вызвана
    var imgSrcs = getAllImgs(id);                                                                   // получим массив ссылок
    var i = imgSrcs.indexOf(currentSrc);                                                           // получим индекс текущего изображения
    switchImg(id, direction, imgSrcs, i);
}

// переключалка картинок
function switchImg(id, direction, imgSrcs, i) {
    var img = document.getElementById(id);
    if (direction == 'left') {
        if (i == 0) {
            img.src = imgSrcs[imgSrcs.length - 1];
        } else {
            img.src = imgSrcs[--i];
        }
    } else if (direction == 'right') {
        if (i == (imgSrcs.length - 1)) {
            img.src = imgSrcs[0];
        } else {
            img.src = imgSrcs[++i];
        }
    }
}

// закрыть модалку и оверлей
function imgViewerClose() {
    document.getElementById('modal').outerHTML = "";
    document.getElementById('overlay').outerHTML = "";
}

// считаем общую сумму товаров в корзине
function countCartPrice(cartArray) {                                
    var cartSum = 0;
    for (var i = 0; i < cartArray.length; i++) {
        cartSum += cart[i].price * cart[i].amount;
    }
    return cartSum;
}

// считаем количество товаров в корзине
function countCartAmount(cartArray) {                               
    var cartAmount = 0;
    for (var i = 0; i < cartArray.length; i++) {
        cartAmount += cart[i].amount;
    }
    return cartAmount;                                              
}

// отрисовываем корзину
function cartRender(cart) {                                         
    document.getElementById('cart').innerHTML = '';                 // очищаем див корзины
    var cartPage = {};
    cartPage.element = document.getElementById('cart');
    var cartTitle = document.createElement('div');
    cartTitle.classList.add('title');
    cartTitle.append('Корзина');
    cartPage.element.appendChild(cartTitle);
    var cell = document.createElement('div');
    cell.classList.add('cart');
    if (cart.length < 1) {
        cell.append('Ваша корзина пуста');
    } else {
        listRender('cart', cart);
        cell.append('В корзине '+countCartAmount(cart)+ ' товаров на сумму ' +countCartPrice(cart)+ ' рублей.');
    }
    cell.classList.add('cartStatus');
    cartPage.element.appendChild(cell);
    // здесь могла бы быть кнопка оформления заказа
}

// убираем из каталога перенесенное в корзину
function decreaseCatalog(catalog, name, amount) {                   
    for (var i = 0; i < catalog.length; i++) {
        if (catalog[i].name == name) {
            if ((catalog[i].amount - amount) < 0) {
                alert('у нас так много нету');
                return false;
            } else {
                catalog[i].amount -= amount;
                break;
            }
        }
    }
    document.getElementById('catalog').innerHTML = '';
    catalogRender(catalog);
    return true;
}

// здесь будет функция обработки изменений инпутов в корзине
function listenCartInput(eventObj) {                                    
    var inputId = eventObj.target.id;                                   // значение name
    var inputValue = parseInt(document.getElementById(inputId).value, 10); // новое значение поля в input
    for (i = 0; i < cart.length; i++) {                                 // здесь мы найдем в корзине соответствующую запись
        if (cart[i].name == inputId) {
            if (inputValue < 0) {
                document.getElementById(inputId).value = cart[i].amount;
                alert('Вы можете добавить в корзину только положительное число');
                return;
            }
            var difValue = inputValue - cart[i].amount;                 // найдем разницу между старым и новым значением
            break;
        }
    }
    if (decreaseCatalog(catalog, inputId, difValue)) {
        cart[i].amount = inputValue;
        cartRender(cart);
    } else {
        document.getElementById(inputId).value = cart[i].amount;
    }
}

// добавляем в корзину товар из каталога
function addToCart(obj) {                                           
    var id = obj.target.id;      
    var itemName = catalog[id].name;
    var itemAmount = parseInt(document.getElementById('input'+id).value, 10);
    if ((itemAmount < 0) || isNaN(itemAmount)) {
        alert('Вы можете добавить в корзину только положительное число');
        return;
    } else if (itemAmount > catalog[id].amount) {
        alert('Введенное вами количество больше, чем осталось товара на складе');
        return;
    }
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

    cartRender(cart);                                               // рисуем корзину заново
}

// добавим веселую функцию обработки кликов на селекторы +/-
var amountSelectorEvents = function(catalog, cart, event) {                         
    return function (event) {
        if (event.target.classList.contains('cartSelector')) {                      // если клики происходят на селекторы в корзине, то все сложно
            var selectorId = event.target.parentElement.parentElement.querySelector('input').id;        // получаем id поля инпута, к которому привязаны селекторы
            if (event.target.classList.contains('more')) {                          // если клик на + в корзине
                for (var i = 0; i < catalog.length; i++) {                          // обойдем каталог, чтобы найти интересующий нас товар 
                    if (catalog[i].name == selectorId) {
                        if (catalog[i].amount > 0) {                                // проверим, если он не закончился, то добавим еще 
                             ++event.target.parentElement.querySelector('input').value; // увеличим значение на странице
                             ++cart[(event.target.parentElement.parentElement.id).split(' ')[1]].amount;    // увеличим значение в корзине
                            cartRender(cart)
                            decreaseCatalog(catalog, catalog[i].name, 1);           // уменьшим значение в каталоге
                            return;
                        } else if (catalog[i].amount <= 0) {                        // иначе сообщим, что действие невозможно
                            alert('Данный товар закончился на складе');
                            return;
                        }
                    }
                }
            } else if (event.target.classList.contains('less')) {                   // если кликаем на минус
                if (event.target.parentElement.querySelector('input').value < 1) {  // если значение в инпуте корзины менее единицы
                    alert('Вы не можете заказать отрицательное число');
                    return;
                } else if (event.target.parentElement.querySelector('input').value >= 1) {
                    --event.target.parentElement.querySelector('input').value;      // уменьшим значение на странице 
                    --cart[(event.target.parentElement.parentElement.id).split(' ')[1]].amount; // уменьшим значение в корзине
                    cartRender(cart)
                    for (var i = 0; i < catalog.length; i++) {
                        if (catalog[i].name == selectorId) {
                            decreaseCatalog(catalog, catalog[i].name, -1);           // увеличим значение в каталоге
                            return;
                        }
                    }
                }
            }
        } else {                                                                    // если клик происходит на селекторы в каталоге. (хотя, конечно, можно было бы сделать и для всех)
          if (event.target.classList.contains('more')) {
                  ++event.target.parentElement.querySelector('input').value;
          } else if (event.target.classList.contains('less')) {
              if (event.target.parentElement.querySelector('input').value > 0) {
                --event.target.parentElement.querySelector('input').value;
              } else {
                  alert('вы пытаетесь ввести некорректное число');
              }
          }
      }    
    }
}

document.addEventListener('click', amountSelectorEvents(catalog, cart, event));
cartRender(cart);
catalogRender(catalog);