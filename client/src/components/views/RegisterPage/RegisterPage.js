import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_action";

function RegisterPage(props) {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };
  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };
  const onNameHandler = (e) => {
    setName(e.currentTarget.value);
  };
  const onConfirmPassword = (e) => {
    setConfirmPassword(e.currentTarget.value);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (Password !== ConfirmPassword) {
      return alert("비밀번호와 비밀번호 확인은 같아야 합니다!");
    }
    let body = {
      email: Email,
      password: Password,
      name: Name,
    };
    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        alert("회원가입이 완료되었습니다!");
        setTimeout(() => {
          props.history.push("/login");
        }, 1000);
      } else {
        alert("Error");
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <h1>회원가입</h1>
      <br />
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <label>Confirm Password </label>
        <input
          type="password"
          value={ConfirmPassword}
          onChange={onConfirmPassword}
        />
        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} />

        <br />
        <button type="submit">확인</button>
      </form>
    </div>
  );
}

export default RegisterPage;
