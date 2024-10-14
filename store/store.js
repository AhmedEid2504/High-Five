const open = document.getElementById ('open');
const close = document.getElementById ('close');
const active = document.querySelector ('.active');
const shop = document.getElementById ('shop');
const cartBtn = document.getElementById ('cart-btn');
const cartOverlay = document.querySelector(".cart-overlay");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector(".close-cart");
const cartContent = document.getElementById('cart-content');
const Total = document.querySelector(".cart-footer");


cartBtn.addEventListener('click', () =>{
    if (
        cartOverlay.classList.contains("transparentBcg"),
        cart.classList.contains("showCart")
        ){hideCart();}else {showCart();}
});

closeCart.addEventListener('click', () => {
    hideCart();
})

showCart = () =>  {
    cartOverlay.classList.add("transparentBcg");
    cart.classList.add("showCart");
};

hideCart = () =>  {
    cartOverlay.classList.remove("transparentBcg");
    cart.classList.remove("showCart");
}



open.addEventListener('click', () => {
    if (open.classList.contains('fa-bars')) {
        open.classList.remove('fa-bars');
        open.classList.add('fa-chevron-up');
        active.classList.add('show-nav')
    } else if (open.classList.contains('fa-chevron-up')) {
        open.classList.remove('fa-chevron-up');
        open.classList.add('fa-bars');
        active.classList.remove('show-nav')
    }
})



let basket = JSON.parse(localStorage.getItem("data")) || [];



let genereateShop = ()=>{
    return (shop.innerHTML = shopItemsData.map((x)=>{
        let {id,name,price,desc,img} = x;
        let search = basket.find((x)=> x.id === id) || [];
        return `
        <div id="product-id-${id}" class="item">
            <img src="${img}" alt="hat">
            <div class="details">
                <h3>${name}</h3><h5>${desc}</h5>
                <div class="price-quantity">
                    <h2><span class="dollar">$</span> ${price}</h2>
                    <div class="buttons">
                        <i onclick="decrement(${id})" class="fas fa-2x fa-minus"></i>
                        <div id="${id}" class="quantity">${search.item === undefined? 0: search.item}</div>
                        <i onclick="increment(${id})" class="fas fa-2x fa-plus"></i>
                    </div>
                </div>
            
            </div>
        </div>
    `
    }).join(""));
};

genereateShop();

let clearCart =()=> {
    basket = [];
    totalAmount();
    genereateContent();
    genereateShop();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
}

let genereateContent = ()=>{

    if(basket.length !==0){
            return cartContent.innerHTML = basket.map((x)=>{
                let {id,item}=x;
                let search = shopItemsData.find((y) => y.id === id) || [];
                return `
                    <div class="cart-item">
                        <img src=${search.img} alt="hat" />
                        <div>
                            <h4>${search.name}</h4>
                            <h5>$ ${search.price * item}</h5>
                            <span onclick = "removeItem(${search.id})" class="remove-item">remove</span>
                        </div>
                        <div>
                            <i onclick="increment(${search.id})" class="fas fa-chevron-up"></i>
                            <div class="quantity">${item}</div>
                            <i onclick="decrement(${search.id})" class="fas fa-chevron-down"></i>
                        </div>
                        
                    </div>
                `
            }).join("");
    }else{
        cartContent.innerHTML = `<div class="empty"><h2>Cart is empty</h2></div>`;
    }
};

genereateContent();


let removeItem =(id)=> {

    let selectedItem = id;
    let search = basket.find((x)=> x.id === selectedItem.id);
    if(search === undefined){
        return;
    } else {
        search.item = 0
    }
    update(selectedItem.id);
    basket = basket.filter((x) => x.item !== 0);
    genereateContent();
    totalAmount();
    localStorage.setItem("data", JSON.stringify(basket));
}

let increment = (id)=> {

    let selectedItem = id;
    let search = basket.find((x)=> x.id === selectedItem.id);

    if(search === undefined){
        basket.push({
        id: selectedItem.id,
        item: 1
    });
    } else {
        search.item +=1
    }
    
    update(selectedItem.id);
    genereateContent();
    localStorage.setItem("data", JSON.stringify(basket));
}

let decrement = (id)=> {
    let selectedItem = id;
    let search = basket.find((x)=> x.id === selectedItem.id);

    if(search === undefined) return
    else if(search.item === 0){
        basket.slice({
            id: selectedItem.id,
            item: 1,
        });
        return;
    } else {
        search.item -=1
    }
    
    update(selectedItem.id);
    basket = basket.filter((x) => x.item !== 0);
    genereateContent();
    localStorage.setItem("data", JSON.stringify(basket));
}

let update = (id)=> {
    let search = basket.find((x)=>x.id === id)
    document.getElementById(id).innerHTML = search.item;
    calculation();
    totalAmount();
}

let calculation = ()=> {
    let cartIcon = document.getElementById("cartamount");
    cartIcon.innerHTML = basket.map((x) => x.item ).reduce((x,y) => x+y,0 );
}


calculation();

let totalAmount = () => {
    if (basket.length !==0){
        let amount = basket.map((x) => {
            let {item, id} = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            return item * search.price;
        }).reduce((x,y) => x+y,0);
        Total.innerHTML = `
            <h2>Total Bill: $ ${amount}</h2>
            <button class="checkout banner-btn">Checkout</button>
            <button onclick="clearCart()" class="clear-cart banner-btn">clear cart</button>
        `;
    } else {
        Total.innerHTML = ``;
    };
};

totalAmount();


