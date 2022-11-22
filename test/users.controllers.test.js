const user = require("../controllers/users.controllers");

describe('Valores Booleanos', () => {
    test('Resultado true', () => {
        expect(user.returnUserByEmail("olemiluis@gmail.com")).toBeTruthy();
    });
});