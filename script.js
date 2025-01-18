"use strict";

const overlay = document.querySelector(".overlay");
const mainNavEl = document.querySelector(".main-nav");
const hamburgerIcon = document.querySelector(".hamburger-menu");
const closeIcon = document.querySelector(".close-menu");
const arrows = document.querySelectorAll(".arrow");
const mainImg = document.querySelectorAll(".main-image");
const productImgs = document.querySelectorAll(".carousel-track img");
const carouselTrack = document.querySelector(".carousel-track");
const changeQuantitiesBtns = document.querySelectorAll(
  ".change-quantities-btn"
);
const quantityEl = document.querySelector(".quantity");
const cart = document.querySelector(".cart");
const cartIcon = document.querySelector(".new-cart-icon");
const cartContainer = document.querySelector(".cart-container");
const cartCounter = document.querySelector(".cart-counter");
const basketEl = document.querySelector(".basket");
const addToCartBtn = document.querySelector(".add-to-container");
const basketContainer = document.querySelector(".new-basket-container");
const emptyIcon = document.querySelector(".empty-basket");
const basketContent = document.querySelector(".basket-content");
const fullContent = document.querySelector(".new-full-content");
const emptyContent = document.querySelector(".new-empty-content");
const basketContentContainer = document.querySelector(
  ".basket-content-container"
);
const thumbnailContLightbox = lightbox.querySelectorAll(".thumbnail-container");
const thumbLightboxCarousel = document.querySelectorAll(
  ".thumbLightboxCarousel"
);
const lightboxCarousel = document.querySelector(".lightbox-carousel");
const closeLightbox = document.querySelector(".close-lightbox");

let index = 0;
let quantityVar = 0;

const cartArr = [
  {
    img: "images/image-product-1-thumbnail.jpg",
    name: "Fall Limited Edition Sneakers",
    quantity: quantityVar,
    price: 125,
  },
];

const toggleMenu = () => {
  overlay.classList.toggle("active");
  mainNavEl.classList.toggle("active");
};

const toggleBasket = () => {
  basketContainer.classList.add("active");
};

cartContainer.addEventListener("mouseover", (e) => {
  if (
    !basketContainer.classList.contains("active") &&
    (cartIcon.contains(e.relatedTarget) ||
      basketContainer.contains(e.relatedTarget))
  ) {
    basketContainer.classList.add("active");
  }
});

const updateCartCounter = () => {
  cartCounter.textContent = cartArr[0].quantity;
  quantityEl.textContent = cartArr[0].quantity;
  if (cartArr[0].quantity < 1) {
    cartCounter.classList.remove("active");
  }
};

cartContainer.addEventListener("mouseout", (e) => {
  if (!basketContainer.contains(e.relatedTarget)) {
    basketContainer.classList.remove("active");
    updateCartCounter();
  }
});

const toggleBasketContent = () => {
  const hasItems = cartArr[0].quantity >= 1;
  cartCounter.classList.toggle("active", hasItems);

  if (hasItems) {
    fullContent.classList.add("active");
    emptyContent.classList.remove("active");
  } else {
    fullContent.classList.remove("active");
    emptyContent.classList.add("active");
  }
  cartCounter.textContent = cartArr[0].quantity;
};

const emptyBasket = () => {
  emptyIcon.addEventListener("click", () => {
    cartCounter.classList.remove("active");
    cartArr[0].quantity = 0;
    quantityEl.textContent = cartArr[0].quantity;
    toggleBasketContent();
  });
};

const handleEvent = (e) => {
  const { type, key, target } = e;

  if (type === "keydown" && key === "Escape") {
    if (mainNavEl.classList.contains("active")) {
      overlay.classList.remove("active");
      mainNavEl.classList.remove("active");
    } else if (basketContainer.classList.contains("active")) {
      basketContainer.classList.remove("active");
      updateCartCounter();
    }
  }

  if (type === "click") {
    const isMainNavClicked = mainNavEl.contains(target);
    const isHamburgerIconClicked = hamburgerIcon.contains(target);
    const isCloseIconClicked = closeIcon.contains(target);
    const isBasketClicked = basketContainer.contains(target);
    const isCartClicked = cartContainer.contains(target);
    const isAddCartClicked = addToCartBtn.contains(target);
    const isCloseLightboxClicked = closeLightbox.contains(target);

    if (mainNavEl.classList.contains("active")) {
      if (!isMainNavClicked && !isHamburgerIconClicked) {
        overlay.classList.remove("active");
        mainNavEl.classList.remove("active");
      }
    } else {
      const shouldCloseBasket =
        !isBasketClicked &&
        !isCartClicked &&
        !isHamburgerIconClicked &&
        !isCloseIconClicked &&
        !isAddCartClicked;

      if (shouldCloseBasket) {
        basketContainer.classList.remove("active");
        updateCartCounter();
      }

      if (cartArr[0].quantity < 1) {
        cartCounter.classList.remove("active");
      }
    }

    if (isCloseLightboxClicked) {
      resetOverlay();
    }
  }
};

hamburgerIcon.addEventListener("click", toggleMenu);
closeIcon.addEventListener("click", toggleMenu);
cartContainer.addEventListener("click", toggleBasket);
document.addEventListener("keydown", handleEvent);
document.addEventListener("click", handleEvent);
closeLightbox.addEventListener("click", handleEvent);

const updateCarouselStatement = () => {
  thumbLightboxCarousel.forEach((e) => e.classList.remove("active"));
  thumbLightboxCarousel[index].classList.add("active");
};

