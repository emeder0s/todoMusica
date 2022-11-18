//? 1. Nos traemos la librería puppeteer (Resuelven en promesas)
const puppeteer = require("puppeteer");
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('todo_musica', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
})
sequelize.authenticate()
    .then(() => {
        console.log('Conectado')
    })
    .catch(err => {
        console.log('No conectado: ' + err)
    });

const Instruments = sequelize.define('instruments', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    brand: DataTypes.STRING,
    model: DataTypes.STRING,
    price: DataTypes.STRING,
    category: DataTypes.STRING,
    photo_path: DataTypes.STRING,

}, {
    timestamps: false
});

//? 2. Obtener el navegador que vamos a utilizar.
(async () => {
    // Si headless esta en true, se oculta el chromium
    const browser = await puppeteer.launch({
        headless: false,
    });
    // Es como abrir una nueva página/pestaña en el navegador
    const page = await browser.newPage();
    //Se cierra el navegador
    const guitarras_electricas = await scrapInsert(page, "guitarras_electricas")
    for await (let element of guitarras_electricas) {
        let instrument = await Instruments.create(element)
    }
    const guitarras_clasicas = await scrapInsert(page, "guitarras_clasicas")
    for await (let element of guitarras_clasicas) {
        let instrument = await Instruments.create(element)
    }
    const bajos_electricos = await scrapInsert(page, "bajos_electricos")
    for await (let element of bajos_electricos) {
        let instrument = await Instruments.create(element)
    }
    const instrumentos_de_teclas = await scrapInsert(page, "instrumentos_de_teclas")
    for await (let element of instrumentos_de_teclas) {
        let instrument = await Instruments.create(element)
    }
    const instrumentos_de_arco = await scrapInsert(page, "instrumentos_de_arco")
    for await (let element of instrumentos_de_arco) {
        let instrument = await Instruments.create(element)
    }
    const saxofones = await scrapInsert(page, "saxofones")
    for await (let element of saxofones) {
        let instrument = await Instruments.create(element)
    }
    const trompetas = await scrapInsert(page, "trompetas")
    for await (let element of trompetas) {
        let instrument = await Instruments.create(element)
    }
    const trombones = await scrapInsert(page, "trombones")
    for await (let element of trombones) {
        let instrument = await Instruments.create(element)
    }
    const amplificadores_de_guitarra_electrica = await scrapInsert(page, "amplificadores_de_guitarra_electrica")
    for await (let element of amplificadores_de_guitarra_electrica) {
        let instrument = await Instruments.create(element)
    }
    const drums_acusticos = await scrapInsert(page, "drums_acusticos")
    for await (let element of drums_acusticos) {
        let instrument =  await Instruments.create(element)
    }
    sequelize.close()
    await browser.close()
})();


/** Funcion que nos permite insertar una categoria y busca en la web www.thomann.de los instrumentos mas vendidos. Devuelve el resultado en un array de objetos*/
async function scrapInsert(page, category) {
    // accedemos a la página;
    await page.goto(`https://www.thomann.de/es/${category}.html`);
    // Para hacer click al mensaje de cookies.
    page.waitForXPath("/html/body/div[2]/div/div/div/div[2]/button[1]", { timeout: 0 }).then(() => page.click(".consent-button"))
    await page.waitForTimeout(3000);
    //Hacemos una foto a la página
    const url_img_instrument = await page.$$eval("#topseller > div > div.js-content-wrapper > div > div.fx-grid.fx-grid--cols-10.js-articles > a > div.fx-product-box__image-wrapper.fx-background-color--neutral-100 > div > picture > source:nth-child(1)", (elements) => {
        return elements.map(e => e.dataset.srcset);
    });
    const brand_instrument = await page.$$eval("#topseller > div > div.js-content-wrapper > div > div.fx-grid.fx-grid--cols-10.js-articles > a > div.description.fx-text > span", (elements) => {
        return elements.map(e => e.innerHTML);
    });
    const model_instrument = await page.$$eval("#topseller > div > div.js-content-wrapper > div > div.fx-grid.fx-grid--cols-10.js-articles > a > div.description.fx-text", (elements) => {
        return elements.map(e => e.innerText);
    });
    const price_instrument = await page.$$eval("#topseller > div > div.js-content-wrapper > div > div.fx-grid.fx-grid--cols-10.js-articles > a > div.price > div > span", (elements) => {
        return elements.map(e => e.outerText);
    });
    var resultado = []
    for (let i = 1; i < url_img_instrument.length; i++) {
        let element = {
            category: category,
            brand: brand_instrument[i],
            model: model_instrument[i],
            price: price_instrument[i],
            photo_path: url_img_instrument[i]
        }
        resultado.push(element)
    }
    console.log(resultado)
    return resultado
}
