

const caclulateStoreFee = (storeType,storeValue,boxsize) => {
    let oneDayStorePrice = 0;
    let monthStoreprice = 0;
    if(storeType === "pallet")
    {
    if(storeValue <= 50)
    {
        oneDayStorePrice = 800;
    }
    else if(storeValue <= 100 && storeValue>50)
    {
        oneDayStorePrice = 700;
    }
    else if(storeValue <=500 && storeValue>100)
    {
        oneDayStorePrice = 600;
    }
    else {
        oneDayStorePrice = 500;
    }
    //파레트일떄 월보관료
    console.log(`caclulateStoreFee ${monthStoreprice}`);
   return monthStoreprice = (storeValue * oneDayStorePrice) *30;
    }
    else if(storeType === 'box' )
    {
        let boxcount = 0;
        if(boxsize === null)
        {
            console.log('설마여기로들어오나?');
            return;
        }
        if(boxsize === 'mini')
        {
            boxcount = 40;
        }
        else if(boxsize === 'small')
        {
            boxcount = 20;
        }
        else if (boxsize === 'medium')
        {
            boxcount = 10;
        }
        else if(boxsize === 'large')
        {
            boxcount = 5;
        }
        else {
            boxcount = 1;
        }
        let covnvertToPlt = storeValue / boxcount;

        if(covnvertToPlt <= 50)
         {
        oneDayStorePrice = 800;
         }
         else if(covnvertToPlt <= 100 && covnvertToPlt>50)
          {
        oneDayStorePrice = 700;
          }
         else if(covnvertToPlt <=500 && covnvertToPlt>100)
         {
        oneDayStorePrice = 600;
          }
         else {
        oneDayStorePrice = 500;
         }
        //박스일때 월보관료
        console.log(`caclulateStoreFee when Box ${(covnvertToPlt *oneDayStorePrice) * 30}`);
       return monthStoreprice = (covnvertToPlt * oneDayStorePrice) *30;   
    }

}

const cacluateDeliveryFee = (monthDeliveryCount,outputBoxSize,outputType) => {
    let deliveryFeeBySize = 0;
    let packingFee = 0;
    let monthDeliveryFee = 0;
    if(outputBoxSize === null)
    {
        return;
    }
    if(outputBoxSize === 'mini')
    {
        deliveryFeeBySize = 2000;
    }
    else if(outputBoxSize === 'small')
    {
        deliveryFeeBySize = 2400;
    }
    else if (outputBoxSize === 'medium')
    {
        deliveryFeeBySize = 2900;
    }
    else if(outputBoxSize === 'large')
    {
        deliveryFeeBySize = 3900;
    }
    else {
        deliveryFeeBySize = 7500;
    }

    if(outputType === 'total_packaing')
    {
        packingFee = 400;
    }
    else {
        packingFee = 300;
    }

    return monthDeliveryFee = (deliveryFeeBySize+packingFee)*monthDeliveryCount;
}


//wms이용료

const caclutateWMSfee = (skuCount) => {
    let wmsFee = 0; 
    if(skuCount <=50)
    {
        wmsFee =50000
    }
    else if(skuCount <=100 && skuCount>50)
    {
        wmsFee = 70000
    }
    else {
        wmsFee = 100000
    }
    return wmsFee;
}

export {
    caclulateStoreFee,
    cacluateDeliveryFee,
    caclutateWMSfee,
}