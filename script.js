// Data
const menuUrl =
  "https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json";

// Global variable to save menu in variable to get it accessed throughtout the script
var menu = [];

// Functions

// Function to fetch and get the food items from the JSON and show them to a user
async function getMenu() {
  const response = await fetch(menuUrl);
  const data = await response.json();
  menu = data;
  console.log("menu", menu);
  const menuItems = document.getElementById("menuItems");

  data.forEach((item) => {
    const menuItem = document.createElement("div");
    menuItem.classList.add("menu-item");
    menuItem.classList.add("col-lg-4");
    menuItem.classList.add("col-md-6");
    menuItem.classList.add("col-xs-12");

    menuItem.innerHTML = `
            <div class="card">
                <img src="${item.imgSrc}" alt="${item.name}">
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text"> $${item.price.toFixed(2)} </p>
                </div>
            </div>
        `;
    // Appended created menu items cards in menuItems div
    menuItems.appendChild(menuItem);
  });
}

//Function to return a promise and should take 2500 milliseconds to resolve the order
function takeOrder() {
  return new Promise((resolve) => {
    setTimeout(() => {
      // choose any 3 burgers randomly and add them in the object
      const randomItems = menu
        .slice()
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      console.log("takeOrder: ", randomItems);
      resolve(randomItems);
    }, 2500);
  });
}

//Function to returns a promise and takes 1500 milliseconds to resolve and the
function orderPrep() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const preparedOrder = {
        order_status: true,
        paid: false,
      };
      console.log("OrderPrep: ", preparedOrder);
      resolve(preparedOrder); //resolve is returning {order_status:true; paid:false}
    }, 1500);
  });
}

//Function to  returns a promise and takes 1000 milliseconds to resolve
function payOrder() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const paidOrder = {
        order_status: true,
        paid: true,
      };
      console.log("payOrder: ", paidOrder);
      resolve(paidOrder); //resolve returns the object {order_status:true; paid:true}
    }, 1000);
  });
}

// Function to give an alert on the screen saying thankyou for eating with us today!
function thankYou() {
  alert("Thank you for eating with us today!");
}

// Event Listeners
// Execute following functions on DOMContentLoaded event
document.addEventListener("DOMContentLoaded", async () => {
  // First get menu by fetching from api
  await getMenu();

  // calling takeOrder function assuming that the user is ordering
  const order = await takeOrder(); //take order of random 3 burgers

  const preparedOrder = await orderPrep(order); //prepare order of taken order

  const paidOrder = await payOrder(preparedOrder); //pay prepared order

  // Show thank you note alert if order is paid
  if (paidOrder.paid) {
    thankYou(); //show alert for thank you message
  }
});
