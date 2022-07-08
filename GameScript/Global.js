let canvas = document.getElementById("Game");
let render = canvas.getContext("2d");

function RandomInt(Min, Max) {
    let rand = Min + Math.random() * (Max + 1 - Min); // случайное число от min до max
    return Math.floor(rand);
}

function Dead(){
    if (PlayerSetting.PlayerHealth <= 0) {
        alert("GameOver\nваш счёт : " + GameCount); // подводим итог
        window.location.reload(); // перезапускаем
    }
}

function RenderBackground(){
    for (let b = 0; b < 2; b++) {
        for (let g = 0; g < squareCount.CountHeight; g++) {
            for (let i = 0; i < squareCount.CountWith; i++) {
                if ((i + g) % 2 === 0)
                    render.fillStyle = "#00ff09";
                else
                    render.fillStyle = "#6bff70";
                render.strokeStyle = "#B4B4B4";
                if (b === 0)
                    render.fillRect(i * squareWith, g * squareHeight, squareWith, squareHeight);
                else if (b === 1)
                    render.strokeRect(i * squareWith, g * squareHeight, squareWith, squareHeight);

                SizeField.Width = i;
                SizeField.Height = g;
            }
        }
    }
}
function Player(){
    if (!PlayerSetting.init){
        PlayerSetting.PosX = SizeField.Width / 2;
        PlayerSetting.PosY = SizeField.Height / 2;
        PlayerSetting.init = true;
    }

    if (PlayerSetting.PosX < 0) // Если объект ушёл за границу влево по оси Х
        PlayerSetting.PosX = 1 // Устанавилваем позицию у границы
    if (PlayerSetting.PosX > squareCount.CountWith - 2) // Если объект ушёл за границу вправо по оси Х
        PlayerSetting.PosX = squareCount.CountWith - 2 // Устанавилваем позицию у границы
    if (PlayerSetting.PosY < 0) // Если объект ушёл за границу вверх по оси У
        PlayerSetting.PosY = 1 // станавилваем позицию у границы
    if (PlayerSetting.PosY > squareCount.CountHeight - 2) // Если объект ушёл за границу вниз по оси У
        PlayerSetting.PosY = squareCount.CountHeight - 2 // станавилваем позицию у границы

    for (let g = 0; g < Eat.EatCount.length; g++) { // Проверям все объекты с едой
        if (Eat.EatCount[g].EatTypes !== EatType.Destroy) { // Если еда не уничтожена
            if (Eat.EatCount[g].EatPosY < PlayerSetting.PosY + 2 && Eat.EatCount[g].EatPosY + 1 > PlayerSetting.PosY) { //Если объекты находятся на одной линии по горизонтали
                if (Eat.EatCount[g].EatPosX + 1 > PlayerSetting.PosX && Eat.EatCount[g].EatPosX < PlayerSetting.PosX + 2) { //Если объекты находятся на одной линии по вертикали
                    if (Eat.EatCount[g].EatTypes === EatType.COVID) { // Если тип еды COVID
                        Eat.EatCount[g].EatTypes = EatType.Destroy;
                        PlayerSetting.PlayerHealth--;
                    } else { // Если это нормальная то
                        let EatBlockY = RandomInt(0, squareCount.CountHeight); // Позиция еды по У
                        let EatBlockX = RandomInt(0, squareCount.CountWith); // Позиция еды по х
                        Eat.EatCount[g].SpawnEatTime = GameTick; // Обновляем тик
                        Eat.EatCount[g].EatPosX = EatBlockX; // Обновлям позицыю
                        Eat.EatCount[g].EatPosY = EatBlockY; // Обновлям позицыю
                        Eat.EatCount[g].EatTypes = EatType.Default; // Меняем тип
                        Eat.EatCount[g].EatStyle = RandomInt(0,7); // Меняем модель еды
                        GameCount++; // Добавляем +1 очко
                        PlayerSetting.AmountOfFood+= 5; // Добавляем +5 очков к еде;
                    }
                }
            }
        }
    }
    render.drawImage(PlayerModel,PlayerSetting.PosX * squareWith,PlayerSetting.PosY * squareHeight,PlayerSetting.ModelSizeWith,PlayerSetting.ModelSizeHeight); // Рисуем игрока

}
function RenderEat(PosX,PosY,Type,Style){
    if (Type === EatType.COVID)
        render.drawImage(COVIDModel,PosX * squareWith, PosY * squareHeight,COVIDSetting.ModelSizeWith,COVIDSetting.ModelSizeHeight);
    else {
        switch (Style)
        {
            case 1:
                render.drawImage(GrapesModel,PosX * squareWith, PosY * squareHeight,COVIDSetting.ModelSizeWith,COVIDSetting.ModelSizeHeight);
                break;
            case 2:
                render.drawImage(CherryModel,PosX * squareWith, PosY * squareHeight,COVIDSetting.ModelSizeWith,COVIDSetting.ModelSizeHeight);
                break;
            case 3:
                render.drawImage(KiwiModel,PosX * squareWith, PosY * squareHeight,COVIDSetting.ModelSizeWith,COVIDSetting.ModelSizeHeight);
                break;
            case 4:
                render.drawImage(StrawberryModel,PosX * squareWith, PosY * squareHeight,COVIDSetting.ModelSizeWith,COVIDSetting.ModelSizeHeight);
                break;
            case 5:
                render.drawImage(MangoModel,PosX * squareWith, PosY * squareHeight,COVIDSetting.ModelSizeWith,COVIDSetting.ModelSizeHeight);
                break;
            case 6:
                render.drawImage(AppleModel,PosX * squareWith, PosY * squareHeight,COVIDSetting.ModelSizeWith,COVIDSetting.ModelSizeHeight);
                break;

        }
    }
}
function SpawnEat(){
    let EatBlockY = RandomInt(0,squareCount.CountHeight); // Позиция еды по У
    let EatBlockX = RandomInt(0,squareCount.CountWith); // Позиция еды по х
    let TickSpawnNewEatObject = Eat.SpawnEatTick + RandomInt(Eat.SpawnTimeMin * 100,Eat.SpawnTimeMax * 100); // время в которое появится новая еда
    if (GameTick >= TickSpawnNewEatObject){ // Если тикуший тик больше тика спавна нового объекта то
        Eat.SpawnEatTick = GameTick; // тик спавна нового объекта = игровому тику
        Eat.EatCount.push({SpawnEatTime: GameTick, EatPosX: EatBlockX,EatPosY: EatBlockY,EatTypes:EatType.Default,EatStyle: RandomInt(0,7)}); // добавляем новый объект с едой
    }

    for (let i = 0; i < Eat.EatCount.length; i++) { // Проверям все объекты с едой
        if (Eat.EatCount[i].EatTypes !== EatType.Destroy) { // Если объект рабочий
            if (GameTick > Eat.EatCount[i].SpawnEatTime + RandomInt(Eat.FoodSpoilageTimeMin,Eat.FoodSpoilageTimeMax) * 100) { // Если игровой тик > Времение в который объект должен быть Испорчен то
                Eat.EatCount[i].SpawnEatTime = GameTick; // обновляем время объекта
                Eat.EatCount[i].EatTypes = EatType.COVID; // Меняем тип
            }

            if (Eat.EatCount[i].EatTypes === EatType.COVID && GameTick > Eat.EatCount[i].SpawnEatTime + Eat.TimeDestroy * 100) { // Если время жизни объекта истело
                Eat.EatCount[i].SpawnEatTime = GameTick; // обновляем время объекта
                Eat.EatCount[i].EatTypes = EatType.Destroy; // Меняем тип
            }
            RenderEat(Eat.EatCount[i].EatPosX, Eat.EatCount[i].EatPosY, Eat.EatCount[i].EatTypes,Eat.EatCount[i].EatStyle); // Рисуем еду
        }
    }
}
function InitScreen(){
    canvas.width = RenderWindows.Width; // устанавливаем размер канваса
    canvas.height = RenderWindows.Height; // устанавливаем размер канваса
    canvas.style.setProperty('left', (window.innerWidth - canvas.width)/2 + 'px'); // Устанавливаем позицию канваса
    canvas.style.setProperty('top', (window.innerHeight - canvas.height)/2 + 'px'); // Устанавливаем позицию канваса
}
function PlayerStarvation(){
    PlayerSetting.AmountOfFood-= PlayerSetting.FastingRate;
    if (PlayerSetting.AmountOfFood <= 0) {
        PlayerSetting.PlayerHealth--;
        PlayerSetting.AmountOfFood = 100;
    }
    if (PlayerSetting.AmountOfFood > 100)
        PlayerSetting.AmountOfFood = 100;
}

function CreateGame()
{
    requestAnimationFrame(CreateGame);
    InitScreen();
    RenderFrameInfo();
    RenderBackground();
    PlayerStarvation();
    Dead();
    Player();
    SpawnEat();
    GameTick++;
}

PlayerModel.onload = CreateGame;
