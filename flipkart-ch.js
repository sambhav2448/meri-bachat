const cheerio = require('cheerio');
const axios = require('axios');
module.exports = getData = async () => {
  const response = await axios.get(
    // url
    'https://www.flipkart.com/boat-bassheads-103-red-wired-headset/p/itm6439b78809ed2'
  );

  const $ = cheerio.load(response.data);
  const pdk_name = $('.B_NuCI').text();
  const price1 = $('._30jeq3').text();
  const fpkprice1 = price1.replace(',', '');
  const fpk_price = parseFloat(fpkprice1.replace('₹', ''));
  prod_rating_text = $('._1lRcqv>div').html();
  prod_rating = parseFloat(prod_rating_text.split('<')[0]);
  let org_price;

  if ($('._2p6lqe')) {
    org_price1 = $('._2p6lqe').text().replace('₹', '');
    org_price = parseFloat(org_price1.replace(',', ''));
  } else {
    org_price = fpk_price;
  }
  const prod_img = $('._396cs4').attr('src');

  return { pdk_name, fpk_price, prod_rating, org_price, prod_img };

  console.log({ pdk_name, fpk_price, prod_rating, org_price, prod_img });
};

// getData();
