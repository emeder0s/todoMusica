const order = require("../controllers/order.controllers");


describe('Valores Booleanos', () => {
    test('Resultado true', () => {
        expect(order.get_by_user("olemiluis@gmail.com")).toBeTruthy();
    });
});