import React from "react";
import styled from "styled-components";
import mainlogo from "../../assets/images/mainlogo.png";
import alarm from "../../assets/images/alarmlogo.svg";
import devide from "../../assets/images/divide1.svg";
import hamberger from "../../assets/images/hamburger-button.svg";

export default function Header() {
    return (
        <Layout>
            <Top>
                <div className="headerScreen">
                    <span className="login">로그인/회원가입</span>
                    <span className="findMember">회원정보찾기</span>
                </div>
            </Top>
            <div className="Screen">
                <div>
                    <MainLogo alt="MainLogo" src={mainlogo}></MainLogo>
                    <ul>
                        <li>한국외식산업연구원</li>
                        <li>외식정보</li>
                        <li>알림마당</li>
                        <img className="devide" alt="dividelogo" src={devide} />
                        <li>패널설문조사</li>
                        <li>정부지원</li>
                        <li>교육</li>
                        <li>부가혜택몰</li>
                    </ul>
                    <Alarm className="button">
                        <img alt="alarm" src={alarm} />
                    </Alarm>
                    <Hamburger className="button">
                        <img alt="hamburger-button" src={hamberger} />
                    </Hamburger>
                </div>
            </div>
        </Layout>
    );
}

const Layout = styled.div`
    height: 130px;
    border-bottom: solid 1px #E6E6E6;
    .Screen{
        margin: 0 auto;
        width: 1440px;
    }
    div{
        display: flex;
        align-items: center;
        ul{
            font-size: 18px;
            font-weight: 500;
            line-height: 14px;
            margin-left: 76px;
            list-style-type: none;
            padding: 0;
            li{
                cursor: pointer;
                display: inline;
                margin: 0 20px 0 20px;
                vertical-align: top;
            }
            .devide{
                margin: 0 10px 0 10px;
                height: 14px;
            }
        }
    }
    .button{
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 10px;
        display: flex;
        justify-content: center;
    }
`;

const Top = styled.div`
    width: 100%;
    height: 30px;
    position: relative;
    background: linear-gradient(90deg, #9B27AA 0%, #173DD0 100%);
    display: flex;
    align-items: center;
    .headerScreen{
        width: 1440px;
        margin: 0 auto;
    }
    span{
        cursor: pointer;
        color: #FFF;
        text-align: right;
        font-size: 12px;
        font-style: normal;
        font-weight: 500;
        line-height: 12px;
    }
    span.login{
        margin-left: 1180px;
    }
    span.findMember{
        margin-left: 20px;
    }
`

const MainLogo = styled.img`
    cursor: pointer;
    margin: 30px 0 30px 100px;
`
const Alarm = styled.div`
    background: #E7E7E7;
    margin: 0 15px 0 15px;
`
const Hamburger = styled.div`
    background: #222;
`