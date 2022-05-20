
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%--
    </ul>주문일자, 대표상품명, 주문상품수, 주문번호, 결제금액, 주문상태, 1:1문의
    <OrdersMapperDTO> <OrderListMapperDTO>
--%>
<c:forEach items="${orderListMapperList}" var="item">
    <li>
        <div class="date">${item.order_date}</div>
        <div class="orderGoods">
            <a class="btn_odDetail" href="javascript:void(0);"
               onclick="location.href='/dangjang/mypage/order/orderDetail?seq_order=${item.seq_order}';">

            <div class="odTit">
                    <span>${item.name}외</span>
                    <span>${item.orderItem}건</span>
                </div>
            </a>
            <div class="prodUnit">
                <div class="odInfoBox">
                    <div class="odPdImg" >
                        <img src="/images/${item.serial_number}.jpg">
                    </div>
                    <div class="odPdText">
                        <dl>
                            <dt>수령인</dt>
                            <dd>${item.recipient_name}</dd>
                        </dl>
                        <dl>
                            <dt>주문번호</dt>
                            <dd>${item.order_num}</dd>
                        </dl>
                        <dl>
                            <dt>결제금액</dt>
                            <dd>${item.final_price}원</dd>
                        </dl>
                    </div>
                </div>
                <div class="odBoxSize">
                    <span class="odStatus">${item.delivery_status}</span>
                </div>
                <div class="odBoxSize">

                    <a class="btn_ty01"
                       data-ordernum="${item.seq_order}"
                       onclick="javascript:myQnaDirect();">1:1문의</a>
                    <c:if test="${item.delivery_status == '주문접수'}">
                        <a class="btn_ty01" onclick="location.href='javascript:void(0);';"
                           data-order_num="${item.order_num}"
                           data-seq_order="${item.seq_order}">주문취소</a>
                    </c:if>
                    <c:if test="${item.delivery_status == '배송완료'}">
                        <a class="btn_ty01" onclick="location.href='/dangjang/mypage/review';">후기쓰기</a>
                    </c:if>
                </div>
            </div>
        </div>

    </li>
</c:forEach>
<c:if test="${fn:length(orderListMapperList) == 0}">
    <li class="list">
        <p>다음날 새벽 당장가게에서 신선한 상품을 받아보세요.</p>
    </li>
</c:if>