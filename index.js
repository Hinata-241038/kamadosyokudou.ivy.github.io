// ハンバーガーメニューの切り替え
function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("hidden");
}

// グローバル変数
let currentSlideShow = 0;
let currentSlideIndex = 0;
let slideShows;
let totalSlideShows;
let autoSlideInterval; // 自動再生用のタイマー

// 初期化処理
document.addEventListener("DOMContentLoaded", () => {
  // スライドショー要素を取得
  slideShows = document.querySelectorAll(".slideshow");
  totalSlideShows = slideShows.length;

  if (totalSlideShows > 0) {
    // 最初のスライドショーを表示
    slideShows[currentSlideShow].classList.add("active");
    const slides = slideShows[currentSlideShow].querySelectorAll(".slides img");
    if (slides.length > 0) {
      slides[currentSlideIndex].classList.add("active");
      createDots(slides.length); // ドットボタンを生成
    } else {
      console.error("スライドが見つかりません");
    }
  } else {
    console.error("スライドショーが見つかりません");
  }

  // ボタンイベントリスナーを設定
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");

  if (prevButton && nextButton) {
    prevButton.addEventListener("click", () => changeSlide(-1));
    nextButton.addEventListener("click", () => changeSlide(1));
  } else {
    console.error("スライド切り替えボタンが見つかりません");
  }

  // キーボードイベントリスナー
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      changeSlideShow(-1); // 左矢印で前のスライドショー
    } else if (e.key === "ArrowRight") {
      changeSlideShow(1); // 右矢印で次のスライドショー
    }
  });

  // 自動スライドショー開始
  startAutoSlide();
});

// 自動再生を開始する関数
function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    changeSlide(1); // 3秒ごとに次のスライドへ
  }, 3000); // 3000ミリ秒 (3秒)
}

// 自動再生を停止する関数
function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

// スライドを切り替える関数
function changeSlide(direction) {
  const activeSlideShow = slideShows[currentSlideShow];
  const slides = activeSlideShow.querySelectorAll(".slides img");
  if (slides.length === 0) {
    console.error("スライドが見つかりません");
    return;
  }

  // 自動再生をリセット
  stopAutoSlide();
  startAutoSlide();

  // 現在のスライドを非表示
  slides[currentSlideIndex].classList.remove("active");
  updateDots(currentSlideIndex, false); // ドットのアクティブ状態を解除

  // 次のスライドを計算
  currentSlideIndex = (currentSlideIndex + direction + slides.length) % slides.length;

  // 新しいスライドを表示
  slides[currentSlideIndex].classList.add("active");
  updateDots(currentSlideIndex, true); // 新しいドットをアクティブに
}

// スライドショー全体を切り替える関数
function changeSlideShow(direction) {
  // 現在のスライドショーとスライドを非表示
  const activeSlideShow = slideShows[currentSlideShow];
  const slides = activeSlideShow.querySelectorAll(".slides img");
  slides[currentSlideIndex].classList.remove("active");
  activeSlideShow.classList.remove("active");

  // 次のスライドショーを計算
  currentSlideShow = (currentSlideShow + direction + totalSlideShows) % totalSlideShows;
  currentSlideIndex = 0; // 新しいスライドショーでは最初のスライドを表示

  // 新しいスライドショーとスライドを表示
  const nextSlideShow = slideShows[currentSlideShow];
  const nextSlides = nextSlideShow.querySelectorAll(".slides img");
  nextSlideShow.classList.add("active");
  if (nextSlides.length > 0) {
    nextSlides[currentSlideIndex].classList.add("active");
  } else {
    console.error("次のスライドが見つかりません");
  }
}

// ドットボタンを生成する関数
function createDots(numSlides) {
  const dotsContainer = document.createElement("div");
  dotsContainer.classList.add("dots-container");

  for (let i = 0; i < numSlides; i++) {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (i === currentSlideIndex) {
      dot.classList.add("active"); // 最初のドットをアクティブ状態に
    }
    dot.addEventListener("click", () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }

  const activeSlideShow = slideShows[currentSlideShow];
  activeSlideShow.appendChild(dotsContainer);
}

// 指定されたスライドに移動する関数
function goToSlide(index) {
  const activeSlideShow = slideShows[currentSlideShow];
  const slides = activeSlideShow.querySelectorAll(".slides img");

  // 自動再生をリセット
  stopAutoSlide();
  startAutoSlide();

  // 現在のスライドを非表示
  slides[currentSlideIndex].classList.remove("active");
  updateDots(currentSlideIndex, false); // ドットのアクティブ状態を解除

  // 指定されたスライドに切り替え
  currentSlideIndex = index;
  slides[currentSlideIndex].classList.add("active");
  updateDots(currentSlideIndex, true); // 新しいドットをアクティブに
}

// ドットのアクティブ状態を更新する関数
function updateDots(index, isActive) {
  const dots = document.querySelectorAll(".dots-container .dot");
  if (dots[index]) {
    if (isActive) {
      dots[index].classList.add("active");
    } else {
      dots[index].classList.remove("active");
    }
  }
}


// ハンバーガーメニューをクリックしてスライドショーメニューを表示
function toggleSlideShowMenu() {
  const slideShowMenu = document.getElementById("slideshow-menu");
  if (!slideShowMenu) {
    console.error("スライドショーメニューが見つかりません");
    return;
  }

  // メニューの表示・非表示を切り替え
  slideShowMenu.classList.toggle("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
  // ... (既存コード)

  // スライドショー全体にクリックイベントを追加して自動再生を停止
  slideShows.forEach((slideShow) => {
    slideShow.addEventListener("click", () => {
      stopAutoSlide(); // 自動スライドショーを停止
      console.log("スライドショーがクリックされたため、自動再生を停止しました。");
    });
  });

  // ... (既存コード)
});