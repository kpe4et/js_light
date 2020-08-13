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


//отображение каталога
function catalogRender(catalog) {
    var catalogPage = {};  
    
    for (var i = -1; i < catalog.length; i++) {          // обойдем каждый элемент каталога
        catalogPage.element = document.getElementById('catalog'); 
        var cell = document.createElement('div');
        cell.setAttribute('id', 'product'+i);
        cell.classList.add('catalogLine');
        
        if (i == -1) {                                  // добавим заголовок. этот кусок кода довольно костыльный, зато будет работать при добавлении полей
            for (var j in catalog[0]) {
                var deepCell = document.createElement('div'); 
                deepCell.classList.add(j, 'lineElement');
                deepCell.append(j);
                console.log(deepCell);
                cell.appendChild(deepCell);
                console.log(cell);
            }
        } else {
            for (var j in catalog[i]) {                     // обойдем каждый ключ элемента каталога
                var deepCell = document.createElement('div');
                deepCell.classList.add(j, 'lineElement');
                deepCell.append(catalog[i][j]);
                cell.appendChild(deepCell);
                console.log(cell);
            }
        }
        catalogPage.element.appendChild(cell);
    }
}
catalogRender(catalog);