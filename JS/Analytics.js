// Analytics.js - Coffee Shop Order Analytics

const orders = [
  { id: 1, customer: "Rami", items: ["latte", "croissant"], total: 7.5 },
  { id: 2, customer: "Lea", items: ["espresso"], total: 3.0 },
  { id: 3, customer: "Rami", items: ["latte", "muffin"], total: 8.0 },
  { id: 4, customer: "Karim", items: ["mocha", "croissant"], total: 9.0 },
  { id: 5, customer: "Lea", items: ["latte"], total: 4.5 },
  { id: 6, customer: "Nour", items: ["espresso", "latte", "muffin"], total: 10.5 }
];

const mondayCustomers = ["Rami", "Lea", "Karim", "Nour"];
const tuesdayCustomers = ["Lea", "Nour", "Tony", "Rami", "Lea"];

// ==========================================
// Part A: Arrays and Array Methods
// ==========================================

// this function returns the sum of all order totals using reduce
function getTotalRevenue(orders) {
    return orders.reduce(function(sum, order) {
        return sum + order.total;
    }, 0);
}

// this function returns the orders whose total is greater than or equal to min using filter
function getBigOrders(orders, min) {
    return orders.filter(function(order) {
        return order.total >= min;
    });
}

// this function uses map to return an array of formatted order summary strings
function getOrderSummaries(orders) {
    return orders.map(function(order) {
        return "#" + order.id + " " + order.customer + " " + order.items.length + " item(s) $" + order.total.toFixed(2);
    });
}

// this function returns a new array sorted from highest total to lowest without mutating the original array
function getSortedByTotal(orders) {
    let ordersCopy = [...orders];
    ordersCopy.sort(function(a, b) {
        return b.total - a.total;
    });
    return ordersCopy;
}

// this function returns the ids of all orders that contain the specified item
function findOrdersByItem(orders, item) {
    let matchingOrders = orders.filter(function(order) {
        return order.items.includes(item);
    });
    
    return matchingOrders.map(function(order) {
        return order.id;
    });
}


// ==========================================
// Part B: Objects as Counters
// ==========================================

// this function returns an object that counts how many times each item was ordered
function countItems(orders) {
    let counts = {};
    orders.forEach(function(order) {
        order.items.forEach(function(item) {
            if (counts[item]) {
                counts[item]++;
            } else {
                counts[item] = 1;
            }
        });
    });
    return counts;
}

// this function uses countItems to return the most ordered item
function getMostPopularItem(orders) {
    let counts = countItems(orders);
    let maxCount = 0;
    let popularItem = "";
    
    for (let item in counts) {
        if (counts[item] > maxCount) {
            maxCount = counts[item];
            popularItem = item;
        }
    }
    return popularItem;
}

// this function returns an object with the total spent by each customer
function getSpendingPerCustomer(orders) {
    let spending = {};
    orders.forEach(function(order) {
        if (spending[order.customer]) {
            spending[order.customer] += order.total;
        } else {
            spending[order.customer] = order.total;
        }
    });
    return spending;
}


// ==========================================
// Part C: Working with Set
// ==========================================

// this function returns an array of unique customer names using a Set
function getUniqueCustomers(orders) {
    let uniqueSet = new Set(orders.map(function(order) {
        return order.customer;
    }));
    return Array.from(uniqueSet);
}

// this function returns an array of every distinct item ordered using flatMap and a Set
function getAllItems(orders) {
    let distinctItems = new Set(orders.flatMap(function(order) {
        return order.items;
    }));
    return Array.from(distinctItems);
}

// convert monday and tuesday customer arrays into Sets
let setA = new Set(mondayCustomers);
let setB = new Set(tuesdayCustomers);

// this function returns customers who came on both days (intersection)
function bothDays(setA, setB) {
    let intersection = new Set([...setA].filter(function(customer) {
        return setB.has(customer);
    }));
    return Array.from(intersection);
}

// this function returns customers who came only on Monday (difference)
function onlyFirstDay(setA, setB) {
    let difference = new Set([...setA].filter(function(customer) {
        return !setB.has(customer);
    }));
    return Array.from(difference);
}

// this function returns everyone who came on either day (union)
function allCustomers(setA, setB) {
    let union = new Set([...setA, ...setB]);
    return Array.from(union);
}

/*
  Explanation: The number of distinct Tuesday customers is 4 and not 5 
  because the name "Lea" appears twice in the tuesdayCustomers array, 
  and a Set automatically removes duplicate values.
*/


// ==========================================
// Execution / Console Logs
// ==========================================

console.log("Total revenue:", getTotalRevenue(orders));
console.log("Big orders:", getBigOrders(orders, 8));
console.log("Order summaries:", getOrderSummaries(orders));
console.log("Sorted by total:", getSortedByTotal(orders));
console.log("Orders with 'muffin':", findOrdersByItem(orders, "muffin"));
console.log("Count items:", countItems(orders));
console.log("Most popular item:", getMostPopularItem(orders));
console.log("Spending per customer:", getSpendingPerCustomer(orders));
console.log("Unique customers:", getUniqueCustomers(orders));
console.log("All distinct items:", getAllItems(orders));
console.log("Customers on both days:", bothDays(setA, setB));
console.log("Customers only on Monday:", onlyFirstDay(setA, setB));
console.log("All customers (Union):", allCustomers(setA, setB));
console.log("Distinct Tuesday customers count:", setB.size);