//каталог продуктов 
var catalog = {
    0:    ['name', 'price', 'amount'],
    1:    {name: 'potato',   price: 45, amount: 1000},
    2:    {name: 'tomato',   price: 250, amount: 1000},
    3:    {name: 'carrot',   price: 20, amount: 1000},
    4:    {name: 'cucumber', price: 180, amount: 1000}, 
    5:    {name: 'cherry',   price: 220, amount: 1000}, 
    6:    {name: 'strawberry', price: 300, amount: 1000},
    7:    {name: 'peach',    price: 200, amount: 1000},
    8:    {name: 'orange',   price: 90, amount: 1000},
    9:    {name: 'apple',    price: 200, amount: 1000},
    10:   {name: 'pork',     price: 400, amount: 1000}, 
    11:   {name: 'chicken',  price: 200, amount: 1000}, 
    12:   {name: 'beef', price: 550, amount: 1000},
    13:   {name: 'turkey',   price: 300, amount: 1000},
    14:   {name: 'rabbit',   price: 500, amount: 1000},
    15:   {name: 'duck', price: 300, amount: 1000},
}; 

var cart = {};

// отображение списков
    function listRender(id, catalog, cart) {
        var listDiv = {};
        listDiv.element = document.getElementById(id);
        document.getElementById(id).innerHTML = '';         // очистим то, что было
        var listTitle = document.createElement('div');      // отрисуем основной заголовок
        listTitle.classList.add('title');
        if (cart == undefined) {                            // данная проверка будет встречаться не единожды, сделано для унификации функции, для отрисовки как каталога, так и корзины
            listTitle.append('Каталог');
        } else {
            listTitle.append('Корзина');
        }
        listDiv.element.appendChild(listTitle);
        
        var titleLine = document.createElement('div');      // отрисуем заголовки таблицы
        titleLine.classList.add(id + 'Line');
        for (var i=0; i<catalog[0].length; i++) {
            var listSubtitle = document.createElement('div'); 
            listSubtitle.classList.add(catalog[0][i], 'lineElement', 'cellTitle');   
            listSubtitle.append(catalog[0][i]);
            titleLine.appendChild(listSubtitle);
        }
        
// дополнительные поля списков
        if (cart == undefined) {                            // дополнительные поля для каталога
            var amountSelector = document.createElement('div');
            amountSelector.classList.add('amountSelector', 'cellTitle');
            amountSelector.append('countToBuy');
            titleLine.appendChild(amountSelector);
        } else {                                            // дополнительные поля для корзины
            var totalItemPrice = document.createElement('div'); 
            totalItemPrice.classList.add('totalItemPrice', 'lineElement', 'cellTitle');
            totalItemPrice.append('Total');
            
            var free = document.createElement('div');
            free.classList.add('free');
            
            titleLine.appendChild(totalItemPrice);
            titleLine.appendChild(free);
        }
        
        listDiv.element.appendChild(titleLine);
        
// попытка унифицировать функцию для отрисовки корзины или каталога.
        var arrayToRender = [];
        var amountToRender = Number;
        if (id == 'catalog') {                                        // если отрисовываем каталог, то берем массив из ключей каталога 
            arrayToRender = Object.keys(catalog);
            arrayToRender.splice(arrayToRender.indexOf('0'), 1);
        } else {                                                        // если отрисовываем корзину, то берем массив из ключей корзины
            arrayToRender = Object.keys(cart);
        }
        
        for (var i = 0; i < arrayToRender.length; i++) {                // пройдемся по списку на добавление
            listDiv.element = document.getElementById(id);
            var cell = document.createElement('div');
            cell.classList.add(id+'Line');
            cell.dataset.id = i;
            for (k in catalog[arrayToRender[i]]) {                      // в каждом ключе-объекте перебираем ключи 
                if (!(id == 'cart' && k == 'amount')) {            // пропускаем 'amount' для корзины, он будет в инпуте
                    var deepCell = document.createElement('div');
                    deepCell.classList.add(k, 'lineElement');
                    if (k == 'name') {                                  // добавим картинку
                        var img = document.createElement('img');
                        img.src = 'img/'+catalog[arrayToRender[i]].name+'.jpg';
                        img.height = "60";
                        img.width = "60";
                        img.classList.add(id+'Img');
                        img.id = 'img '+catalog[arrayToRender[i]].name;
                        img.onclick = showBigImg;                         // после того, как перепишу обработку картинок
                        deepCell.append(img);
                        img.dataset.id = arrayToRender[i];
                        img.dataset.src = id;
                    }
                    deepCell.append(catalog[arrayToRender[i]][k]);
                } 
                cell.appendChild(deepCell);
            }
            
// здесь будем отрисовывать дополнительные кнопки, инпуты и т д
            var amountSelector = document.createElement('div');     // добавим блок выбора количества
            amountSelector.classList.add('amountSelector');

            var less = document.createElement('button');            // добавим кнопку уменьшения
            less.classList.add('less', id+'Selector');
            amountSelector.append(less);

            var amountInput = document.createElement('input');      // добавим инпут количества
            amountInput.type = 'number';
            amountInput.classList.add('amountInput');
            amountInput.dataset.id = arrayToRender[i];
            if (id == 'cart') {
                amountInput.value = cart[arrayToRender[i]];
                amountInput.addEventListener('change', listenCartInput);
            }
            amountSelector.append(amountInput);

            var more = document.createElement('button');            // добавим кнопку увеличения
            more.classList.add('more', id+'Selector');
            amountSelector.append(more);

            if (id == 'catalog') {
                var buyButton = document.createElement('button');       // добавим кнопку добавления в корзину
                buyButton.classList.add('buyButton');
                buyButton.dataset.id = arrayToRender[i];
                buyButton.append('Add To Cart');
                buyButton.addEventListener('click', addToCartWithButton);
                amountSelector.append(buyButton);
                cell.append(amountSelector);
            } else {
                cell.append(amountSelector);
                var totalItemPrice = document.createElement('div'); 
                totalItemPrice.classList.add('totalItemPrice', 'lineElement');
                totalItemPrice.append(catalog[arrayToRender[i]].price * cart[arrayToRender[i]]);
                cell.appendChild(totalItemPrice);

                var removeFromCart = document.createElement('button');
                removeFromCart.append('Remove');
                removeFromCart.classList.add('remove');
                removeFromCart.dataset.id = arrayToRender[i];
                removeFromCart.addEventListener('click', removeItem);
                cell.appendChild(removeFromCart);
            }
            listDiv.element.appendChild(cell);
            listDiv.element.appendChild(document.createElement('hr'));
        }
        // добавим количество товара или пустоту в корзину, а также кнопку покупки
        if (id == 'cart') {
            var cartStatus = document.createElement('div');
            cartStatus.classList.add('cartStatus');
            if (Object.keys(cart).length < 1) {
                cartStatus.append('Ваша корзина пуста');
            } else {
                cartStatus.append('В корзине '+countCartAmount(cart)+ ' товаров на сумму ' +countCartPrice(cart)+ ' рублей.');

                var purchaseButton = document.createElement('button');  // кнопка типа вызова диалога оплаты
                purchaseButton.classList.add('purchaseButton');
                purchaseButton.append('Show me the money');
                purchaseButton.addEventListener('click', purchase(cart));  // на самом деле очистим localStorage и корзину
                cartStatus.append(purchaseButton);
            }
            listDiv.element.appendChild(cartStatus);
        }
    }

