import { useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useIsLoginContext } from "./provider";
import { GET_NAVER_SIGNUP_ACCESS_TOKEN } from "../../api/login";

export default function NaverLogin() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [, setLogin] = useIsLoginContext();

  const naverClientKey = process.env.REACT_APP_NAVER_CLIENT_KEY;
  const naverSecretKey = process.env.REACT_APP_NAVER_SECRET_KEY;

  const code = searchParams.get("code")!;
  const state = searchParams.get("state")!;

  const [getNaverSignUpAccessToken] = useMutation(
    GET_NAVER_SIGNUP_ACCESS_TOKEN
  );

  const getNaverToken = async (): Promise<string> => {
    const res = await new Promise((resolve, reject) => {
      fetch(
        `/oauth2.0/token?client_id=${naverClientKey}&client_secret=${naverSecretKey}&grant_type=authorization_code&state=${state}&code=${code}`
      );
      resolve(res);
      reject(alert("에러에러"));
    });

    return new Promise((resolve, reject) => {
      fetch(
        `/oauth2.0/token?client_id=${naverClientKey}&client_secret=${naverSecretKey}&grant_type=authorization_code&state=${state}&code=${code}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            resolve(data.access_token);
          } else {
            reject(alert("에러에러"));
          }
        });
    });
  };

  const doNaverLogin = async () => {
    const access_token = await getNaverToken();

    const naverSignUpAccessToken = await getNaverSignUpAccessToken({
      variables: {
        accessToken: access_token,
      },
    });
    setLogin(naverSignUpAccessToken.data.signUpNaver.token.accessToken);
    navigate("/", {
      replace: true,
    });
  };

  useEffect(() => {
    doNaverLogin();
  }, []);

  return <></>;
}
