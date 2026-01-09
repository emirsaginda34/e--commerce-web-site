document.addEventListener("DOMContentLoaded", () => {

    /* NAVBAR */
    const toggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (toggle && navLinks) {
        toggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    }

    /* ACCORDION */
    const questions = document.querySelectorAll(".question li");
    const contents = document.querySelectorAll(".content");

    questions.forEach(item => {
        item.addEventListener("click", () => {
            const targetId = item.dataset.target;
            const targetContent = document.getElementById(targetId);
            const arrow = item.querySelector(".arrow");

            const isOpen = targetContent.classList.contains("active");

            contents.forEach(c => c.classList.remove("active"));
            questions.forEach(q => {
                const a = q.querySelector(".arrow");
                if (a) a.style.transform = "rotate(0deg)";
            });

            if (!isOpen) {
                targetContent.classList.add("active");
                arrow.style.transform = "rotate(90deg)";
            }
        });
    });

});

let cartCount = 0;

const cartWrapper = document.querySelector(".cart-wrapper");
const cartCountEl = document.querySelector(".cart-count");

document.querySelectorAll(".btn-cart").forEach(button => {
  button.addEventListener("click", function () {

    // Daha önce eklendiyse tekrar ekleme
    if (this.classList.contains("added")) return;

    const productCard = this.closest(".product-card");
    const productImg = productCard.querySelector("img");

    // Görselin kopyasını oluştur
    const flyImg = productImg.cloneNode(true);
    flyImg.classList.add("fly-img");

    const imgRect = productImg.getBoundingClientRect();
    const cartRect = cartWrapper.getBoundingClientRect();

    flyImg.style.left = imgRect.left + "px";
    flyImg.style.top = imgRect.top + "px";
    flyImg.style.width = imgRect.width + "px";

    document.body.appendChild(flyImg);

    // Animasyonu başlat
    setTimeout(() => {
      flyImg.style.left = cartRect.left + "px";
      flyImg.style.top = cartRect.top + "px";
      flyImg.style.width = "40px";
      flyImg.style.opacity = "0";
    }, 50);

    // Animasyon bitince
    setTimeout(() => {
      flyImg.remove();

      cartCount++;
      cartCountEl.textContent = cartCount;
      cartCountEl.classList.add("pop");

      setTimeout(() => cartCountEl.classList.remove("pop"), 300);

      // Buton durumu
      this.classList.add("added");

    }, 900);
  });
});