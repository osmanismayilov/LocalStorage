let allAddBtn = document.querySelectorAll(".btn-primary");

if (localStorage.getItem("basket") == null) {
  localStorage.setItem("basket", JSON.stringify([]));
}

// let basket = [];

allAddBtn.forEach((btn) => {
  btn.addEventListener("click", function (ev) {
    ev.preventDefault();
    let Id = this.parentNode.parentNode.getAttribute("data-id");
    let name = this.parentNode.firstElementChild.innerText;
    let image = this.parentNode.previousElementSibling.getAttribute("src");

    if (localStorage.getItem("basket") == null) {
      localStorage.setItem("basket", JSON.stringify([]));
    }

    let basket = JSON.parse(localStorage.getItem("basket"));

    let existPro = basket.find((p) => p.id == Id);
    if (existPro === undefined) {
      basket.push({
        id: Id,
        name: name,
        image: image,
        count: 1,
      });
    } else {
      existPro.count += 1;
    }
    localStorage.setItem("basket", JSON.stringify(basket));
    getBasketCount();
  });
});

let basketCount = document.querySelector(".basketCount");

function getBasketCount() {
  if (localStorage.getItem("basket") != null) {
    let basket = JSON.parse(localStorage.getItem("basket"));
    basketCount.innerText = basket.length;
  } else {
    basketCount.innerText = 0;
  }
}

getBasketCount();

let table = document.querySelector(".table");
let basket = JSON.parse(localStorage.getItem("basket"));

if(basket.length != 0){
    for (const pro of basket) {
        let tdImg = document.createElement("td");
        let img = document.createElement("img");
        img.setAttribute("src", pro.image);
        img.setAttribute("width", "150px");
        tdImg.append(img);
      
        let tdName = document.createElement("td");
        tdName.innerText = pro.name;
      
        let tdCount = document.createElement("td");
        tdCount.innerText = pro.count;
      
        let tr = document.createElement("tr");
        tr.append(tdImg, tdName, tdCount);
      
        table.lastElementChild.append(tr);
      }
}else {
    table.classList.add("d-none");
    table.previousElementSibling.classList.remove("d-none");
}

