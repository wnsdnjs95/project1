import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_action";

export default function (SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth()).then((response) => {
        // 로그인 하지 않은 상태
        if (!response.payload.isAuth) {
          if (option) {
            props.history.push("/login");
          }
        } else {
          // 로그인한 상태
          if (adminRoute && !response.payload.isAdmin) {
            // 관리자가 아닌데 관리자 페이지로 갈 경우
            props.history.push("/");
          } else {
            if (!option) {
              // 로그인한 사람이 회원가입, 로그인 하려 할 때
              props.history.push("/");
            }
          }
        }
      });
    }, []);

    return <SpecificComponent {...props} />;
  }

  return AuthenticationCheck;
}
