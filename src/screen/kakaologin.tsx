import { gql, useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const GET_ACCESS_TOKEN = gql`
  mutation GetKakaoAccessToken($code: String!, $redirectUri: String!) {
    getKakaoAccessToken(code: $code, redirectUri: $redirectUri) {
      jwtData {
        access_token
      }
    }
  }
`;

export default function KakaoLogin() {
  const navigate = useNavigate();
  const location = useLocation();

  let code = new URL(window.location.href).searchParams.get("code"); //react에서 param 불러오기
  console.log(code);

  const [getAccessToken] = useMutation(GET_ACCESS_TOKEN, {
    onCompleted: (data) => {
      console.log(data.getKakaoAccessToken.jwtData.access_token);

      const accessToken = data.getKakaoAccessToken.jwtData.access_token;

      localStorage.setItem("token", accessToken);

      navigate("/");
    },
  });

  useEffect(() => {
    getAccessToken({
      variables: {
        code: `${code}`,
        redirectUri: "http://localhost:3000/oauth/kakao",
      },
    });
  }, []);

  return <></>;
}
