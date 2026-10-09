// ============= Locomotive Smooth Scrolling ============= //
let locoScroll;
locomotive = () => {
  gsap.registerPlugin(ScrollTrigger);

  locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
    smartphone: {
      smooth: true,
    },
    tablet: {
      smooth: true,
    },
  });
  const navbar = document.querySelector(".navbar");
  const linksBg = document.querySelector(".links");

  let lastScroll = 0;
  let navbarHidden = false;
  let mouseOnTop = false;

  locoScroll.on("scroll", (obj) => {
    const currentScroll = obj.scroll.y;

    if (currentScroll > 300) {
      linksBg.style.background = "#637ca463";
      navbar.style.transition = "0.3s ease-in-out";
    } else {
      linksBg.style.background = "#00000053";
    }

    if (mouseOnTop) return;

    if (currentScroll > lastScroll) {
      navbar.style.top = "-100px";
      navbarHidden = true;
      navbar.style.transition = "0.3s ease-in-out";
    } else {
      navbar.style.top = "0";
      navbarHidden = false;
    }
    // lastScroll = currentScroll;
  });

  document.addEventListener("mousemove", (e) => {
    mouseOnTop = e.clientY <= 50;
    if (mouseOnTop) {
      navbar.style.top = "0";
    } else if (navbarHidden) {
      navbar.style.top = "-100px";
    }
  });
  const progress = document.querySelector(".scroll-progress");

  locoScroll.on("scroll", (obj) => {
    progress.style.width = obj.scroll.y < 3 ? "0%" : (obj.scroll.y / obj.limit) * 100 + "%";
  });

  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    pinType: "transform",
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  requestAnimationFrame(() => ScrollTrigger.refresh());

  // ===============================================
  // Navbar Active Link + Indicator (Locomotive Scroll)
  //
  // ===============================================

  const links = document.querySelectorAll(".links a");

  // Active Link
  function activate(link) {
    links.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
  }

  // Click
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      activate(link);
      locoScroll.scrollTo(link.getAttribute("href"));
    });
  });
  const backToTop = document.querySelector(".footer-btn a");

  const footerLinks = document.querySelectorAll(".page6-tow-child-col li a");

  footerLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      locoScroll.scrollTo(link.getAttribute("href"));
    });
  });

  backToTop.addEventListener("click", (e) => {
    e.preventDefault();
    locoScroll.scrollTo("#link-page1");
  });

  // Scroll
  locoScroll.on("scroll", () => {
    const point = window.innerHeight / 10;

    links.forEach((link) => {
      const section = document.querySelector(link.getAttribute("href"));
      const rect = section.getBoundingClientRect();

      if (rect.top <= point && rect.bottom >= point) {
        activate(link);
      }
    });
  });

  // Default Active
  activate(links[0]);
};
locomotive();
// ============= Locomotive Smooth Scrolling ============= //

// ============= Canvas 3D Images FrameCode ============= //

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  render();
});

const frameCount = 240;

const images = [];
const imageSeq = {
  frame: 0,
};

function currentFrame(index) {
  return `image-frame/images frame/ezgif-frame-${String(index + 1).padStart(3, "0")}.png`;
}

gsap.to(imageSeq, {
  frame: frameCount - 1,
  snap: "frame",
  ease: `none`,
  scrollTrigger: {
    scrub: 0.15,
    trigger: `#page1`,
    //   set start end according to preference
    start: `top top`,
    end: `600% top`,
    scroller: `#main`,
  },
  onUpdate: render,
});

function render() {
  const img = images[imageSeq.frame];

  if (!img || !img.complete) return;

  scaleImage(img, context);
}

function scaleImage(img, ctx) {
  var canvas = ctx.canvas;
  var hRatio = canvas.width / img.width;
  var vRatio = canvas.height / img.height;
  var ratio = Math.max(hRatio, vRatio);
  var centerShift_x = (canvas.width - img.width * ratio) / 2;
  var centerShift_y = (canvas.height - img.height * ratio) / 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, img.width, img.height, centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
}
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#page1",
    scroller: `#main`,
    start: `top top`,
    end: "600% top",
    pin: true,
    scrub: 1,
  },
});
tl.to(".text-center-flex", {
  opacity: 0,
  duration: 0.5,
  y: -100,
  display: "none",
});
tl.from(".can-1", {
  opacity: 0,
  duration: 1,
  y: 100,
}).to(".can-1", {
  opacity: 0,
  duration: 1,
  y: -100,
});

tl.from(".can-2", {
  opacity: 0,
  duration: 1,
  y: 100,
}).to(".can-2", {
  opacity: 0,
  duration: 1,
  y: -100,
});

tl.from(".can-3", {
  opacity: 0,
  duration: 1,
  y: 100,
}).to(".can-3", {
  opacity: 0,
  duration: 1,
  y: -100,
});

