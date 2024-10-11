
// dumy cartData
const cartData = {
    size: ['S', 'M', 'L'],
    color: ['Black', 'Green', 'Blue', 'White', 'Pink'],
    data: [{
        unit: 1,
        price: {
            original: '24.00',
            discount: '10.00',
            discountPercentage: 10
        },
        subTitle: 'Standard Price'
    },
    {
        unit: 2,
        price: {
            original: '24.00',
            discount: '18.00',
            discountPercentage: 20
        },
        mostPopular: true
    },
    {
        unit: 3,
        price: {
            original: '24.00',
            discount: '24.00',
            discountPercentage: 30
        }
    }]
};

let activeProductItem = null;

// function to create the 'Add to Cart page'
function createAddToCartPage() {
    const app = document.getElementById('app');

    // main page container
    const page = document.createElement('div');
    page.className = 'page';

    const container = document.createElement('div');
    container.className = 'container';

    const product = document.createElement('div');
    product.className = 'product';

    // the BOGO banner
    const bogoBanner = document.createElement('div');
    bogoBanner.className = 'bogo';

    const bogoLine = document.createElement('div');
    bogoLine.className = 'bogo-line';

    const bogoTitle = document.createElement('div');
    bogoTitle.className = 'bogo-title';
    bogoTitle.textContent = "YAY! it's BOGO";

    bogoBanner.appendChild(bogoLine)
    bogoBanner.appendChild(bogoTitle)

    container.appendChild(bogoBanner);
    
    // footer
    const footer = document.createElement('div')
    footer.className = 'footer'

    const summary = document.createElement('div')
    summary.className = 'summary'

    const totalAmount = document.createElement('span')
    totalAmount.className = 'total-amount'

    const freeDelivery = document.createElement('span')
    freeDelivery.className = 'free-delivery'
    freeDelivery.textContent = 'Free Delivery'

    const addToCartBtn = document.createElement('button')
    addToCartBtn.className = 'button'
    addToCartBtn.textContent = "+ Add to Cart"

    const copyright = document.createElement('span')
    copyright.className = 'copyright'
    copyright.textContent = '@ Powered by Pumper'

    // map through data and create element for each item
    cartData?.data?.forEach((item, index) => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';

        // for top section
        const productItemDetails = document.createElement('div');
        productItemDetails.className = 'product-item-details';

        // for bottom section
        const productItemVariant = document.createElement('div');
        productItemVariant.className = 'product-item-variant';

        // for 'Most Popular' tag
        if(item.mostPopular){
            const tagWrapper = document.createElement('div');
            tagWrapper.className = 'tag-wrapper';
    
            // const tagBackDiv = document.createElement('div');
            // tagBackDiv.className = 'tag-back-div';
    
            const tagFrontDiv = document.createElement('div');
            tagFrontDiv.className = 'tag-front-div';
            tagFrontDiv.textContent = 'MOST POPULAR'

            // tagWrapper.appendChild(tagBackDiv)
            tagWrapper.appendChild(tagFrontDiv)

            productItem.appendChild(tagWrapper)
        }

        // code for top section (productItemDetails)
        // left section -> unit and discount info
        const leftSection = document.createElement('div');
        leftSection.className = 'left-section';

        const radioInput = document.createElement('input');
        radioInput.type = 'radio';
        radioInput.className = 'radio';

        const productInfo = document.createElement('div');
        productInfo.className = 'product-info';

        const productInfoWrapper = document.createElement('div')
        productInfoWrapper.className = 'product-info-wrapper'

        const unitInfo = document.createElement('div');
        unitInfo.className = 'unit-info'
        unitInfo.textContent = `${item.unit} Unit`;

        const discountInfo = document.createElement('div');
        discountInfo.className = 'discount-info'
        discountInfo.textContent = `${item.price.discountPercentage}% off`;

        let standardPrice;
        if (item?.subTitle) {
            standardPrice = document.createElement('span');
            standardPrice.className = 'subtitle'
            standardPrice.textContent = item.subTitle;
        }

        productInfoWrapper.appendChild(unitInfo);
        productInfoWrapper.appendChild(discountInfo);
        productInfo.appendChild(productInfoWrapper)
        if (item?.subTitle) {
            productInfo.appendChild(standardPrice);
        }

        leftSection.appendChild(radioInput);
        leftSection.appendChild(productInfo);

        // right section -> original and discounted price
        const rightSection = document.createElement('div');
        rightSection.className = 'right-section';

        const discountedPrice = document.createElement('span');
        discountedPrice.className = 'discounted-price';
        discountedPrice.textContent = `$${item.price.discount} USD`;

        const originalPrice = document.createElement('span');
        originalPrice.className = 'original-price';
        originalPrice.textContent = `$${item.price.original} USD`;

        rightSection.appendChild(discountedPrice);
        rightSection.appendChild(originalPrice);

        productItemDetails.appendChild(leftSection);
        productItemDetails.appendChild(rightSection);

        productItem.appendChild(productItemDetails);

        // code for bottom section (productItemVariant)
        const unitCount = item.unit;

        const headerRow = document.createElement('div');
        headerRow.className = 'header-row';

        // "Size" title
        const sizeTitle = document.createElement('span');
        sizeTitle.textContent = 'Size';
        sizeTitle.className = 'label';
        headerRow.appendChild(sizeTitle);

        // "Color" title
        const colorTitle = document.createElement('span');
        colorTitle.textContent = 'Color';
        colorTitle.className = 'label';
        headerRow.appendChild(colorTitle);

        productItemVariant.appendChild(headerRow);

        for (let i = 0; i < unitCount; i++) {
            const variantRow = document.createElement('div');
            variantRow.className = 'variant-row';

            // Create size dropdown
            const sizeDropdown = document.createElement('select');
            cartData.size.forEach(size => {
                const sizeOption = document.createElement('option');
                sizeOption.value = size;
                sizeOption.textContent = size;
                sizeDropdown.appendChild(sizeOption);
            });

            // Create color dropdown
            const colorDropdown = document.createElement('select');
            cartData.color.forEach(color => {
                const colorOption = document.createElement('option');
                colorOption.value = color;
                colorOption.textContent = color;
                colorDropdown.appendChild(colorOption);
            });

            // Add # label to indicate the unit row
            const unitLabel = document.createElement('span');
            unitLabel.className = 'label'
            unitLabel.textContent = `#${i + 1}`;

            // Append elements to the row
            variantRow.appendChild(unitLabel);
            variantRow.appendChild(sizeDropdown);
            variantRow.appendChild(colorDropdown);

            // Append the row to the bottom section (productItemVariant)
            productItemVariant.appendChild(variantRow);
        }

        productItem.appendChild(productItemVariant)

         // select that productItem which has most popular tag by default
         if (item.mostPopular) {
            productItemVariant.style.display = 'block';
            radioInput.checked = true;
            productItem.classList.add('selected');
            productItem.classList.add('most-popular');

            totalAmount.textContent = `Total: $${item.price.discount} USD`;
            activeProductItem = productItem; 
        } else {
            productItemVariant.style.display = 'none';
        }

        productItem.addEventListener('click', () => {
            if (activeProductItem && activeProductItem !== productItem) {
                const activeProductVariant = activeProductItem.querySelector('.product-item-variant')
                activeProductVariant.style.display = 'none'; 

                const currentRadio = activeProductItem.querySelector('.radio')
                currentRadio.checked = false;
                activeProductItem.classList.remove('selected');
            }
            // productItem.classList.add('selected');
            productItemVariant.style.display = 'block';
            radioInput.checked = true;

            productItem.classList.add('selected');

            activeProductItem = productItem; 
            totalAmount.textContent = `Total: $${item.price.discount} USD`;
        });

        // append productItem in container
        product.appendChild(productItem);
    });

    summary.appendChild(totalAmount)
    summary.appendChild(freeDelivery)
    footer.appendChild(summary)
    footer.appendChild(addToCartBtn)
    footer.appendChild(copyright)

    container.appendChild(product);
    container.appendChild(footer)

    page.appendChild(container);
    app.appendChild(page);
}

// call function to create the 'Add to Cart' page
createAddToCartPage();
