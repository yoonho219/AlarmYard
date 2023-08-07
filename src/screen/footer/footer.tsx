import styled from "styled-components";
import React from "react";

export default function Footer() {
    return (
        <Layout>
            <div className="footerScreen">
                <TextWrapper>
                    <div className="notices">
                        <span>개인정보처리방침</span>
                        <span>사이트이용약관</span>
                    </div>
                    <p>(사)한국외식업중앙회 한국외식산업연구원</p>
                    <div className="information">
                        <ul>
                            <li>주소<span>(04598) 서울특별시 중구 다산로 168 (신당동, 성원빌딩) 3층 한국외식산업연구원</span></li>
                            <li>사업자등록번호<span>203-82-32145</span></li>
                            <li>대표자<span>전강식</span></li>
                        </ul>
                        <ul>
                            <li>TEL<span>02-6191</span></li>
                            <li>FAX<span>02-6191-2998</span></li>
                            <li>E-mail<span>saacsgod@kfiri.org</span></li>
                            <li>개인정보보호정책 책임자<span>김삼희</span></li>
                        </ul>
                    </div>
                </TextWrapper>
                <div className="copyright">Copyright © 2017 한국외식산업연구원</div>
            </div>
        </Layout>
    )
}
const Layout = styled.div`
    width: 100%;
    height: 190px;
    flex-shrink: 0;
    border-top: solid 1px #E6E6E6;
    
    .footerScreen{
        margin: 0 auto;
        width: 1440px;
    }
    .copyright{
        color: #B6B6B6;
        font-size: 10px;
        font-style: normal;
        font-weight: 400;
        line-height: 15px;
        margin: 15px 0 0 103px;
    }
`;

const TextWrapper = styled.div`
    flex-direction: column;
    margin-left: 100px;
    .notices {
        margin-top: 25px;
        span{
            cursor: pointer;
            color: #444;
            font-size: 12px;
            font-style: normal;
            font-weight: 600;
            line-height: 12px;
        }
    };

    p{
        color: #222;
        font-size: 10px;
        font-weight: 300;
        line-height: 16px;
        margin: 35px 0 11px 0;
    }
    
    div{
        >span{
            margin-right: 20px;
        }

        ul{
            padding: 0;
            margin: 0;
            list-style-type: none;
            display: flex;
            :not(:first-child)::before{
                    content: "|";
                    float: left;
                    color: #D1D1D1;
                    font-size: 10px;
                    font-style: normal;
                    font-weight: 300;
                    line-height: 16px;
                    margin: 0 5px;
                }
            li{
                color: #444;
                font-size: 10px;
                font-style: normal;
                font-weight: 700;
                line-height: 16px;
                span{
                    color: #444;
                    font-size: 10px;
                    font-style: normal;
                    font-weight: 300;
                    line-height: 16px;
                    margin-left: 3px;
                }
            }
        }
    }
`