"use strict";

// *Declares
// const closeBtn = document.querySelector(
//   '.mobile-nav-icon[name="close-outline"]'
// );
// const menuBtn = document.querySelector('.mobile-nav-icon[name="menu-outline"]');
const btnNavEl = document.querySelector(".mobile-nav-btn");
const headerEl = document.querySelector(".header");
const copyrightEl = document.querySelector(".copyright");
const allLinkEls = document.querySelectorAll("a:link");
const sectionHeroEl = document.querySelector(".section-hero");

//*something code

//*functions
const setCopyrightCurrentYear = function () {
  copyrightEl.textContent = copyrightEl.textContent.replace(
    "2027",
    new Date().getFullYear()
  );
};

//*call functions
setCopyrightCurrentYear();

// * Events
//make mobile navigation work
// menuBtn.addEventListener("click", function (e) {
//   header.classList.add("nav-open");
// });

// closeBtn.addEventListener("click", function (e) {
//   header.classList.remove("nav-open");
// });

btnNavEl.addEventListener("click", function (e) {
  headerEl.classList.toggle("nav-open");
});
btnNavEl.addEventListener("focus", function (e) {
  btnNavEl.style.outline = "none";
});

//smooth scroll animation
// console.log(allLinkEls); allLinkEls now is nodeList which is quite similar with array so it's also iterable so we can use it with forEach()
allLinkEls.forEach((a) =>
  a.addEventListener("click", function (e) {
    e.preventDefault();
    // const targetId = a.getAttribute("href");
    const targetId = e.currentTarget.getAttribute("href");

    //scroll back to to the top: we have two way to do it
    // if (targetId === "#") headerEl.scrollIntoView({ behavior: "smooth" });
    if (targetId === "#") window.scrollTo({ top: 0, behavior: "smooth" });
    const targetEl = document.querySelector(targetId);
    if (!targetEl) return alert("Something went wrong");

    // we need to remove nav-open in case we use smaller screen, and only close the navigation when we click to navigation link not other link on page
    if (a.classList.contains("main-nav-link"))
      headerEl.classList.remove("nav-open");
    targetEl.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  })
);

// window.addEventListener("scroll", function (e) {
//   const viewportHeight = this.innerHeight;
//   const scrollHeight = this.scrollY;
//   console.log(viewportHeight, scrollHeight);
//   if (scrollHeight > viewportHeight) headerEl.classList.add("sticky");
//   else headerEl.classList.remove("sticky");
// });
// * so to do sticky scroll we can use modern way which is called the intersection observer
// * so there is multiple ways of doing this but this is the most performant way and also the most modern and the best way

const observer = new IntersectionObserver(
  function (entires) {
    // console.log(entires[0]);
    const ent = entires[0];
    // console.log(ent);
    if (ent.intersectionRatio === 0) {
      // sectionHeroEl.style.marginTop = "8rem"; //we need to add some margin to remove the jump issue
      sectionHeroEl.classList.add("margin-top-hg");
      headerEl.classList.add("sticky");
    } else {
      // console.log(document.querySelector(".header.sticky")?.clientHeight);
      // sectionHeroEl.style.marginTop = "0";
      sectionHeroEl.classList.remove("margin-top-hg");
      headerEl.classList.remove("sticky");
    }
  },
  {
    root: null, // root is specify where we start observe and null is mean we will look it in viewport, and usually we always use root: null but we also can observe inside other element
    // so basically inside browser window
    threshold: 0, // set the point when the event trigged and call function start obverse, in here we want observe in the first time so when the page is 0%, 0px right and this where we start obverse
    // other value is 1 and 1 means: when this element totally inside the viewport(null here is viewport right)
    rootMargin: "-96px", // rootMargin is set margin this root(viewport) with -80px like we decrease 80px of the height of this viewport and when we scroll to in point it will intersecting
    // and this solve problem when we want the sticky navigation appear before 80px is height of sticky navigation
  }
);

// we will use observe() to observe some element in the HTML, and in this case we want to observe hero section
// cuz we want when this section moves out the viewport we want the navigation sticky right
observer.observe(sectionHeroEl);
