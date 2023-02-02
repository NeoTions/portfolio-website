// scroll to top
var scrollToTopBtn = document.getElementById("scrollToTopBtn")
var rootElement = document.documentElement

scrollToTopBtn.addEventListener("click", scrollToTop)

function scrollToTop() {
  // Scroll to top logic
  rootElement.scrollTo({
      top: 0,
      behavior: "smooth"
  })
  }


// dark mode assets swap
var dark_mode = window.matchMedia('(prefers-color-scheme: dark)').matches
if (dark_mode) {
  console.log("dark mode");
  let logo = window.document.getElementById("logo");
  let github = window.document.getElementById("github");
  let behance = window.document.getElementById("behance");
  let linkedin = window.document.getElementById("linkedin");
  let instagram = window.document.getElementById("instagram");
}
else
{
  console.log("light mode")
  logo.setAttribute("src","assets/logo-dark.png");
  github.setAttribute("src","assets/icons/github-dark.svg")
  behance.setAttribute("src","assets/icons/behance-dark.svg")
  linkedin.setAttribute("src","assets/icons/linkedin-dark.svg")
  instagram.setAttribute("src","assets/icons/instagram-dark.svg")
}




