import styled from "styled-components";
import React from "react";
import { prevpage, nextpage, gofirst, golast } from "../assets/images/logos/arrows";

/** 
 * 페이지네이션 props 타입 
*/
interface IPaginationProps {
    /** 기본개수  */
    limit: number,
    /** 현재 페이지 */
    page: number,
    pageGroup: number,
    setPageGroup: (num: number) => void,
    counts: number,
    callPage: (num: number) => void,
    navigate: (str: string) => void,

    input?: string,
    searched?: boolean,
}
/**
 * 페이지네이션 컴포넌트
 * @param {IPaginationProps} props  
 * @returns {React.ReactNode} node
 */
export default function Pagination({
    limit,
    page,
    pageGroup,
    setPageGroup,
    counts,
    callPage,
    navigate,

    input = "",
    searched = false,
}: IPaginationProps) {
    const pageLimit = 5;
    const pageNumbers = [];
    const totalPage = Math.ceil(counts / limit);
    const startPage = Math.floor((page - 1) / pageLimit) * pageLimit + 1;
    const endPage = startPage + pageLimit - 1 > totalPage
        ? totalPage
        : startPage + pageLimit - 1;

    const lowerPage = page <= 1;
    const higherPage = page >= totalPage;

    const plusPage = page + 1;
    const plusPageGroup = pageGroup + 1;
    const pageConditions = pageLimit * (pageGroup + 1) < (page + 1);

    const minusPage = page - 1;
    const minusPageGroup = pageGroup - 1;
    const pageCondition = page - 1 <= pageLimit * pageGroup;

    const lastPageGroup = Math.ceil(totalPage / pageLimit) - 1

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i)
    }

    const movePage = (
        condition: boolean,
        movePageProp: number,
        pageGroups?: number,
        onePageGroup?: number,
        pageCondition?: boolean,
    ) => {
        if (condition) {
            return;
        }
        if (pageGroups === 0) {
            setPageGroup(pageGroups)
        }
        if (pageGroups) {
            setPageGroup(pageGroups)
        }
        if (pageCondition && onePageGroup) {
            setPageGroup(onePageGroup)
        }
        callPage(movePageProp);

        searched ?
            navigate(`?page=${movePageProp}&search=${input}`)
            : navigate(`?page=${movePageProp}`)
    }

    const firstPage = () => {
        movePage(lowerPage, 1, 0)
    }
    const prevPage = () => {
        movePage(lowerPage, minusPage, undefined, minusPageGroup, pageCondition)
    }
    const lastPage = () => {
        movePage(higherPage, totalPage, lastPageGroup)
    }
    const nextPage = () => {
        movePage(higherPage, plusPage, undefined, plusPageGroup, pageConditions)
    }

    return (
        <PageNumberForm prev={page === 1} next={page === totalPage}>
            <img onClick={() => firstPage()} alt="gofirstlogo" src={gofirst} className="prevBtn" />
            <img onClick={() => prevPage()} alt="prevlogo" src={prevpage} className="prevBtn" />
            {pageNumbers.map((n: number) => (
                <PageNumbers onClick={() => callPage(n)} active={n === page}>{n}</PageNumbers>
            ))
            }
            <img onClick={() => nextPage()} alt="nextlogo" src={nextpage} className="nextBtn" />
            <img onClick={() => lastPage()} alt="golastlogo" src={golast} className="nextBtn" />
        </PageNumberForm >
    )
}
const PageNumberForm = styled.div < { prev: boolean, next: boolean }>`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    img{
        cursor: pointer;
    }
    .prevBtn{
        opacity: ${page => page.prev && ".2"};
        cursor: ${page => page.prev && "default"};
    }
    .nextBtn{
        opacity: ${page => page.next && ".2"};
        cursor: ${page => page.next && "default"};
    }
`
const PageNumbers = styled.div<{ active: boolean }>`
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
    cursor: ${props => props.active ? "default" : "pointer"};
    &:hover{
        color: #5A33BE;
        font-weight: 800;
    }
`