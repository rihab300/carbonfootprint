const mongoose = require('mongoose');

const carbonFootprintSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product' 
  },
  carbon_value: {
    type: Number,
    required: true
  },
  calculation_date: {
    type: Date,
    default: Date.now
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

carbonFootprintSchema.statics.calculate = function (productDetails, manufacturingData, transportationInfo) {
  const carbonFootprintValue = (
    productDetails.emissionFactor *
    manufacturingData.manufacturingEmissions +
    transportationInfo.transportEmissions
  ).toFixed(2);

  return {
    value: carbonFootprintValue,
    unit: 'kg CO2e' // Unit of measurement
  };
};

const CarbonFootprint = mongoose.model('CarbonFootprint', carbonFootprintSchema);

module.exports = CarbonFootprint;


  