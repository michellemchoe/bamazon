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
                message: "Quantity:",
                name: "pQuantity"
            }
        ])
        .then(function (uRequest) {
            checkStock(uRequest.pID, uRequest.pQuantity);
        });
}

function checkStock(u_pID, u_pQuantity) {
    connection.query("SELECT stock_quantity FROM products WHERE item_id = ?", [u_pID], function (err, res) {
        if (err) throw err;

        if (res[0].stock_quantity >= u_pQuantity) {
            console.log("enuf");
        }
        else {
            // lowStock(uRequest.pID);
            console.log("not enuf");
        }
    });
}

// function lowStock(prodID) {
//     inquirer
//         .prompt([
//             {
//                 type: "confirm",
//                 message: "  Unfortunately, we only have " + 
//             }
//         ])
// }