$(function () {
  function checkSlider(slickSlider) {
    const sliderLength = $(slickSlider + ">div").length;
    return sliderLength > 1 ? true : false;
  }

  function sliderCounter(slickSlider, classNameCounter, setingsSlick = {}) {
    if (checkSlider(slickSlider)) {
      let currentSlide;
      const sliderCounter = document.createElement("div");
      sliderCounter.classList.add(classNameCounter);

      function updateCounter(slick) {
        currentSlide = slick.slickCurrentSlide() + 1;
        sliderCounter.textContent =
          currentSlide < 10 ? `0${currentSlide}` : `${currentSlide}`;
      }

      $(slickSlider)
        .on("init", (event, slick) => {
          $(slickSlider).append(sliderCounter);
          updateCounter(slick);
        })
        .on("afterChange", (event, slick, currentSlide) => {
          updateCounter(slick, currentSlide);
        });
      $(slickSlider).slick(setingsSlick);
    } else console.log("Slider empty or contains one slide. Add more slides");
  }

  function sliderCounterSlash(slickSlider, classCounter, setingsSlick = {}) {
    if (checkSlider(slickSlider)) {
      const currentSlide = document.createElement("div");
      currentSlide.classList.add("slide-current");
      const slidesCount = document.createElement("div");
      slidesCount.classList.add("slide-count");
      const sliderCounter = document.createElement("div");
      sliderCounter.classList.add(classCounter);

      function updateSliderCounter(slick) {
        slidesCount.textContent =
          slick.slideCount > 9
            ? `/${slick.slideCount}`
            : `/0${slick.slideCount}`;
        const current = slick.slickCurrentSlide() + 1;
        currentSlide.textContent = current > 9 ? `${current}` : `0${current}`;
        sliderCounter.append(currentSlide);
        sliderCounter.append(slidesCount);
      }

      $(slickSlider)
        .on("init", function (event, slick) {
          $(slickSlider).append(sliderCounter);
          updateSliderCounter(slick);
        })
        .on("afterChange", function (event, slick, currentSlide) {
          updateSliderCounter(slick, currentSlide);
        });
      $(slickSlider).slick(setingsSlick);
    } else console.log("Slider empty or contains one slide. Add more slides");
  }

  //       header__slider-box
  sliderCounter(".header__slider-box", "slider__counter", {
    prevArrow:
      '<button class="header__arrow slider__arrow slider__btn-left"><img class="slider__btn-img" src="images/slider/slider-arrow.svg" alt=""></button>',
    nextArrow:
      '<button class="header__arrow slider__arrow slider__btn-right"><img class="slider__btn-img" src="images/slider/slider-arrow.svg" alt=""></button>',
    autoplay: true,
    swipeToSlide: true,
    swipe: true,
  });

  //    reviews__slider
  $(".reviews__slider").slick({
    dots: true,
    dotsClass: "reviews__dots",
    prevArrow:
      '<button class="reviews__slider-arrow reviews__slider-left"></button>',
    nextArrow:
      '<button class="reviews__slider-arrow reviews__slider-right"></button>',
  });

  //    excursion__slider-box
  sliderCounterSlash(".excursion__slider-box", "excursion__slider-counter", {
    dots: true,
    arrows: false,
    autoplay: true,
    infinite: true,
    fade: true,
    dotsClass: "excursion__dots scrollbar__dots",
  });
  sliderCounterSlash(".portfolio__slider-box", "portfolio__slider-counter", {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    variableWidth: true,
    cssEase: "linear",
    autoplay: true,
    speed: 500,
    prevArrow:
      '<button class="portfolio__arrow slider__arrow slider__btn-left"><img class="slider__btn-img" src="images/slider/slider-arrow.svg" alt=""></button>',
    nextArrow:
      '<button class="portfolio__arrow slider__arrow slider__btn-right"><img class="slider__btn-img" src="images/slider/slider-arrow.svg" alt=""></button>',
    dots: true,
    dotsClass: "portfolio__dots scrollbar__dots",
  });
  // FILTER
  function hideItem(item) {
    setTimeout(function () {
      item.classList.add("filter-opacity");
      setTimeout(function () {
        item.classList.add("filter-hide");
      }, 200);
    }, 300);
  }
  function filter(item, btn) {
    setTimeout(function () {
      const category = btn.dataset.filter;
      const itemCategory = item.classList.contains(`${category}`);
      setTimeout(function () {
        if (itemCategory) {
          item.classList.remove("filter-hide");
          setTimeout(function () {
            item.classList.remove("filter-opacity");
          }, 100);
        }
      }, 200);
    }, 300);
  }

  function filterBTN() {
    const filterBTN = document.querySelectorAll(".filter__btn-category");
    const filterItems = document.querySelectorAll(".portfolio__item");
    filterBTN.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterItems.forEach((item) => {
          hideItem(item);
          filter(item, btn);
        });
      });
    });
  }
  filterBTN();

  const questions = document.querySelectorAll(".questions__click--active");
  questions.forEach((question) => {
    question.addEventListener(
      "click",
      () => {
        question.parentElement.classList.toggle("questions__box__item--active");
      },
      {
        passive: true,
      }
    );
  });

  const burgerMenu = document.querySelector(".burger-menu");
  const rightMenu = document.querySelector(".right-menu");
  burgerMenu.addEventListener("click", () => {
    burgerMenu.classList.toggle("burger-menu-active");
    rightMenu.classList.toggle("right-menu-active");
  });

  const firstItemMenu = document.querySelector(
    ".right-menu__list-item:first-child"
  );
  const subMenu = document.querySelector(".right-menu__sub-list");
  firstItemMenu.addEventListener("click", () => {
    subMenu.classList.toggle("right-menu__sub-list-active");
  });

  function addSlider() {
    return $(".summary__slider").slick({
      arrows: false,
      autoplay: true,
      centerMode: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      variableWidth: true,
      dots: true,
      dotsClass: "reviews__dots",
    });
  }
  function deletSlider() {
    return $(".summary__slider").slick("unslick");
  }
  const summaryVideos = document.querySelector(".summary__videos");
  function checkClientWidth() {
    return document.documentElement.clientWidth;
  }
  function createSlider() {
    if (checkClientWidth() <= 660) {
      summaryVideos.classList.remove("summary__videos");
      summaryVideos.classList.add("summary__slider");
      addSlider();
    } else {
      deletSlider();
      summaryVideos.classList.remove("summary__slider");
      summaryVideos.classList.add("summary__videos");
    }
  }
  createSlider();
  window.onresize = createSlider;
});
