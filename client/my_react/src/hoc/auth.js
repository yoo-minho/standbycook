import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_action";

export default function (SpecificComponent, option, adminRoute) {
  //null => 유저 -> 출입 True
  //true => 로그인유저 -> 출입 True
  //false => 로그인유저 -> 출입 False

  function AuthenticationCheck(props) {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth()).then((response) => {
        const isLoginAuth = response.payload.isAuth;
        const isAdminAuth = response.payload.isAdmin;
        const isRenewToken = response.payload.isRenewToken;

        console.log('isLoginAuth', isLoginAuth);
        console.log('isAdminAuth', isAdminAuth);
        console.log('isRenewToken', isRenewToken);
        console.log('option', option);

        if(isRenewToken){
          
        } else if (option == null) {
          //모든 유저 통과
        } else if (option) {
          if (isLoginAuth) {
            if (adminRoute == null) {
              //모든 로그인 유저 통과
            } else if (adminRoute && isAdminAuth) {
              //어드민 권한 인증된 유저 통과
            } else {
              props.history.push("/");
            }
          } else {
            props.history.push("/login");
          }
        } else {
          if (isLoginAuth) {
            props.history.push("/");
          } else {
            //모든 비로그인 유저는 통과
          }
        }
      });
    }, [dispatch, props.history]);

    return <SpecificComponent></SpecificComponent>;
  }
  return AuthenticationCheck;
}
