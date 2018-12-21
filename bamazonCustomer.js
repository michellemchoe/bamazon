var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    dispProducts();
});

function afterConnection() {
    connection.query("SELECT item_id, product_name, price FROM products", function (err, res) {
        if (err) throw err;
        // console.log(JSON.stringify(res, null, 2));
        connection.end();
    });
}

function dispProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // console.log(JSON.stringify(res, null, 2));
    });
    takeUserAction();
}

function takeUserAction() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Product ID:",
                name: "pID"
            },
            {
                type: "input",
                message: "Quantity:  ",
                name: "pQuantity"
            }
        ])
        .then(function (uRequest) {
            checkStock(uRequest.pID, uRequest.pQuantity);
        });
}

function checkStock(u_pID, u_pQuantity) {
    connection.query("SELECT * FROM products WHERE item_id = ?",
        [u_pID], function (err, res) {

            if (err) throw err;
            if (!res[0]) {
                console.log("   Invalid product ID. Please try again.\n");
                takeUserAction();
            }
            else if (res[0].stock_quantity >= u_pQuantity) {
                fulfillOrder(u_pID, res[0].stock_quantity - u_pQuantity);
            }
            else {
                console.log("not enuf");
                inquirer
                    .prompt([
                        {
                            type: "confirm",
                            message: "  Looks like we only have " +
                                res[0].stock_quantity + " " +
                                res[0].product_name + " left in stock. \n" +
                                "    Would you like to edit the quantity to order?",
                            name: "yesEQ"
                        }
                    ])
                    .then(function (uRequest) {
                        if (uRequest.yesEQ) {
                            inquirer
                                .prompt([
                                    {
                                        type: "input",
                                        message: "   New Quantity:",
                                        name: "newQuantity"
                                    }
                                ])
                                .then(function (uRequest) {
                                    checkStock(u_pID, uRequest.newQuantity);
                                })

                        }
                        else {
                            closeBamazonCheck()
                        }
                    })
            }

        });
}

function fulfillOrder(prodID, newQuantity) {

    connection.query("UPDATE products SET ? WHERE ?", [
        {
            stock_quantity: newQuantity
        },
        {
            item_id: prodID
        }
    ],
        function (err, res) {
            if (err) throw err;
            closeBamazonCheck();

        }
    );
}

function closeBamazonCheck() {
    inquirer
        .prompt([
            {
                type: "confirm",
                message: "   Make another purchase?",
                name: "newPurchase"
            }
        ])
        .then(function (uRequest) {
            if (uRequest.newPurchase) {
                takeUserAction();
            }
            else {
                console.log("\n*******************************************************" +
                    "\n***   Thank you for shopping at Bamazon. Goodbye.   ***" +
                    "\n*******************************************************");
                afterConnection();
            }
        })
}