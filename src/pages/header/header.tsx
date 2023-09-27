import React, { useLayoutEffect } from "react";
import styled from "styled-components";
import mainlogo from "../../assets/images/mainlogo.png";
import alarm from "../../assets/images/alarmlogo.svg";
import devide from "../../assets/images/divide1.svg";
import hamberger from "../../assets/images/hamburger-button.svg";
import { useNavigate } from "react-router-dom";
import { useIsLoginContext } from "../../components/auth/provider";

export default function Header() {
  const navigate = useNavigate();

  const [isLogged, setLogin, logout] = useIsLoginContext();

  useLayoutEffect(() => {
    const token = window.sessionStorage.getItem("accessToken");
    if (token) {
      setLogin(token);
    }
  }, []);

  const login = () => {
    navigate("/login");
  };

  return (
    <Layout>
      <Top>
        <div className="headerScreen">
          {!isLogged ? (
            <ul>
              <li>
                <span className="firstspan" onClick={() => login()}>
                  로그인/회원가입
                </span>
              </li>
              <li>
                <span>회원정보찾기</span>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <span className="firstspan">마이페이지</span>
              </li>
              <li>
                <button className="logout" onClick={() => logout()}>
                  로그아웃
                </button>
              </li>
            </ul>
          )}
        </div>
      </Top>
      <div className="Screen">
        <MainLogo alt="MainLogo" src={mainlogo} onClick={() => navigate("/")} />
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
    </Layout>
  );
}

const Layout = styled.div`
  height: 130px;
  border-bottom: solid 1px #e6e6e6;

  .Screen {
    justify-content: center;
    margin: 30px auto;
    width: 1240px;
    ul {
      font-size: 18px;
      font-weight: 500;
      line-height: 14px;
      margin: 0 0 0 81px;
      list-style-type: none;
      padding: 0;
      li {
        cursor: pointer;
        display: inline;
        margin: 0 20px 0 20px;
        vertical-align: top;
      }
      .devide {
        margin: 0 10px 0 10px;
        height: 14px;
      }
    }
  }

  div {
    display: flex;
    align-items: center;
  }

  .button {
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
  background: linear-gradient(90deg, #9b27aa 0%, #173dd0 100%);

  .headerScreen {
    width: 1240px;
    height: 100%;
    margin: 0 auto;
  }

  span {
    cursor: pointer;
    color: #fff;
    text-align: right;
    font-size: 12px;
    font-weight: 500;
    line-height: 12px;
  }

  ul {
    width: 100%;
    height: 100%;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: end;
    li {
      list-style: none;
      display: flex;
      align-items: center;
      .firstspan {
        margin-right: 20px;
      }
    }
  }
  .logout {
    cursor: pointer;
    padding: 0;
    border: none;
    background: none;
    color: #fff;
    text-align: right;
    font-size: 12px;
    font-weight: 500;
    line-height: 12px;
  }
`;

const MainLogo = styled.img`
  cursor: pointer;
`;
const Alarm = styled.div`
  background: #e7e7e7;
  margin: 0 15px 0 15px;
`;
const Hamburger = styled.div`
  background: #222;
`;
