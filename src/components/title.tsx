import styled from "styled-components";
import React from "react";
import search from "../assets/images/searchlogo.svg"

interface ITitleProps{
    input?: string,
    clickSearch?: Function,
    setInput?: (str: string) => void,
    /**검색창 여부 */
    state:boolean,
}

export default function Title({
    input="",
    clickSearch,
    setInput,
    state,
}: ITitleProps) {
    const searchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput && setInput(e.target.value);
    }

    return (
        <TopLayout>
            <span className="alarmyard">알림마당</span>
            <span className="notification">공지사항</span>
            {state &&
                <SearchBox>
                    <Search
                        value={input}
                        onChange={searchInput}
                        placeholder="검색어를 입력해주세요."
                    />
                    {clickSearch &&
                        <img onClick={() => clickSearch()} alt="searchlogo" src={search} />}
                </SearchBox>}
        </TopLayout>
    )
}

const TopLayout = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 50px;
    span{
        text-align: center;
        font-feature-settings: 'clig' off, 'liga' off;
        font-family: Pretendard;
    }
    .alarmyard{
        margin-top: 60px;
        color: #666;
        font-size: 18px;
        font-weight: 500;
        line-height: 18px;
    }
    .notification{
        margin-top: 10px;
        color: #333;
        font-size: 30px;
        font-weight: 700;
        line-height: 30px;
    }
`
const SearchBox = styled.div`
    position: relative;
    width: 460px;
    height: 50px;
    margin-top: 30px;
    border: 1px solid #838383;
    border-radius: 100px;
    display: inline-flex;
    justify-content: center;
    flex-direction: column;
    img{
        cursor: pointer;
        width: 24px;
        position: absolute;
        right: 24px;
    }
`
const Search = styled.input`
    width: 80%;
    height: 100%;
    gap: 10px;
    font-size: 18px;
    border: 0;
    outline: none;
    margin: 13px 0 13px 24px;
`