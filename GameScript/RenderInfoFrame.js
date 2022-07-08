let InfoFrame = document.getElementById("InfoFrame");
let renderInfoFrame = InfoFrame.getContext("2d");

function RenderFrameInfo(){
    InfoFrame.width = RenderWindows.Width; // устанавливаем размер инфо панели
    InfoFrame.height = RenderWindows.Height * 0.3; // устанавливаем размер инфо панели
    InfoFrame.style.setProperty('left', (window.innerWidth - InfoFrame.width)/2 + 'px');  // Устанавливаем позицию инфо панели
    renderInfoFrame.drawImage(InfoHeader,0,0,RenderWindows.Width,RenderWindows.Height * 0.15);
    renderInfoFrame.font = "12px serif";
    renderInfoFrame.fillText("Points : " + GameCount, 0, (RenderWindows.Height * 0.15) * 0.55);
    let FoodBarWidth = (InfoFrame.width * 0.2) / 100 * PlayerSetting.AmountOfFood;
    let HealthBarWidth = (InfoFrame.width * 0.2) / 4 * PlayerSetting.PlayerHealth;

    renderInfoFrame.font = "16px serif";
    renderInfoFrame.fillStyle = "Black";
    renderInfoFrame.fillText("Stamina", InfoFrame.width / 2, InfoFrame.height / 4.2);
    renderInfoFrame.fillStyle = "Green";
    renderInfoFrame.fillRect(InfoFrame.width / 2, InfoFrame.height / 4,FoodBarWidth,InfoFrame.height * 0.05);
    renderInfoFrame.strokeRect(InfoFrame.width / 2, InfoFrame.height / 4,InfoFrame.width * 0.2,InfoFrame.height * 0.05);

    renderInfoFrame.fillStyle = "Black";
    renderInfoFrame.fillText("Health", InfoFrame.width / 1.4, InfoFrame.height / 4.2);

    if (PlayerSetting.PlayerHealth > 3)
        renderInfoFrame.fillStyle = "Green";
    else if (PlayerSetting.PlayerHealth >= 2 && PlayerSetting.PlayerHealth <= 3)
        renderInfoFrame.fillStyle = "Orange";
    else if (PlayerSetting.PlayerHealth <=1)
        renderInfoFrame.fillStyle = "Red";

    renderInfoFrame.fillRect(InfoFrame.width / 1.4, InfoFrame.height / 4,HealthBarWidth,InfoFrame.height * 0.05);
    renderInfoFrame.strokeRect(InfoFrame.width / 1.4, InfoFrame.height / 4,InfoFrame.width * 0.2,InfoFrame.height * 0.05);

}