const handleArrowNavigation = (direction) => {
  if (direction === "right") {
    index++;
  } else if (direction === "left") {
    index--;
  }

  if (index > productImgs.length - 1) {
    index = 0;
  } else if (index < 0) {
    index = productImgs.length - 1;
  }

  carouselTrack.style.transform = `translateX(-${index}00%)`;
  mainImg[1].src = `images/image-product-${index + 1}.jpg`;
  updateCarouselStatement();
  screenChange();
};

arrows.forEach((arrow) => {
  arrow.addEventListener("click", () => {
    const direction = arrow.classList.contains("right") ? "right" : "left";
    handleArrowNavigation(direction);
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    handleArrowNavigation("right");
  } else if (e.key === "ArrowLeft") {
    handleArrowNavigation("left");
  }
});

const openLightboxCarousel = () => {
  mainImg[0].addEventListener("click", () => {
    overlay.classList.add("active");
    lightboxCarousel.style.display = "flex";
  });

  closeLightboxCarousel();
};

const closeLightboxCarousel = () => {
  document.addEventListener("click", (e) => {
    const isArrowClicked = Array.from(arrows).some((arrow) =>
      arrow.contains(e.target)
    );
    const isThumbnailClicked = Array.from(thumbLightboxCarousel).some(
      (thumbnail) => thumbnail.contains(e.target)
    );

    if (
      !hamburgerIcon.contains(e.target) &&
      !mainImg[0].contains(e.target) &&
      !mainImg[1].contains(e.target) &&
      !isArrowClicked &&
      !isThumbnailClicked
    )
      resetOverlay();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") resetOverlay();
  });
};

const updateActiveThumbnail = (thumbnails, target) => {
  thumbnails.forEach((thumbnail) => thumbnail.classList.remove("active"));
  target.closest(".thumbnail-container").classList.add("active");
};

const updateMainImages = (index) => {
  mainImg.forEach((img) => (img.src = `images/image-product-${index + 1}.jpg`));
};

const carouselThumbnailUpdate = () => {
  thumbLightboxCarousel.forEach((thumb, i) => {
    thumb.addEventListener("click", (e) => {
      index = i;
      updateActiveThumbnail(thumbLightboxCarousel, e.target);
      mainImg[1].src = `images/image-product-${index + 1}.jpg`;
    });

    thumb.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        index = i;
        updateActiveThumbnail(
          thumbLightboxCarousel,
          thumb.querySelector(".thumbnail")
        );
        mainImg[1].src = `images/image-product-${index + 1}.jpg`;
      }
    });
  });

  thumbnailContLightbox.forEach((thumbnail, i) => {
    thumbnail.addEventListener("click", (e) => {
      index = i;
      updateActiveThumbnail(thumbnailContLightbox, e.target);
      updateMainImages(index);
      updateCarouselStatement();
      screenChange();
    });

    thumbnail.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        index = i;
        updateActiveThumbnail(
          thumbnailContLightbox,
          thumbnail.querySelector(".thumbnail")
        );
        updateMainImages(index);
        updateCarouselStatement();
        screenChange();
      }
    });
  });
};

changeQuantitiesBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    cartArr[0].quantity += btn.id === "increment" ? 1 : -1;
    cartArr[0].quantity = Math.max(0, cartArr[0].quantity);
    quantityEl.textContent = cartArr[0].quantity;
  });
});

const addToCart = () => {
  addToCartBtn.addEventListener("click", () => {
    toggleBasketContent();
    emptyBasket();
    updateQuantities();
    basketContainer.classList.add("active");
    setTimeout(() => {
      basketContainer.classList.remove("active");
    }, 2000);
  });
};

const updateQuantities = () => {
  const basketTotalPrice = basketContainer.querySelector(".basket-total-price");
  const basketDecrement = basketContainer.querySelector("#basket-decrement");
  const basketEmpty = basketContainer.querySelector(".empty-basket");

  const basketQuantities =
    basketContainer.querySelectorAll(".basket-quantities");
  basketQuantities.forEach((basket) => {
    basket.textContent = cartArr[0].quantity;
  });

  basketTotalPrice.textContent = `$${
    cartArr[0].price * cartArr[0].quantity
  }.00`;

  const isActive = cartArr[0].quantity > 1;
  basketDecrement.classList.toggle("active", isActive);
  basketEmpty.classList.toggle("active", !isActive);
};

const handleBasketAmount = () => {
  const basketAmountBtns = basketContainer.querySelectorAll(
    ".basket-amount-btns"
  );
  basketAmountBtns.forEach((amountBtn) => {
    amountBtn.addEventListener("click", () => {
      cartArr[0].quantity += amountBtn.id === "basket-increment" ? 1 : -1;
      updateQuantities();
    });
  });
};

const resetOverlay = () => {
  overlay.classList.remove("active");
  lightboxCarousel.style.display = "none";
  mainNavEl.classList.remove("active");
};

const screenChange = () => {
  let prevState = window.innerWidth >= 1200 ? "large" : "small";

  window.addEventListener("resize", () => {
    const width = window.innerWidth;
    const currentState = width >= 1200 ? "large" : "small";

    if (currentState !== prevState) {
      prevState = currentState;
      index = 0;
      resetOverlay();
    }
  });
};
screenChange();
openLightboxCarousel();
carouselThumbnailUpdate();
handleBasketAmount();
addToCart();
