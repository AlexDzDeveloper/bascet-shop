const products = [
  {
    name: 'cucumber',
    amount: 10,
    unit: 'kg',
    price: 120,
    currency: 'hryvnias',
  },
  {
    name: 'tomato',
    amount: 15,
    unit: 'kg',
    price: 55,
    currency: 'hryvnias',
  },
  {
    name: 'potato',
    amount: 50,
    unit: 'kg',
    price: 22,
    currency: 'hryvnias',
  },
  {
    name: 'radish',
    amount: 30,
    unit: 'kg',
    price: 10,
    currency: 'hryvnias',
  },
  {
    name: 'watermelon',
    amount: 5,
    unit: 'kg',
    price: 100,
    currency: 'hryvnias',
  },
];

let cartItems = [];


const getTotal = localStorage.getItem('cartItems');
cartItems = !getTotal ? [] : JSON.parse(getTotal) ;

let totalPrice = {};

const liDelete = (name) => {
  // totalPrice[name] = 0;
total = document.querySelector('.total__price');
  // console.log(total);
//   total.innerText = 'Total' + '     ' + Object.values(totalPrice).reduce((prev, item) => {
//     return prev + item;
//   });
document.querySelector(`#liId_${name}`).remove();
cartItems.find((cartItem) => {
  return cartItem.name == name;      //повертає {} з [], порівнює по name
});
// console.log(name);
const index = cartItems.findIndex((item) => item.name == name);
if(index !== -1) {
  cartItems.splice(index, 1)
}
let bill = cartItems.reduce((acc, item) => {
  acc += (item.amount * item.price);
  console.log(acc);
  return acc;
}, 0);
total.innerText = 'Total' + ' ' + `${bill}`;

// let findProduct =
  // cartItems.findIndex((item, index) => {
  //   if(item.index === index) {
  //     console.lof(totalPrice[index]);
  //     for(let i = 0; i < cartItems.length; i++) {
  //       cartItems[item].splice(item, 1);
  //       console.log(cartItems);
  //     }
  //   }
  //   // console.log(index);
  // })

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  // console.log(cartItems);
};

const htmlFromStorage = document.querySelector('.list');

//Дістаю значення з localStorage. Кріейтю HTML
let totalSum = 0;

let checkStorage = cartItems.forEach((item) => {
  const listFromStorage = document.createElement('div');
  listFromStorage.id = `liId_${item.name}`;
  listFromStorage.classList.add("liDelete");
  let createLiFromStorage = document.createElement('li');
  let multiplication = item.amount * item.price;
  totalSum += multiplication;
  createLiFromStorage.innerText = `${item.name} ${parseInt(item.amount)} ${item.unit} x ${item.price} = ${multiplication} ${item.currency}`;
  listFromStorage.innerHTML = createLiFromStorage.outerHTML + `<buttom class="delete" onclick="liDelete('${item.name}')"></buttom>`;
  htmlFromStorage.append(listFromStorage);
});

let totalHTML = document.querySelector('.total__price');
totalHTML.innerHTML = `Total ${totalSum}`;
// console.log(totalSum);

products.forEach((productPrice, index) => {

  function ucFirst(str) {
    if (!str) return str;
    return str[0].toUpperCase() + str.slice(1);
  };

  const productElement = document.querySelector('.products');
  const productHTML = document.createElement('div');
  productHTML.innerHTML = `<div class="product" id="product">
  <div class="product_name"><h3>${ucFirst(productPrice.name)}</h3></div>
  <div class="product_price" id="price"price>${productPrice.price} ${productPrice.currency} / ${productPrice.unit}</div>
  <div class="counter">
    <div class="counter_product" data-counter id="${productPrice.name}_${index}">
      <button class="counter__btn counter__btn_minus" id="away" onclick="myFunctionMinus('#input_${index}')">-</button>
      <input class="counter__input" id="input_${index}" type="number" value="0">
      <button class="counter__btn counter__btn_plus" id="add" onclick="myFunctionPlus('#input_${index}', ${productPrice.amount})">+</button>
    </div>
    <button role="button" class="add_cart" id="add_cart" onclick="addToCart('#input_${index}', '${productPrice.name}', '${productPrice.unit}', '${productPrice.price}', '${productPrice.currency}', '${productPrice.amount}')">Add to cart</button>
    </div>
  </div> `;

productElement.append(productHTML);
});

const myFunctionMinus = (arg) => {
  const input = document.querySelector(arg);
  if (input.value > 0) {
    input.stepDown();
  };
};

const myFunctionPlus = (arg, productAmount) => {
  const input = document.querySelector(arg);
  if (input.value < productAmount) {
    input.stepUp();
  };
};

const btnOrder2 = document.querySelector('#order');
function btnOrder() {
  document.querySelector('.list').innerHTML = ' ';
  total = document.querySelector('.total__price');
  totalPrice = {};
  total.innerText = 'Total 0';
  };
btnOrder2.onclick = btnOrder;

const addToCart = (arg, name, unit, price, currency, amount) => {

  const input = document.querySelector(arg);

  let newObj = {
    name: name,
    unit: unit,
    price: price,
    currency: currency,
    amount: input.value,
    maxAmount: amount,
  };

  const productInCart = cartItems.find((cartItem) => {
    return cartItem.name == newObj.name; //повертає {} з [], порівнює по name
  });

//проверка input.value = 0 -> виходити з ф-ції
  if(parseInt(input.value) === 0) return;


  if(productInCart) {
    productInCart.amount = parseInt(productInCart.amount) + parseInt(input.value);
  } else {
    cartItems.push(newObj);
  }
  const productList = document.querySelector('.list');
  const summ = input.value * price;
  const productLi = document.querySelector(`#liId_${name}`);
  if (productLi) {
    let totalAmount = parseInt(productInCart.amount);
    if (totalAmount > amount) {
      productInCart.amount = amount;
      totalAmount = amount;
    };
    const productLiPrice = parseInt(totalAmount) * price;
    totalPrice[name] = productLiPrice;
    productLi.innerHTML = name + ' ' + totalAmount + ' ' + unit + ' x ' + price + ' = ' + productLiPrice + currency + `<buttom class="delete" onclick="liDelete('${name}')"></buttom>`;
    // productLi.setAttribute('data_amount', parseInt(totalAmount));
    productList.append(productLi);
    // productList.setAttribute('data_amount__total', parseInt(productLiPrice));
  } else {
    if (input.value > 0) {
      totalPrice[name] = summ;
      const li = document.createElement('div');
      li.id = `liId_${name}`;
      // li.setAttribute('data_amount', input.value);
      li.classList.add("liDelete");
      const liProduct = document.createElement('li');
      liProduct.innerText = name + ' ' + input.value + ' ' + unit + ' x ' + price + ' = ' + summ + ' ' + currency;
      li.innerHTML = liProduct.outerHTML + `<buttom class="delete" onclick="liDelete('${name}')"></buttom>`;
      productList.append(li);
    };
  };
  total = document.querySelector('.total__price');
  total.innerText = 'Total' + '     ' + Object.values(totalPrice).reduce((prev, item) => {
      return prev + item;
  });
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

