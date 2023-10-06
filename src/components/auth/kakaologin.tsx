import { useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useIsLoginContext } from "./provider";
import {
  GET_KAKAO_ACCESS_TOKEN,
  GET_KAKAO_SIGNUP_ACCESS_TOKEN,
} from "../../api/login";

export default function KakaoLogin() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [, setLogin] = useIsLoginContext();

  const RedirectUri = process.env.REACT_APP_KAKAO_REDIRECT_URI;

  const code = searchParams.get("code");

  const [getKakaoAccessToken] = useMutation(GET_KAKAO_ACCESS_TOKEN);
  const [getKakaoSignUpAccessToken] = useMutation(
    GET_KAKAO_SIGNUP_ACCESS_TOKEN
  );

  const doKakaoLogin = async () => {
    const kakaoAccessToken = await getKakaoAccessToken({
      variables: {
        code: code,
        redirectUri: RedirectUri,
      },
    });
    const kakaoSignUpAccessToken = await getKakaoSignUpAccessToken({
      variables: {
        accessToken:
          kakaoAccessToken.data.getKakaoAccessToken.jwtData.access_token,
      },
    });
    setLogin(kakaoSignUpAccessToken.data.signUpKakao.token.accessToken);
    navigate("/", {
      replace: true,
    });
  };

  useEffect(() => {
    doKakaoLogin();
  }, []);

  return <></>;
}
