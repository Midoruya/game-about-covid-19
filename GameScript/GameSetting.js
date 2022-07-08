let squareWith = 20;
let squareHeight = 20;
let RenderWindows = {
    Width: window.innerWidth * 0.75, // получаем размер страницы
    Height: window.innerHeight * 0.75, // получаем размер страницы
}
let SizeField = {
    Width: 0,
    Height: 0,
}

let squareCount = {
    CountWith:RenderWindows.Width / squareWith, // получаем количество секций по оси Х
    CountHeight:RenderWindows.Height / squareHeight, // получаем количество секций по оси У
}
let GameTick = 0; // Игровой таймер
let GameCount = 0; // Количество очков
let Eat = {
    SpawnTimeMin: 1, // указывать в секундах минимальное время спавна
    SpawnTimeMax: 7, // указывать в секундах максимальное время спавна
    FoodSpoilageTimeMin: 5, // Время порчи еды до состояние COVID
    FoodSpoilageTimeMax: 10, // Время порчи еды до состояние COVID
    TimeDestroy: 100, // указывать в секундах время разрушения
    SpawnEatTick: 0, // Тайминг в который поевился последний объект
    EatCount: [], // Объшие количество еды на карте
};
let EatType = { // Тип еды
    Default: 1, // Обычная
    COVID: 2, // Вредная
    Destroy: 99, // Еда которая уничтожена
}

let COVIDSetting = {
    ModelSizeWith: 20, // Размер модельки
    ModelSizeHeight: 20, // Размер модельки
}


let PlayerSetting = {
    init: false, // Инициализация игрока (тока 1 раз)
    PosX: 0, // Позиция по оси Х
    PosY: 0, // Позиция по оси У
    ModelSizeWith: 40, // Размер модельки
    ModelSizeHeight: 40, // Размер модельки
    AmountOfFood: 100, // количество еды
    FastingRate: 0.04, // Скорость голодания
    PlayerHealth: 4, // Количество здоровия
}