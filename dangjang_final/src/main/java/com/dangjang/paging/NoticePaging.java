package com.dangjang.paging;

import lombok.Data;
import org.springframework.stereotype.Component;

@Component
@Data
public class NoticePaging {
    private int currentPage; // 현재 페이지 num
    private int recordsPerPage; // 한 페이지 당 출력될 데이터 수
    private int pageSize; // 페이지 사이즈
    private int totalRecords; // 총 데이터 수
    private String searchKeyWord; // 검색 키워드
    private String searchType; // 검색 유형
    private StringBuffer pagingHTML;

    public void makePaging(){
        pagingHTML = new StringBuffer();

        int totalPageSize = (totalRecords + recordsPerPage - 1) / recordsPerPage;
        int startPage = (currentPage - 1) / pageSize * pageSize + 1;
        int endPage = startPage + pageSize - 1;

        if(endPage > totalPageSize){
            endPage = totalPageSize;
        }

        if(startPage > pageSize){
            pagingHTML.append("<a class='layout_paging_button layout_paging_firstPage' onclick='noticePaging("+ 1 +")'>맨 처음 페이지로 가기</a>");
            pagingHTML.append("<a class='layout_paging_button layout_paging_prevPage onclick='noticePaging(" + (startPage - 1) + ")'>이전 페이지로 가기</a>");
        } // if

        for(int i = startPage; i <= endPage; i++){
            if(i == currentPage){
                pagingHTML.append("<a class='layout_paging_button layout_paging_number currentPage' onclick='noticePaging(" + i + ")'>" + i + "</a>");
            } else {
                pagingHTML.append("<a class='layout_paging_button layout_paging_number' onclick='noticePaging(" + i + ")'>" + i + "</a>");
            }
        } // for

        if(endPage < totalPageSize){
            pagingHTML.append("<a class='layout_paging_button layout_paging_nextPage onclick='noticePaging(" + (endPage + 1) + ")'>다음 페이지로 가기</a>");
            pagingHTML.append("<a class='layout_paging_button layout_paging_lastPage onclick='noticePaging("+ totalPageSize +")'>맨 마지막 페이지로 가기</a>");
        } // if
    };
}