// обрабатываем клик по картинке
function showBigImg(eventObj) {
    overlayOn();
    modalOn();
    imageToModal(eventObj);
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
    img.dataset.src = eventObj.target.dataset.src;
    img.id = eventObj.srcElement.id;
    placeForImg.append(img);
}

// найдем все картинки
function getAllImgs(id) {
    var element = document.getElementById(id);
    var imgs = element.getElementsByTagName('img');
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
    var id = eventObj.target.parentElement.getElementsByTagName('img')[0].dataset.src;                                                                    // получим место, откуда картинка была вызвана
    var imgSrcs = getAllImgs(id);                                                                   // получим массив ссылок
    var i = imgSrcs.indexOf(currentSrc);                                                            // получим индекс текущего изображения
    eventObj.target.parentElement.getElementsByTagName('img')[0].src = switchImg(id, direction, imgSrcs, i);
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
    return img.src;
}

// закрыть модалку и оверлей
function imgViewerClose() {
    document.getElementById('modal').outerHTML = "";
    document.getElementById('overlay').outerHTML = "";
}

// считаем общую сумму товаров в корзине
function countCartPrice(cart) {                                
    var cartSum = 0;
    for (k in cart) {
        cartSum += catalog[k].price * cart[k];
    }
    return cartSum;
}

// считаем количество товаров в корзине
function countCartAmount(cart) {                               
    var cartAmount = 0;
    for (k in cart) {
        cartAmount += cart[k];
    }
    return cartAmount;                                             
}


// убираем из каталога перенесенное в корзину
function decreaseCatalog(catalog, id, amount) { 
    if (catalog[id].amount - amount < 0) {
        alert('у нас так много нету');
        return false;
    } else {
        catalog[id].amount -= amount;
        document.getElementById('catalog').innerHTML = '';
        listRender('catalog', catalog);
        return true;
    }
}

