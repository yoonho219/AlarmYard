import styled from "styled-components";
import React, { useState } from "react";
import { prevpage, nextpage, tennextpage } from "../assets/images/logos/arrows";

export default function Pagination(pages: any) {
    const pageNumber = [];   //현재 페이지 숫자

    const [posts, setPosts] = useState([])
    const page = pages.currentPage;    //현재 페이지
    const [limit, setLimit] = useState(10)  //페이지당 게시물 수
    const offset = (page - 1) * limit;      //해당 페이지에 보일 게시물
    const total = pages.postCount;     //게시물 총 개수
    const numPages = Math.ceil(total / limit);   //페이지 총 개수

    for (let i = 1; i <= numPages; i++) {
        pageNumber.push(i)
    }
    const pagination = (pageProp: number) => {
        if (page === pageProp) return page
        else {
            pages.query(pageProp);
            pages.setCurrentPage(pageProp);
        }
        console.log(total)
    }

    return (
        <PageNumberForm>
            <img onClick={() => pages.setCurrentPage(page - 1)} alt="prevlogo" src={prevpage} />
            <button onClick={() => pages.setCurrentPage(page - 1)} disabled={page === 1}>&lt;</button>
            {pageNumber.map((e) => (
                <PageNumbers onClick={() => pagination(e)} active={e === page}>{e}</PageNumbers>
            ))}
            <button onClick={() => pages.setCurrentPage(page + 1)} disabled={page === numPages}>
                &gt;
            </button>
            <img alt="nextlogo" src={nextpage} />
            <img alt="tennextlogo" src={tennextpage} />
        </PageNumberForm>
    )
}
const PageNumberForm = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    img{
        cursor: pointer;
    }
`
const PageNumbers = styled.div<{ active: boolean }>`
    cursor: pointer;
    width: 40px;
    height: 40px;
    text-align: center;
    font-weight: 600;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-underline-position: under;
    color:${props => props.active ? "#5A33BE" : "#9A9A9A"};
    font-weight: ${props => props.active ? "800" : "600"};
    text-decoration-line: ${props => props.active ? "underline" : "none"};
    &:hover{
        color: #5A33BE;
        font-weight: 800;
    }
`