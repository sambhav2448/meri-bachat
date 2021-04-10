const cheerio = require('cheerio');
const axios = require('axios');

module.exports = getData = async (url) => {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    if ($('.pdp__offerPrice')) {
      theid = '.pdp__offerPrice';
    } else {
      theid = '#priceblock_ourprice';
    }

    price1 = $(theid).text();
    nameofprod = $('.pdp__title').text();
    const price2 = price1.replace('₹', '');
    const amz_price = parseFloat(price2.replace(',', ''));

    if ($('.pdp__mrpPrice')) {
      org_price1 = $('.pdp__mrpPrice').text().replace('₹', '');
      org_price = parseFloat(org_price1);
    } else {
      org_price = amz_price;
    }
    return { amz_price, nameofprod, org_price };
  } catch (err) {
    console.log(err);
    return err;
  }
};
