const tg = window.Telegram.WebApp;
tg.expand();

let user = {
id: tg.initDataUnsafe?.user?.id || Date.now(),
energy: 50,
streak: 1,
score: 0,
birth: ""
};

async function getFate(){

const res = await fetch(CONFIG.API + "/fate", {
method:"POST",
headers:{"Content-Type":"application/json"},
body: JSON.stringify(user)
});

const data = await res.json();

document.getElementById("fateBox").innerText = data.fate;

user.score += 10;
document.getElementById("score").innerText = user.score;
}

function buyCandle(){
fetch(CONFIG.API + "/candle",{
method:"POST",
headers:{"Content-Type":"application/json"},
body: JSON.stringify(user)
});

document.getElementById("fateBox").innerText =
"🪔 香火已点燃，命运正在增强...";
}

function share(){
navigator.clipboard.writeText(
document.getElementById("fateBox").innerText +
"\nhttps://t.me/your_bot?start=" + user.id
);
alert("已复制");
}