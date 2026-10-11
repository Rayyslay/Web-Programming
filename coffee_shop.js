// this function validates the input of the user, applies discounts whenever applicable, and calculates the total of the customer's order
function calculatePrice(size, quantity, isMember, hour) {
    size = size.toLowerCase();
    //the if statements are for validation
    if(size !=="small" && size!=="medium" && size!=="large") {
        return "Invalid Size.";
    }
    if(quantity<=0 || !Number.isInteger(quantity)) {
        return "Invalid quantity.";
    }
    if(!Number.isInteger(hour) || hour<0 || hour > 23) {
        return "Invalid hour.";
    }
    else {
        let pricePerCup, subtotal;
        //the switch case specifies the price of a cup in each size
        switch(size) {
           case "small":
            pricePerCup=2.50;
            break;
            case "medium":
                pricePerCup=3.50;
                break;
            case "large":
                pricePerCup = 4.50;
                break;

        }
        //this equation is to calculate the total
        subtotal = quantity*pricePerCup;
        //the if statements apply discounts if the quantity is 5 or more, if the customer is a member, or if time is between 15:00 and 17:00
        if(quantity >= 5) {
            subtotal-=subtotal*(10/100);
        }
        if(isMember) {
                subtotal-=subtotal*(5/100);
            }
        if(hour >= 15 && hour <= 17) {
            subtotal--;
        }
        if(subtotal <0) {
            return 0;
        }


        return Math.round(subtotal * 100)/100;
    }
}
console.log("Part A:");
console.log("The price is "+ calculatePrice("large", 2, false, 10));
console.log("The price is "+ calculatePrice("medium", 5, true, 16));
console.log("The price is "+ calculatePrice("small", 4, true, 9) );
console.log("The price is "+ calculatePrice("small", 1, false, 15));
console.log("The price is "+ calculatePrice("xl", 1, false, 9) );
console.log("The price is "+ calculatePrice("large", 0, false, 9));
console.log("The price is "+ calculatePrice("large", 2.5, true, 9));
console.log("The price is "+ calculatePrice("medium", 2, true, 25));
console.log(" ");

//this function prints the prices of orders with varying quantities from 1 to 10
function printPriceTable(size, isMember, hour) {
    for(quantity = 1; quantity<=10; quantity++) {
      console.log("Qty "+quantity+" -> "+ calculatePrice("medium", quantity, false, 16).toFixed(2));
    }
}
console.log("Part B");
printPriceTable("medium", false, 16);
console.log(" ");

//this function finds the first hour that brings the customer to the lowest possible price of his order
function cheapestHour(size, quantity, isMember) {
    let cheapestPrice = calculatePrice(size, quantity, isMember, 0);
    let cheapestHour= 0;
        for(hour = 1; hour <= 23; hour++) {
            let currentPrice = calculatePrice(size, quantity, isMember, hour);
            if(cheapestPrice > currentPrice) {
                cheapestPrice = currentPrice;
                cheapestHour = hour;
            }
        }
    
    return cheapestHour;
}
let cheapHour = cheapestHour("large", 3, false);

console.log("Part C");
let bestHour = cheapestHour("large", 3, false);

console.log("The best time to order 3 large coffees is at " + String(bestHour).padStart(2, "0") + ":00 for $" + calculatePrice("large", 3, false, bestHour).toFixed(2));

