import { Product } from "../models/Product.js";
/*----------Hàm render table----------*/


function renderProduct(arrProduct) {
    var html = '';
    for (var i = 0; i < arrProduct.length; i++) {
        var pr = arrProduct[i];
        html += `
            <tr>
                <td>${pr.id}</td>
                <td><img src="${pr.img}" style="width: 40px; height: 40px;" /></td>
                <td>${pr.name}</td>
                <td>${pr.price}</td>
                <td>${pr.description}</td>
                <td>${pr.type}</td>
               <td> <button class="btn btn-primary mr-2" onclick="suaProduct('${pr.id}')">Sửa</button>
               <button class="btn btn-danger" type="button" onclick="xoaProduct('${pr.id}')" >Xoá</button></td>
               </td>
            </tr>
        `;
    }
    document.querySelector('tbody').innerHTML = html;
}
{/* <td>
 */}

/*--------------Phương thức get */
function getProductApi() {
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/GetAll',
        method: 'GET'
    });

    //Xử lý thành công
    promise.then(function (result) {
        console.log('result', result.data);
        //Gọi hàm tạo table 
        renderProduct(result.data);
    });

    //Xử lý thất bại
    promise.catch(function (err) {
        console.log('result', err.response.data);

    });

}

window.onload = function () {
    getProductApi();
}

/*----------Phương thức post------------*/
document.querySelector('#btnThemProduct').onclick = function () {
    let pr = new Product();
    let arrInput = document.querySelectorAll('.container input, .container select');
    console.log(arrInput);

    for (let input of arrInput) {
        let { id, value } = input;
        pr[id] = value;
    }

    // gọi API
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/CreateProduct',
        method: 'POST',
        data: pr
    });

    //Xử lý thành công 
    promise.then(function (result) {
        console.log('result', result.data);
        //gọi lại api load lại table
        getProductApi();
    });


    //Xử lý thất bại
    promise.catch(function (error) {
        console.log('error', error.response.data);
    })


}

/*--------------Phương thức xóa-------------*/
window.xoaProduct = (idProductClick) => {
    // console.log(idProductClick);


    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/DeleteProduct/' + idProductClick,
        method: 'DELETE'
    });

    //Xử lý thành công 
    promise.then(function (result) {
        console.log('result', result.data);
        //load lại table = api lay danh sach nguoi dung
        getProductApi();
    });

    //Xử lý thất bại
    promise.catch(function (error) {
        console.log(error);
    })



}
// document.getElementById('render-table').addEventListener('click', function (event) {
//     let type = event.target.getAttribute('data-type');
//     let idProduct = event.target.getAttribute('data-id')
//     if (!idProduct) return
//     if (type === 'delete') {
//         xoaProduct(idProduct)
//     }
//     if (type === 'update') {
//         // call function update here
//     }
// })