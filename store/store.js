const open = document.getElementById ('open');
const close = document.getElementById ('close');
const active = document.querySelector ('.active');
const shop = document.getElementById ('shop');

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

let shopItemsData = [
    {
        id:"hat1",
        name:"casual hat1",
        price: 45,
        desc: "lorem imflsdajh alkhfd iljfldaj kjalk;fdj",
        img: "images/hat1.jpg"
    },{
        id:"hat2",
        name:"casual hat2",
        price: 70,
        desc: "lorem imflsdajh alkhfd iljfldaj kjalk;fdj",
        img: "images/hat2.jpg"
    },{
        id:"hat3",
        name:"casual hat3",
        price: 80,
        desc: "lorem imflsdajh alkhfd iljfldaj kjalk;fdj",
        img: "images/hat3.jpg"
    },{
        id:"hat4",
        name:"casual hat4",
        price: 20,
        desc: "lorem imflsdajh alkhfd iljfldaj kjalk;fdj",
        img: "images/hat4.jpg"
    }
];

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
                    <h2>$ ${price}</h2>
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
    localStorage.setItem("data", JSON.stringify(basket));
}

let decrement = (id)=> {
    let selectedItem = id;
    let search = basket.find((x)=> x.id === selectedItem.id);

    if(search === undefined) return
    else if(search.item === 0){
        basket.slice({
            id: selectedItem.id,
            item: 1
        });
        return;
    } else {
        search.item -=1
    }
    

    update(selectedItem.id);


    basket = basket.filter((x) => x.item !== 0);

    localStorage.setItem("data", JSON.stringify(basket));
}

let update = (id)=> {
    let search = basket.find((x)=>x.id === id)
    document.getElementById(id).innerHTML = search.item;
    calculation();
}

let calculation = ()=> {
    let cartIcon = document.getElementById("cartamount");
    cartamount.innerHTML = basket.map((x) => x.item ).reduce((x,y) => x+y,0 );
}

calculation();

