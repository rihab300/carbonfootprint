const CarbonFootprint = require('../models/carbonFootprint');

exports.calculateCarbonFootprint = async (req, res) => {
  try {
    const { productDetails, manufacturingData, transportationInfo } = req.body;

    const carbonFootprintValue = CarbonFootprint.calculate(
      productDetails,
      manufacturingData,
      transportationInfo
    );

    const newCarbonFootprint = new CarbonFootprint({
      product_id: productDetails.productId, 
      carbon_value: carbonFootprintValue.value,
      calculation_date: new Date(),
      created_at: new Date()
    });
    await newCarbonFootprint.save();

    res.status(200).json({ carbonFootprint: carbonFootprintValue });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
 
