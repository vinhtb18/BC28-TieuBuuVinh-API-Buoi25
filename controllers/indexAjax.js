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

/*----------Phương thức sửa---------*/

window.suaProduct = (idProductClick) => {
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/GetById/' + idProductClick,
        method: 'GET'
    });

    //Xử lý thành công
    promise.then(function (result) {
        let productChange = result.data;
        console.log(productChange);
        //Load thông tin sinh viên lên giao diện
        let arrInput = document.querySelectorAll('.container input, .container select');
        console.log(arrInput);

        for (let input of arrInput) {
            let { id } = input;
            input.value = productChange[id];
        }
    })
    //Xử lý thất bại
    promise.catch(function (error) {

    })
}

/*-----------Phương thức cập nhật--------------*/
document.querySelector('#btnCapNhatProduct').onclick = function () {
    //Lấy dữ liệu từ người dùng nhập ở giao diện => gửi về api
    let pr = new Product();
    let arrInput = document.querySelectorAll('.container input, .container select');
    console.log(arrInput);

    for (let input of arrInput) {
        let { id, value } = input;
        pr[id] = value;
    }


    //Gọi api 
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/UpdateProduct/' + pr.id,
        method: 'PUT',
        data: pr
    });

    promise.then(function (result) {
        console.log(result.data);
        //Gọi lại api load table
        getProductApi();
    });

    promise.then(function (err) {
        console.log(err)
    })

}

/*----------Phương thức tìm kiếm theo tên----------*/
document.querySelector('#btnTimKiemTheoTen').onclick = function () {
    let searchName = document.querySelector('#searchName').value;
    console.log(searchName);

    //Gọi api 
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/SearchByName?name=' + searchName,
        method: 'GET',
    });

    promise.then(function (result) {
        console.log(result.data);
        //load table
        renderProduct(result.data);
    });

    promise.then(function (err) {
        console.log(err)
    })

}
