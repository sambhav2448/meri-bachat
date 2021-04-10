const HttpError = require('../models/http-error');
const fkart = require('../flipkart-ch');
const amz = require('../reliance-ch');
const croma = require('../paytm-ch');

const getflipkart = async (req, res) => {
  // const url = req.body.url;

  try {
    const fdata = await fkart();

    res.status(200).json({ ProductData: fdata });
  } catch (error) {
    console.log(error);
    console.log('---------------------');
    res.status(404).json({ mesg: 'error in flipkart' });
  }
};

const getcroma = async (req, res) => {
  const url = req.body.url;
  try {
    const cdata = await croma(url);
    // console.log(url);
    res.status(200).json({ ProductData: cdata });
  } catch (error) {
    console.log(error);
    console.log('---------------------');
    res.status(404).json({ mesg: 'error in croma' });
  }
};

const getamazon = async (req, res) => {
  const url = req.body.url;

  try {
    const adata = await amz(url);

    res.status(200).json({ ProductData: adata });
  } catch (error) {
    console.log(error);
    console.log('---------------------');
    res.status(404).json({ mesg: 'error in Reliance digital' });
  }
};

exports.getflipkart = getflipkart;
exports.getcroma = getcroma;
exports.getamazon = getamazon;
