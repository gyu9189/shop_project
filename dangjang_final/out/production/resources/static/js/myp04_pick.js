//선택 상품 장바구니 보내기 전 체크하기
function checkAddCart() {
    console.log("test");
    var selectedProduct = [];

    $(".checkYE .prodCheckbox:checked").each(function() {
        selectedProduct.push($(this).data("productno"));
    });

    if (selectedProduct.length == 0) {
        alert("상품을 선택해 주세요.");
    } else {
        addCarts(selectedProduct);
    }
}
// 선택 상품 장바구니보내기01 : (다수)
function addCarts(productKeies) {
    $.ajax({
        url : "/dangjang/mypage/pick",
        type: "POST",
        data: { productKeies: productKeies },
        dataType: "json",
        success: function(data) {
            if (data == "allAddCartOK") {
                alert("장바구니에 담겼습니다.");
            }
            else {
                alert("실패");
            }
        },
        error: function(err){
            console.log(err);
        }
    });
}

// 해당 선택 상품 장바구니보내기01 : (단일)
$(document).on('click','.addCart',function(){
    var productId =  $(this).data('productno');
    $.ajax({
        url : "/dangjang/mypage/pick",
        type: "POST",
        data: {'productId' : productId},
        dataType: "json",
        success: function(data) {
            if (data == "addCartOK") {
                alert("장바구니에 담겼습니다.");
            }
            else {
                alert("실패");
            }
        },
        error: function(err){
            console.log(err);
        }
    });
});

// 찜한상품 삭제
$(document).on('click','.deletePickProd',function(){
    var pickid =  $(this).data('pickid');
    console.log(pickid,"삭제시작");
    $.ajax({
        url : "/dangjang/mypage/favorite/deleteFavorite",
        type: "POST",
        data: {'id' : pickid},
        dataType: "json",
        success: function(data) {
            if (data == "deletePickPd") {
                alert("상품 삭제완료.");
            }
            else {
                alert("실패");
            }
        },
        error: function(err){
            console.log(err);
        }
    });
});



$(function(){
    $.ajax({
        type: 'GET',
        url: '/dangjang/mypage/favorite/myFavoriteList',
        dataType: 'text',
        success: function(data){
            //console.log(data);
            $('#pickHtml').html(data);
        },
        error:  function(err){
            alert(JSON.stringify(err));
        }
    });
});

