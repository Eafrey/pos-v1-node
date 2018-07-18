function loadAllItems() {
    return [
        {
            barcode: 'ITEM000000',
            name: '可口可乐',
            unit: '瓶',
            price: 3.00
        },
        {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00
        },
        {
            barcode: 'ITEM000002',
            name: '苹果',
            unit: '斤',
            price: 5.50
        },
        {
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00
        },
        {
            barcode: 'ITEM000004',
            name: '电池',
            unit: '个',
            price: 2.00
        },
        {
            barcode: 'ITEM000005',
            name: '方便面',
            unit: '袋',
            price: 4.50
        }
    ];
}

function loadPromotions() {
    return [
        {
            type: 'BUY_TWO_GET_ONE_FREE',
            barcodes: [
                'ITEM000000',
                'ITEM000001',
                'ITEM000005'
            ]
        }
    ];
}

module.exports = function printInventory(inputs) {
    // console.log("Debug Info");
    let res = "";

    let good_list = new Map();

    inputs.forEach(element => {
        let splited = element.split('-');
        if(splited.length === 1) {
            if(good_list.get(splited[0]) == undefined) {
                good_list.set(splited[0], 1);
            } else{
                good_list.set(splited[0], good_list.get(splited[0]) + 1);
            }
        } else if(splited.length === 2) {
            if(good_list.get(splited[0]) == undefined) {
              good_list.set(splited[0], splited[1]);
           } else{
              good_list.set(splited[0], good_list.get(splited[0]) + splited[1]);
          }
        }
    });

    //console.log(good_list);

    let good_data = loadAllItems();
    let good_datamap = new Map();
    good_data.forEach(element => {
        good_datamap.set(element["barcode"], element);
    });

    //console.log(good_datamap);

    let all_price = 0;

    res += '***<没钱赚商店>购物清单***';
    let keyarr = Array.from(good_list.keys());
    keyarr.forEach(element => {
        res += '\n名称：' + good_datamap.get(element)['name'] + '，数量：' +
        good_list.get(element) + good_datamap.get(element)['unit'] + '，单价：' +
        good_datamap.get(element)['price'] + '(元)，小计：' +
        good_list.get(element) * good_datamap.get(element)['price'] + '(元)';

        all_price += good_list.get(element) * good_datamap.get(element)['price'];
    });

    res += '\n----------------------';
    res += '\n总计：' + all_price + '(元)';

    console.log(res);



    return res;
};