const loader = document.querySelector('.loader');
const loaderImg = document.querySelector('.loader-img');
const loaderText = document.querySelector('.loader-Text');
setTimeout(()=>{
  loader.classList.add('loader-ani')
},1000)

setTimeout(() => {
  loader.classList.remove('loader')
  loaderImg.classList.remove('loader-img')
  loaderText.classList.remove('loader-Text')
  const jerry = document.querySelector("#j-img");
  const tom = document.querySelector("#t-img");
  const tomAnimation = document.querySelector(".t-ani");
  let music = new Audio("GameMusic.mp3");
  let music_End = new Audio("GameoverMusic.mp3");
  let interval = setInterval(() => {
    music.play();
  }, 1);
  let score = 0;
  let cross = true;

  function addClass() {
    jerry.classList.add("j-ani");
  }
  function removeClass() {
    jerry.classList.remove("j-ani");
  }

  let jPosition;
  let tPosition;
  let jPositionY;
  let tPositionY;

  let mainInterval = setInterval(() => {
    jPosition = Math.floor(parseFloat(jerry.getBoundingClientRect().x));
    tPosition = Math.floor(parseFloat(tom.getBoundingClientRect().x));
    jPositionY = Math.floor(parseFloat(jerry.getBoundingClientRect().y));
    tPositionY = Math.floor(parseFloat(tom.getBoundingClientRect().y));

    let offsetX = Math.abs(jPosition - tPosition);
    let offsetY = Math.abs(jPositionY - tPositionY);

    if (offsetX < 21 && offsetY < 100 || jPosition <= -124 || jPosition >= 1476) {
      tom.classList.remove("t-ani");
      tom.style.left = tPosition + "px";
      document.querySelector(".score").style.backgroundColor = "red";
      document.querySelector(".element-container").classList.add("gOver");
      document.querySelector(".endImg").classList.add("end-img");
      document.querySelector(".endText").classList.add("end-imgText");
      music.pause();
      clearInterval(interval);
      music_End.play();
      clearInterval(mainInterval);
    } else if (offsetX < 21 && cross) {
      score++;
      document.querySelector(".score").innerHTML = `<h3>SCORE : ${score}</h3>`;
      cross = false;
      setTimeout(() => {
        let aniDuration =
          parseFloat(
            window
            .getComputedStyle(tom, null)
            .getPropertyValue("animation-duration")
          ) * 1000;
        let new_aniDuration = aniDuration - 10;
        tomAnimation.style.animationDuration = new_aniDuration + "ms";
      }, 300);

      setTimeout(() => {
        cross = true;
      }, 1000);
    }
  }, 1);

  document.addEventListener("keydown", (event) => {
    let e = event.key;
    if (e === "ArrowUp") {
      addClass();
      setTimeout(() => {
        removeClass();
      }, 700);
    } else if (e === "ArrowRight" && tPosition - jPosition > 30) {
      jerry.style.left = jPosition + 100 + "px";
    } else if (e === "ArrowLeft" && tPosition - jPosition > 20) {
      jerry.style.left = jPosition - 100 + "px";
    }
  });
}, 2000);