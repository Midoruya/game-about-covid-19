document.addEventListener("keydown", KeyDown);
document.addEventListener("touchmove", TouchMove);
document.addEventListener("touchstart", TouchStart);

let touches = { // Настройки тачскрина
    PosStartX: 0, // Позиция при нажатии Х
    PosStartY: 0, // Позиция при нажатии У
    PosEndX: 0, // Позиция при передвижеии Х
    PosEndY: 0, // Позиция при передвижеии У
}

let KeyCode = {
    W: 87,
    A: 65,
    S: 83,
    D: 68,
    right: 39, // стрелка ->
    left: 37, // стрелка <-
    up: 38, // стрелка Вверх
    down: 40, // стрелка вниз
}

function TouchStart(evt){
    let touch = evt.changedTouches[0];
    touches.PosStartX = touch.clientX;
    touches.PosStartY = touch.clientY;
}

function TouchMove(evt) {
    let touch = evt.changedTouches[0];
    touches.PosEndX = touch.clientX;
    touches.PosEndY = touch.clientY;

    let TouchLengthX = touches.PosStartX - touches.PosEndX; // получаем размер дваижения тачскрина
    let TouchLengthY = touches.PosStartY - touches.PosEndY; // получаем размер дваижения тачскрина

    if (Math.abs(TouchLengthX) > Math.abs(TouchLengthY)) { // Если движение по оси Х было длинее
        if (Math.abs(TouchLengthX) > 20) { // Было ли оно достаточно длинное
            if (TouchLengthX > 0) { // Если значение больше 0 то
                touches.PosStartX = touches.PosEndX; // обновляем позицию
                PlayerSetting.PosX--; // двигаем модель на лево
            } else { //Иначе он двигал им слева направо
                touches.PosStartX = touches.PosEndX; // обновляем позицию
                PlayerSetting.PosX++; // двигаем модель на право
            }
        }
    } else { // Если движение по оси У было длинее
        if (Math.abs(TouchLengthY) > 20) { // Было ли оно достаточно длинное
            if (TouchLengthY > 0) { // Если значение больше 0 то
                touches.PosStartY = touches.PosEndY; // обновляем позицию
                PlayerSetting.PosY--; // двигаем модель вверх
            } else { //Свайп вниз
                touches.PosStartY = touches.PosEndY; // обновляем позицию
                PlayerSetting.PosY++; // двигаем модель вниз
            }
        }
    }
}

function KeyDown(e){
    switch(e.keyCode) {
        case KeyCode.left:
        case KeyCode.A: //Влево A
            PlayerSetting.PosX--;
            break;

        case KeyCode.right:
        case KeyCode.D: //Вправо D
            PlayerSetting.PosX++;
            break;

        case KeyCode.up:
        case KeyCode.W: //Вверх W
            PlayerSetting.PosY--;
            break;

        case KeyCode.down:
        case KeyCode.S: //Вниз S
            PlayerSetting.PosY++;
            break;
    }
}
