const CaclulateStoreFee = (storeType, storeValue) => {
  let oneDayStorePrice = 600;
  let monthStoreprice = 0;
  let boxcount = 70;
  if (storeType === "pallet") {
    //파레트일떄 월보관료
    console.log(`caclulateStoreFee ${monthStoreprice}`);
    return (monthStoreprice = storeValue * oneDayStorePrice * 30);
  } else if (storeType === "box") {
    let covnvertToPlt = Math.floor(storeValue / boxcount);

    //박스일때 월보관료
    console.log(
      `caclulateStoreFee when Box ${covnvertToPlt * oneDayStorePrice * 30}`
    );
    return (monthStoreprice = covnvertToPlt * oneDayStorePrice * 30);
  }
};

const CacluateDeliveryFee = (monthDeliveryCount, outputType) => {
  let deliveryFeeBySize = 2900;
  let packingFee = 0;
  let monthDeliveryFee = 0;

  if (outputType === "total_packaing") {
    packingFee = 400;
  } else {
    packingFee = 300;
  }

  return (monthDeliveryFee =
    (deliveryFeeBySize + packingFee) * monthDeliveryCount);
};

//wms이용료

const CaclutateWMSfee = (skuCount) => {
  let wmsFee = 100000;
  return wmsFee;
};

export { CaclulateStoreFee, CacluateDeliveryFee, CaclutateWMSfee };
