const axios  = require("axios");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");

const url = 'http://books.toscrape.com/catalogue/category/books/mystery_3/index.html';
const url2 = 'https://www.google.com/search?q=';

module.exports = {

    async show_puppeteer(req, res) {
        const { country_name } = req.params;
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url2 + country_name + '+tempo');
       // await page.screenshot({path: 'example.png'}); 

       const pageContent = await page.evaluate(() => {
            return 
            //document.getElementsByClassName("VQF4g")[0].innerHTML; //Blumenau SC, sábado. 18:00 Chuva
            //document.getElementsByClassName("wob_t")[0].innerHTML; // Temperatura adicionar Cº
            //document.getElementsByClassName("wtsRwe")[0].innerHTML; //chuva 23% umidade 80% Vento    
        /*return {    html: document.getElementsByClassName("nawv0d")[0].innerHTML,
                        temperatura: document.getElementsByClassName("wob_t")[0].innerHTML//Temperatura
            }; */
       });
        
       console.log('pageContent: ', pageContent);

       await browser.close();

       res.send(pageContent);
    },

    async show(req, res) { 
        const { country_name } = req.params;
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url2 + country_name + '+tempo').catch(err => console.log(err));
        // await page.screenshot({path: 'example.png'});

        const pageContent = await page.evaluate(() => {
            return document.getElementsByClassName("VQF4g")[0].innerHTML +
            document.getElementsByClassName("wob_t")[0].innerHTML  + " Cº " +
            document.getElementsByClassName("wtsRwe")[0].innerHTML;
            //document.getElementsByClassName("VQF4g")[0].innerHTML; //Blumenau SC, sábado. 18:00 Chuva
            //document.getElementsByClassName("wob_t")[0].innerHTML; // Temperatura adicionar Cº
            //document.getElementsByClassName("wtsRwe")[0].innerHTML; //chuva 23% umidade 80% Vento    
        }).catch(err => console.log(err));
        
        console.log('pageContent: ', pageContent);
       
        await browser.close();
        res.send(pageContent);
    },

    async show_book(req, res) {
        axios(url)
            .then(response => {
                const html = response.data;
                const document = cheerio.load(html);
                const books_data = [];

                const books = document("article"); //Tag name of the component
                books.each(function () {
                  title = document(this).find("h3 a").text(); //Inside of <h3> <a>
                  price = document(this).find(".price_color").text(); //class price_color
                  stock = document(this).find(".availability").text().trim(); //class instock availability
                  books_data.push({ title, price, stock }); //store in array
                });
                console.log(books_data);//print the array

                res.json(books_data); 

                })
            .catch(err => console.log(err));
    }

}