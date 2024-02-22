let data = [
    {
        id:1,
        rasm:"./img/rasm1.png",
        name:"product name",
        price:120000,
        count:1,
    },
    {
        id:2,
        rasm:"./img/rasm2.png",
        name:"product name",
        price:170000,
        count:1,
    },
    {
        id:3,
        rasm:"./img/rasm3.png",
        name:"product name",
        price:120000,
        count:1,
    },
    {
        id:4,
        rasm:"./img/rasm4.png",
        name:"product name",
        price:180000,
        count:1,
    },
    {
        id:5,
        rasm:"./img/rasm5.png",
        name:"product name",
        price:150000,
        count:1,
    },
    {
        id:6,
        rasm:"./img/rasm6.png",
        name:"product name",
        price:145000,
        count:1,
    },
    {
        id:7,
        rasm:"./img/rasm3.png",
        name:"product name",
        price:110000,
        count:1,
    },
    {
        id:8,
        rasm:"./img/rasm1.png",
        name:"product name",
        price:130000,
        count:1,
    },
    {
        id:9,
        rasm:"./img/rasm3.png",
        name:"product name",
        price:200000,
        count:1,
    },
    {
        id:10,
        rasm:"./img/rasm4.png",
        name:"product name",
        price:100000,
        count:1,
    },
];
for (let i=0; i<data.length; i++){
    const element =data [i];
    let otaElement =document.getElementsByClassName("card_box")[0];
    otaElement.innerHTML += `
    <div class="card">
    <figure>
    <img src="${element.rasm}" alt="${element.name}">
    </figure>
    <h1>${element.name}</h1>
    <p>${element.price} so'm</p>
    <div class="btn">
    <button onclick="addToCart('${element.id}')" >add to cart</button>
    </div>
    </div>
    `;
}
let showCart = () => {
    let karzinka_container =document.querySelector(".karzinka_container");
    karzinka_container.style.display = "flex";
    document.body.style.overflow = "hidden";
};
let closeCart = () => {
    let karzinka_container = document.querySelector(".karzinka_container");
    karzinka_container.style.display = "none";
    document.body.style.overflow = "auto";
};
let cart = [];
let cartCount = document.querySelector(".cart_box span");

const addToCart = (text) => {
    let yangiElement = data.find((item) => item.id == text);
    if( !cart.find((c) => c.id === yangiElement.id)){
        cart.push(yangiElement);
        cartToRender();
    } else {
        cart= cart.map((c) => {
            if(c.id === + text){
                return { ...c, count: c.count + 1};
            } else {
                return c;
            }
        });
        document.querySelector(`#id${text}`).innerHTML = cart.find(
            (item) => item.id == text
        ).count;
    }
    cartCountFunc();
    handleTotalPrice();
};

const cartToRender  = () => {
    let cartBoxer = document.querySelector(".cartBoxer");
    cartBoxer.innerHTML = "";
    if (cart.length > 0){
        for ( let i=0; i<cart.length; i++){
            const element =cart[i];
            cartBoxer.innerHTML += `
            <div class="cartBox">
            <div class="cart">
            <div class="cart_flex">
            <figure>
            <img src="${element.rasm}" alt="">
            </figure>
            <h1>product name1</h1>
            </div>
            <div class="narx" id="price${element.id}">
            ${element.price * element.count}
            </div>
            <div class="btns">
            <button onclick='handleMinus(${element.id})' >-</button>
            <p id='id${element.id}'> ${element.count} </p>
            <button onclick='handlePlus(${element.id})'>+</button>
            </div>
            <div> <button class='del_icon' oncick="handleDelete('${element.id}')"> 
            <i class="fa-regular fa-trash-can"></i></button> </div>
            </div>
            </div>
             `;
        }
    } else {
        cartBoxer.innerHTML = `<p class='noData' > noData ... </p>`;
    }
};

cartToRender();
const funksiyaniBekorQil = (e) => {
    e.stopPropagation();
};

function handleTotalPrice() {
    let totalPrice = document.querySelector(".totalPrice");
    totalPrice.innerHTML = 
    cart.reduce((a,b) => a+b.price *b.count,0) + "so'm";
}
handleTotalPrice();

let handleMinus = (ID) => {
    cart =cart.map((p) =>{
        if (p.id === ID && p.count >0){
            return { ...p, count:p.count -1};
        } else {
            return p;
        }
    });
    cart =cart.filter((item) => item?.count !== 0);
    let item =cart.find((item) => item.id === ID);
    if (item){
        document.querySelector(`#id${ID}`).innerHTML =item.count;
        document.querySelector(`#price${ID}`).innerHTML = item.count *item.price;
    } else { if (confirm("ma'lumot ochib ketadi")) {
        cartToRender();
        cartCountFunc();
    }
}
handleTotalPrice();
};

let handlePlus = (ID) => {
    cart = cart.map((c) => {
        if (c.id === ID){
            return { ...c , count: c.count +1};
        } else {
            return c;
        }
    });
    let item =cart.find((c) => c.id === ID);
    document.querySelector(`#id${ID}`).innerHTML =item.count;
    handleTotalPrice();
    document.querySelector(`#price${ID}`).innerHTML = item .count * item.price;
};

const handleDelete = (nimadir) => {
    if(confirm("ishonchinngiz komilmi ?")) {
        cart = cart.filter((item)  => item.id === +nimadir);
        cartToRender();
    }
    cartCountFunc();
    handleTotalPrice();
};

const cartCountFunc = () => {
    if (cart.length >0){
        cartCount.style.display = "inline";
        cartCount.innerHTML = cart.length;
    } else {
        cartCount.style.display ="none";
    }
};
cartCountFunc();