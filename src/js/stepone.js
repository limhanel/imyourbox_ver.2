//카카오

//상품종류
const product_category = [];
const buttons_category = document.querySelectorAll(
    "ul.stepone__category__list>li>input"
);
const CLICKED_CLASS = "clicked";
const white = "#ffffff";
buttons_category.forEach((e) => {
    e.addEventListener("click", () => {
        const checked__icon = e.parentElement.childNodes[2];
        const splitCategory = e.className.split(" ")[1];
        if (product_category.includes(splitCategory)) {
            product_category.splice(product_category.indexOf(splitCategory), 1);
            checked__icon.style.color = "#ffffff";
            checked__icon.style.opacity = 0.7;
        } else {
            product_category.push(splitCategory);
            checked__icon.style.color = "#f18b24";
            checked__icon.style.opacity = 0.7;
        }

        e.classList.toggle(CLICKED_CLASS);
    });
});

//상세 품목
let detailInput = "";

const input_detail = document.querySelector(".detail__input");
input_detail.addEventListener("input", (e) => {
    detailInput = e.target.value;
    console.log(detailInput);
    input_detail.style.backgroundColor = white;
});

//보관형태
const arr_storage_type = [];
const buttons_storage_type = document.querySelectorAll(
    "ul.storageType__container__buttons > li> input"
);

buttons_storage_type.forEach((e) => {
    e.addEventListener("click", () => {
        const checked__icon = e.parentElement.childNodes[2];
        const splitStorageType = e.className.split(" ")[1];
        if (arr_storage_type.includes(splitStorageType)) {
            arr_storage_type.splice(arr_storage_type.indexOf(splitStorageType), 1);
            e.style.color = "#474747";
            checked__icon.style.color = "#ffffff";
            checked__icon.style.opacity = 0.7;
        } else {
            arr_storage_type.push(splitStorageType);
            checked__icon.style.color = "#f18b24";
            checked__icon.style.opacity = 0.7;
            e.style.color = "#f18b24";
        }
        console.log(arr_storage_type);
        e.classList.toggle(CLICKED_CLASS);
    });
});

//바코드여부

let barcodeValue = "";
const radio__havebarcode = document.querySelector(".barcode__radio__groups");
radio__havebarcode.addEventListener("change", (e) => {
    const selected = document.querySelectorAll(".barcode__radio__groups > li");
    const black = "#000000";
    const selectedColor = "#f18b24";
    barcodeValue = e.target.value;
    switch (barcodeValue) {
        case "have_barcode":
            selected[0].style.boxShadow = "0px 0px 5px 0px #ff9948";
            selected[1].style.boxShadow = "0px 0px 5px 0px rgba(0, 0, 0, 0.15)";
            selected[2].style.boxShadow = "0px 0px 5px 0px rgba(0, 0, 0, 0.15)";
            selected[0].style.color = selectedColor;
            selected[1].style.color = black;
            selected[2].style.color = black;
            break;
        case "no_barcode":
            selected[1].style.boxShadow = "0px 0px 5px 0px #ff9948";
            selected[0].style.boxShadow = "0px 0px 5px 0px rgba(0, 0, 0, 0.15)";
            selected[2].style.boxShadow = "0px 0px 5px 0px rgba(0, 0, 0, 0.15)";
            selected[0].style.color = black;
            selected[1].style.color = selectedColor;
            selected[2].style.color = black;
            break;
        case "part_barcode":
            selected[2].style.boxShadow = "0px 0px 5px 0px #ff9948";
            selected[1].style.boxShadow = "0px 0px 5px 0px rgba(0, 0, 0, 0.15)";
            selected[0].style.boxShadow = "0px 0px 5px 0px rgba(0,0,0,0.15)";
            selected[0].style.color = black;
            selected[1].style.color = black;
            selected[2].style.color = selectedColor;
            break;
        default:
            break;
    }
});

//optional

//대표상품 URL
let product_url = "";
const input_product_url = document.querySelector(".productURL__input");

input_product_url.addEventListener("input", (e) => {
    product_url = e.target.value;
    input_product_url.style.backgroundColor = white;
    console.log(product_url);
});

//상품취급 주의사항
const arr_caution_product_type = [];
const buttons_caution_product_type = document.querySelectorAll(
    "ul.productCaution__list > li> input"
);

buttons_caution_product_type.forEach((e) => {
    // console.log(e)
    e.addEventListener("click", () => {
        const checked__icon = e.parentElement.childNodes[2];
        const splitStorageType = e.className.split(" ")[1];
        // console.log(`${splitStorageType}`)
        // console.log(arr_caution_product_type.includes(splitStorageType));
        if (arr_caution_product_type.includes(splitStorageType)) {
            arr_caution_product_type.splice(
                arr_caution_product_type.indexOf(splitStorageType),
                1
            );
            checked__icon.style.color = "#ffffff";
            checked__icon.style.opacity = 0.7;
        } else {
            arr_caution_product_type.push(splitStorageType);
            checked__icon.style.color = "#f18b24";
            checked__icon.style.opacity = 0.7;
        }
        // console.log(arr_caution_product_type);
        e.classList.toggle(CLICKED_CLASS);
    });
});

export {
    product_category,
    detailInput,
    arr_storage_type,
    barcodeValue,
    product_url,
    arr_caution_product_type,
};