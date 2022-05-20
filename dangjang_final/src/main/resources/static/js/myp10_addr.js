
function plusAddress() {
    console.log("new address");
    new daum.Postcode({

        oncomplete: function(data) {
            var addr = '';
            if (data.userSelectedType === 'R') {
                addr = data.roadAddress;
            } else {
                addr = data.jibunAddress;
            }
            if(data.userSelectedType === 'R'){
                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                }
                if(data.buildingName !== '' && data.apartment === 'Y'){
                }
            } else {
            }

            document.getElementById('zipcode').value = data.zonecode;
            document.getElementById('a_addr').value = data.zonecode;
            document.getElementById("addr1").value = addr;
            document.getElementById("a_address").value = addr;
            document.getElementById("a_addr_detail").focus();
            //모달창 열기
            modal.classList.add('show-modal');
            $('#addAddress').css('display','');
            document.getElementById("seq_address").value = '-1';
        }
    }).open();
}

//Hide modal
window.addEventListener('click', (e) => {
    e.target === modal ? modal.classList.remove('show-modal') : false
    e.target === modal ? document.getElementById("addrForm").reset() : false
})

//modal
const close =document.getElementById('closeBtn');
const modal = document.getElementById('modalContainer');
$(function(){
    $("#closeBtn").click(function(){
        modal.classList.remove('show-modal')
        document.getElementById("addrForm").reset();
    });
    /*모달 레이어 팝업 끝*/
});


// 배송지 저장 클릭(신규 배송지 추가)
$('#addAddress').click(function(){
    if($('#isDefault').is(':checked')){
        $('input[name=defaultStatus]').attr('value','1');
    }else {
        $('input[name=defaultStatus]').attr('value','0');
    }

    if($('#a_addr').val() == ''){
        $('.modal-form #btn_searchAddr').focus();
        console.log("주소1 빈칸");
    } else if($('.modal-form #a_address').val() == ''){
        $('.modal-form #btn_searchAddr').focus();
        console.log("주소1 빈칸");
        // 상세주소 미 입력
    } else if($('#a_addr_detail').val() == ''){
        $('.modal-form #a_addr_detail').focus();
        console.log("상세주소 빈칸");

    }  else if($('#addrName').val() == ''){
        $('.modal-form #addrName').focus();
        console.log("배송지명 빈칸");
    } else if($('#receptionName').val() == ''){
        $('.modal-form #receptionName').focus();
        console.log("받는사람 빈칸");
    } else {
        $.ajax({
            type: 'post',
            url: '/dangjang/mypage/addr/addrOk',
            data: $('#addrForm').serialize(),
            dataType: 'text',
            success: function(data){
                if(data == 'addAddr'){
                    location.href='/dangjang/mypage/addr';
                } else {
                    alert('실패!');
                };
            },
            error: function(err){
                console.log(err);
            }
        });
    }
})

// 값 뿌려주기
$(function(){
    $.ajax({
        type: 'get',
        url: '/dangjang/mypage/addr/myaddress',
        dataType: 'text',
        success: function(data){
            $('#addr_list').html(data);
        },
        error:  function(err){
            alert(err);
        }
    });
});
// 삭제하기
$(document).on('click','.deleteAddress',function(){
    var addressNo = $(this).data('addressno');
    console.log("삭제하기 눌렀음",addressNo);
    $.ajax({
        type: 'post',
        url: '/dangjang/mypage/addr/deleteAddress',
        data: {'seq_address' : addressNo},
        dataType: 'text',
        success: function (data) {
            if(data == 'deleteAddressOk'){
                location.href='/dangjang/mypage/addr#my'
                console.log('삭제가 되었나요!');
                alert("삭제가 완료되었습니다");
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
});


/*수정버튼 클릭시 -> 모달 레이어 팝업 시작*/
$(document).on('click','.modifyForm',function(){
    console.log("수정하기 눌렀음");
    document.getElementById('seq_address').value = $(this).data('addressno');
    document.getElementById('defaultStatus').value =$(this).data('status');
    document.getElementById("zipcode").value =$(this).data('zipcode');
    document.getElementById("a_addr").value =$(this).data('zipcode');
    document.getElementById("addr1").value =$(this).data('address1');

    document.getElementById("a_address").value =$(this).data('address1');
    document.getElementById("receptionName").value =$(this).data('receptionname');
    document.getElementById("addrName").value =$(this).data('addresstitle');
    document.getElementById("a_addr_detail").value =$(this).data('address2');
    document.getElementById("phoneNum").value =$(this).data('phoneno');
    if($(this).data('addressContent') !=null){
        document.getElementById("a_addressContent").value =$(this).data('addresscontent');
    }
    modal.classList.add('show-modal');
});