tl.from(".can-4", {
  opacity: 0,
  duration: 1,
  y: 100,
}).to(".can-4", {
  opacity: 0,
  duration: 1,
  y: -100,
});

// ============= Canvas 3D Images FrameCode ============= //

// ============= Website Loader ============= //
loader = () => {
  const loader = document.querySelector(".loader");
  const circle = document.querySelector(".circle");
  const percent = document.querySelector("#percent");

  let lodedImages = 0;
  let pageLoded = false;

  document.body.classList.add("loading");
  const tl2 = gsap.timeline();

  const hideLoader = () => {
    if (pageLoded && lodedImages === frameCount) {
      setTimeout(() => {
        loader.classList.add("active");
        document.body.classList.remove("loading");
      });
    }
  };

  window.addEventListener("load", () => {
    pageLoded = true;
    hideLoader();
  });

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();

    img.onload = () => {
      lodedImages++;
      let value = Math.floor((lodedImages / frameCount) * 100);

      percent.textContent = value + "%";
      circle.style.background = `conic-gradient(#2525e0 ${value * 3.6}deg, #5e5959 ${value * 3.6}deg)`;

      if (lodedImages === 1) render();
      hideLoader();
    };

    img.src = currentFrame(i);
    images.push(img);
  }
};
loader();
// ============= Website Loader ============= //

// // ============= Page2 Code ============= //
page2Code = () => {
  const fakeImg = document.querySelector("#page2-img2");
  const realImg = document.querySelector("#viewer");

  realImg.addEventListener("load", () => {
    realImg.style.visibility = "visible";
    realImg.style.opacity = "1";

    fakeImg.style.opacity = "0";

    setTimeout(() => {
      fakeImg.style.display = "none";
    }, 500);
  });
  realImg.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      e.stopPropagation();
    },
    { passive: false },
  );
  const realImg2 = document.querySelector("#viewer2");
  realImg2.addEventListener("wheel", (e) => {
    e.preventDefault();
    e.stopPropagation();
  });
};
page2Code();
// // ============= Page2 Code ============= //

// // ============= Page3 Code ============= //
page3Code = () => {
  const videoBox = document.querySelector(".page3-video");
  const page3Video = document.querySelector(".page3-video video");
  const playBtn = document.querySelector(".play-btn");
  const pauseBtn = document.querySelector(".pause-btn");

  let timer;

  playBtn.addEventListener("click", () => {
    page3Video.play();

    playBtn.classList.add("hidden");
    pauseBtn.classList.remove("hidden");

    clearTimeout(timer);

    timer = setTimeout(() => {
      if (!videoBox.matches(":hover")) {
        pauseBtn.classList.add("hidden");
      }
    }, 300);
  });
  pauseBtn.addEventListener("click", () => {
    page3Video.pause();

    playBtn.classList.remove("hidden");
    pauseBtn.classList.add("hidden");
  });

  videoBox.addEventListener("mouseenter", () => {
    if (!page3Video.paused) {
      clearTimeout(timer);
      pauseBtn.classList.remove("hidden");
    }
  });
  videoBox.addEventListener("mouseleave", () => {
    if (!page3Video.paused) {
      pauseBtn.classList.add("hidden");
    }
  });
  page3Video.addEventListener("ended", () => {
    playBtn.classList.remove("hidden");
    pauseBtn.classList.add("hidden");
  });
  const fakeImg2 = document.querySelector("#page3-img1");
  const realImg2 = document.querySelector("#viewer2");

  realImg2.addEventListener("load", () => {
    realImg2.style.visibility = "visible";
    realImg2.style.opacity = "1";

    fakeImg2.style.opacity = "0";

    setTimeout(() => {
      fakeImg2.style.display = "none";
    }, 500);
  });
};
page3Code();
// ============= Page3 Code ============= //

// ============= Page4 Code ============= //
page4Code = () => {
  const hearts = document.querySelectorAll(".my-heart");

  hearts.forEach((heart) => {
    heart.addEventListener("click", () => {
      heart.querySelector(".un-fill").classList.toggle("hidden2");
      heart.querySelector(".fill").classList.toggle("hidden2");
    });
  });
  const swiper1 = new Swiper(".swiper1", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    speed: 800,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },

    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
};
page4Code();
// ============= Page4 Code ============= //

// ============= Page5 Code ============= //
page5Code = () => {
  var swiper2 = new Swiper(".swiper2", {
    slidesPerView: "3",
    grabCursor: true,
    centeredSlides: true,
    spaceBetween: 20,

    loop: true,
    speed: 1000,

    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
      waitForTransition: true,
    },

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
};
page5Code();
// ============= Page5 Code ============= //
