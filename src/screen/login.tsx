import React from "react";
import styled from "styled-components";
import { kakao, naver, google, apple } from "../assets/images/logos/login";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const REST_API_KEY = "8b50bf7ebc92b598b57f31119902e442";
  const REDIRECT_URI = "http://localhost:3000/oauth";
  const kakaoLink = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (
    <Layout>
      <LoginBox>
        <LoginForm>
          <h1>로그인</h1>
          <h2>
            <div>반갑습니다.</div>
            <b>K-FIRI 한국외식산업연구원</b>입니다.
          </h2>
          <InputForm>
            <input placeholder="이메일 주소를 입력하세요." />
            <input placeholder="비밀번호 주소를 입력하세요." />
            <button className="loginButton">로그인</button>
          </InputForm>
          <div className="detailFunction">
            <button>회원정보찾기</button>
            <button>이메일 회원가입</button>
          </div>
          <hr />
          <div className="socialLogin">
            <Link to={kakaoLink}>
              <img alt="kakaologin" src={kakao} />
            </Link>
            <img alt="naverlogin" src={naver} />
            <img alt="googlelogin" src={google} />
            <img alt="applelogin" src={apple} />
          </div>
        </LoginForm>
      </LoginBox>
    </Layout>
  );
}
const Layout = styled.div`
  width: 100%;
  padding: 60px 0 100px;
  background-color: #f9f9f9;
`;
const LoginBox = styled.div`
  width: 600px;
  height: 820px;
  margin: 0 auto;
  background-color: white;
  border: solid 1px #d8dde5;
  border-radius: 15px;
`;

const LoginForm = styled.div`
  width: 320px;
  height: 660px;
  padding: 80px 140px;
  h1 {
    text-align: center;
    font-size: 24px;
    font-weight: 700;
    line-height: 30px;
    margin: 0 auto 50px;
  }
  > h2 {
    color: #666;
    font-size: 20px;
    font-weight: 400;
    line-height: 30px;
    margin-bottom: 25px;
  }

  .detailFunction {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    button {
      cursor: pointer;
      border: none;
      font-size: 13px;
      font-weight: 400;
      line-height: 13px;
      color: #555;
      background-color: white;
    }
  }

  hr {
    height: 1px;
    border: none;
    background-color: #bfbfbf;
    margin: 22px 0;
  }

  .socialLogin {
    img {
      cursor: pointer;
      vertical-align: top;
    }
    :not(:first-child) {
      margin-top: 10px;
    }
  }
`;

const InputForm = styled.form`
  input {
    width: calc(320px - 36px);
    height: 50px;
    font-size: 18px;
    padding: 0 18px;
    position: relative;
    border: none;
    border-radius: 10px;
    outline: solid 1px #d8dde5;
  }
  input:focus {
    outline: solid 2px red;
  }
  input:first-child {
    margin-bottom: 10px;
  }

  .loginButton {
    cursor: pointer;
    width: 320px;
    height: 60px;
    margin-top: 30px;
    font-size: 18px;
    font-weight: 600;
    line-height: 20px;
    border: none;
    border-radius: 10px;
    color: white;
    background-color: #5a33be;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
