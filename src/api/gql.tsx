import { gql } from "@apollo/client";

//KAKAO
export const GET_KAKAO_ACCESS_TOKEN = gql`
  mutation GetKakaoAccessToken($code: String!, $redirectUri: String!) {
    getKakaoAccessToken(code: $code, redirectUri: $redirectUri) {
      jwtData {
        access_token
      }
    }
  }
`;
export const GET_KAKAO_SIGNUP_ACCESS_TOKEN = gql`
  mutation SignUpKakao($accessToken: String!) {
    signUpKakao(accessToken: $accessToken) {
      token {
        accessToken
      }
      user {
        id
      }
    }
  }
`;

//GOOGLE
export const GET_GOOGLE_SIGNUP_ACCESS_TOKEN = gql`
  mutation SignUpGoogle($accessToken: String!) {
    signUpGoogle(accessToken: $accessToken) {
      token {
        accessToken
      }
      user {
        id
      }
    }
  }
`;

//naver
export const GET_NAVER_SIGNUP_ACCESS_TOKEN = gql`
  mutation SignUpNaver($accessToken: String!) {
    signUpNaver(accessToken: $accessToken) {
      token {
        accessToken
      }
      user {
        id
      }
    }
  }
`;
