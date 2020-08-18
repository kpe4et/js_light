//4) *Нарисовать пирамиду с помощью console.log, как показано на рисунке, только у вашей пирамиды должно быть 20 рядов, а не 5:
//x
//xx
//xxx
//xxxx
//xxxxx


function drawTriangle(length, drawerBase) {
    var drawer = '';
    for (var i=1; i<=length; i++) {
        drawer += drawerBase;
        console.log(drawer);
    }
}

drawTriangle(20, 'x');