// здесь будет функция обработки изменений инпутов в корзине
function listenCartInput(eventObj) { 
    var inputId = eventObj.target.dataset.id;                                   // значение name
    var inputValue = eventObj.target.parentElement.getElementsByTagName('input')[0].valueAsNumber; // новое значение поля в input
    if (inputValue < 0) {
        document.getElementById(inputId).value = cart[i].amount;
        alert('Вы можете добавить в корзину только положительное число');
        return;
    } else {
        var difValue = inputValue - cart[inputId];                 // найдем разницу между старым и новым значением
    }
    if (decreaseCatalog(catalog, inputId, difValue)) {
        cart[inputId] = inputValue;
        listRender('cart', catalog, cart);
        localStorageSet(cart);
    } else {
        eventObj.target.parentElement.getElementsByTagName('input')[0].valueAsNumber = cart[inputId];
    }
}

//обработка клика по кнопке
function addToCartWithButton(obj) {
    var id = obj.target.dataset.id;
    var itemAmount = obj.target.parentElement.getElementsByTagName('input')[0].valueAsNumber;
    addToCart(itemAmount, id);
}

// добавляем в корзину товар из каталога или localStorage
function addToCart(itemAmount, id) {
    if ((itemAmount < 0) || isNaN(itemAmount)) {
        alert('Вы можете добавить в корзину только положительное число');
        return;
    } else if (itemAmount > catalog[id].amount) {
        alert('Введенное вами количество больше, чем осталось товара на складе');
        return;
    }
    if (id in cart) {                                         // если продукт уже был в корзине, то обновим количество
        cart[id] += itemAmount;
    } else {                                                        // иначе добавим продукт
        cart[id] = itemAmount;
    } 
    decreaseCatalog(catalog, id, itemAmount);
    listRender('cart', catalog, cart);                                               // рисуем корзину заново
    localStorageSet(cart);
}

// добавим веселую функцию обработки кликов на селекторы +/-
var amountSelectorEvents = function(catalog, cart, event) {
    return function (event) {
        if (event.target.classList.contains('cartSelector')) {                      // если клики происходят на селекторы в корзине, то все сложно
            var selectorId = event.target.parentElement.querySelector('input').dataset.id;      // получаем id поля инпута, к которому привязаны селекторы
            if (event.target.classList.contains('more')) {                          // если клик на + в корзине
                if (catalog[selectorId].amount > 0) {                               // проверим, если он не закончился, то добавим еще 
                     ++event.target.parentElement.querySelector('input').value;     // увеличим значение на странице
                     ++cart[selectorId];                                            // увеличим значение в корзине
                    listRender('cart', catalog, cart);
                    decreaseCatalog(catalog, selectorId, 1);                        // уменьшим значение в каталоге
                    localStorageSet(cart);
                    return;
                } else if (catalog[selectorId].amount <= 0) {                        // иначе сообщим, что действие невозможно
                    alert('Данный товар закончился на складе');
                    return;
                }
            } else if (event.target.classList.contains('less')) {                   // если кликаем на минус
                if (event.target.parentElement.querySelector('input').value < 1) {  // если значение в инпуте корзины менее единицы
                    alert('Вы не можете заказать отрицательное число');
                    return;
                } else if (event.target.parentElement.querySelector('input').value >= 1) {
                    --event.target.parentElement.querySelector('input').value;      // уменьшим значение на странице 
                    --cart[selectorId];                                      // уменьшим значение в корзине
                    localStorageSet(cart);
                    listRender('cart', catalog, cart);
                    decreaseCatalog(catalog, selectorId, -1);
                    return;
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

// удаление товара из корзины при клике на кнопку
function removeItem(eventObj) {
    var amount = cart[eventObj.target.dataset.id];
    var id = eventObj.target.dataset.id;
    decreaseCatalog(catalog, id, -amount);
    delete cart[id];
    listRender('cart', catalog, cart);
}


// заполнение localStorage
function localStorageSet(cart) {
    localStorage.setItem('cart',JSON.stringify(cart));        
}

// имитация покупки, очистка localStorage и корзины (таким образом можем прийти к тому, что товар может закончиться, но состояние каталога в ls писать не буду, так что после F5 новые поставки)
function purchase(cart) {
    return function (event) {
        localStorage.clear();
        cart = {}
        listRender('cart', catalog, cart);
    }
}

// здесь будем назначать данные из localStorage
function getFromLocalStorage(cart, catalog) {
    return JSON.parse(localStorage.getItem(localStorage.key(cart)));
}


function init() {
    if (localStorage.length > 0) {
        cart = getFromLocalStorage(cart, catalog);
        for (k in cart) {
            catalog[k].amount -= cart[k];
        }
    } 
    listRender('cart', catalog, cart);
    listRender('catalog', catalog);
    document.addEventListener('click', amountSelectorEvents(catalog, cart, event));
}

init();