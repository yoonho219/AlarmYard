import React, { useState } from "react";
import styled from "styled-components";
import { kakao, naver, google, apple } from "../assets/images/logos/login";
import { useGoogleLogin } from "@react-oauth/google";
import {
  GET_GOOGLE_SIGNUP_ACCESS_TOKEN,
  GET_SIGNIN_ACCESS_TOKEN,
} from "../api/login";
import { useMutation } from "@apollo/client";
import { useIsLoginContext } from "../components/auth/provider";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { Kakao } = window;
  const navigate = useNavigate();

  const kakaoRedirectUri = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  const naverClientKey = process.env.REACT_APP_NAVER_CLIENT_KEY;

  const naverUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naverClientKey}&state=false&redirect_uri=http://localhost:3000/oauth/naver`;

  const [, setLogin] = useIsLoginContext();
  const [getLoginAccessToken] = useMutation(GET_SIGNIN_ACCESS_TOKEN);
  const [getGoogleSignUpAccessToken] = useMutation(
    GET_GOOGLE_SIGNUP_ACCESS_TOKEN
  );

  const [loginState, setLoginState] = useState({
    id: "",
    password: "",
  });

  const { id, password } = loginState;

  const changeLoginInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setLoginState({
      ...loginState,
      [name]: value,
    });
  };

  const normalLogin = async () => {
    const normalAccessToken = await getLoginAccessToken({
      variables: {
        loginId: loginState.id,
        password: loginState.password,
      },
    });
    console.log(normalAccessToken.data.signIn.accessToken);
    setLogin(normalAccessToken.data.signIn.accessToken);
    navigate("/chatting");
  };

  const kakaoLogin = () => {
    Kakao.Auth.authorize({
      redirectUri: kakaoRedirectUri,
      prompt: "select_account",
    });
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (res) => {
      const googleSignUpAccessToken = await getGoogleSignUpAccessToken({
        variables: {
          accessToken: res.access_token,
        },
      });
      setLogin(googleSignUpAccessToken.data.signUpGoogle.token.accessToken);
      navigate("/", {
        replace: true,
      });
    },
    onError: () => alert("에러에러"),
  });

  const naverLogin = () => {
    window.location.href = naverUrl;
  };

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
            <input
              type="email"
              name="id"
              value={id}
              onChange={(e) => changeLoginInput(e)}
              placeholder="이메일 주소를 입력하세요."
            />
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => changeLoginInput(e)}
              placeholder="비밀번호 주소를 입력하세요."
            />
            <button
              type="button"
              className="loginButton"
              onClick={() => normalLogin()}
            >
              로그인
            </button>
          </InputForm>
          <div className="detailFunction">
            <button type="button">회원정보찾기</button>
            <button type="button">이메일 회원가입</button>
          </div>
          <hr />
          <div className="socialLogin">
            <button type="button" onClick={() => kakaoLogin()}>
              <img alt="kakaologin" src={kakao} />
            </button>
            <button type="button" onClick={() => naverLogin()}>
              <img alt="naverlogin" src={naver} />
            </button>
            <button type="button" onClick={() => googleLogin()}>
              <img alt="googlelogin" src={google} />
            </button>
            <button type="button">
              <img alt="applelogin" src={apple} />
            </button>
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
  margin: 80px 0 0 140px;
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

  button {
    cursor: pointer;
    border: none;
    background-color: white;
  }

  .detailFunction {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    button {
      font-size: 13px;
      font-weight: 400;
      line-height: 13px;
      color: #555;
    }
  }

  hr {
    height: 1px;
    border: none;
    background-color: #bfbfbf;
    margin: 22px 0;
  }

  .socialLogin {
    button {
      width: 320px;
      height: 48px;
      padding: 0;
      img {
        vertical-align: top;
      }
    }
    :not(:first-child) {
      margin-top: 10px;
    }
  }
`;

const InputForm = styled.form`
  input {
    width: 284px;
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
