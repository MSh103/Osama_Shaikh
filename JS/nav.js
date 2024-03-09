
const sideNav = document.getElementById("mySidenav");
const screenWidth = window.innerWidth;
// Function to set the sidebar width based on screen width
function setSidebarWidth() {
  const sideNav = document.getElementById("mySidenav");
  const screenWidth = window.innerWidth;

  if (screenWidth >= 1200) {
      sideNav.style.width = "350px";
      sideNav.style.textAlign = "left";
  } else if (screenWidth >= 810) {
      sideNav.style.width = "250px";
      sideNav.style.textAlign = "left";
  } else if (screenWidth >= 768) {
      sideNav.style.width = "250px";
      sideNav.style.textAlign = "left";
  } else if (screenWidth >= 326) {
      sideNav.style.width = "100%";
      sideNav.style.textAlign = "center";
  } else if (screenWidth >= 375) {
      sideNav.style.width = "100%";
      sideNav.style.textAlign = "center";
  } else if (screenWidth >= 320) {
      sideNav.style.width = "100%";
      sideNav.style.textAlign = "center";
  } else if (screenWidth >= 280) {
      sideNav.style.width = "100%";
      sideNav.style.textAlign = "center";
  }
}

function openNav() {
  setSidebarWidth();
  window.addEventListener("resize", setSidebarWidth);
}
function closeNav() {
      sideNav.style.width = "0";
}

