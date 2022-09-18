import { useState, useEffect, useRef } from "react";
import styledComponents from "styled-components";
import pcEmail from "../assets/pc_emall.png";
import pcPassword from "../assets/pc_password.png";
import { FormItem } from "./formItem";
import { validator } from "../../packages/utils";
import doRequest from "../../packages/apis";
import { useNavigate } from "react-router-dom";

const FormButton = styledComponents.button`
    border-radius: 6px;
    border: 0;
    padding: 9px 0;
    text-align: center;
    font-size: 16px;
    color: #FFFFFF;
    letter-spacing: 0;
    font-weight: 400;    
`;
const FormContainer = styledComponents.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 28px;
    width: 100%;

    .disabled {
        background #BBBFC4;
        cursor: not-allowed;
    }

    .active {
        background: #3371FF;
        cursor: pointer;
    }
`;

export function Form() {

  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [isActiveSubmitButton, setIsActiveButton] = useState(false);

  const [err, setErr] = useState({
    email: null,
    password: null,
  });

  const timerRef = useRef(null);

  const rules = {
    email: [
      {
        pattern: /^[a-zA-Z0-9]{4,6}$/,
        msg: "邮箱格式错误，请重新输入",
      },
    ],
    password: [
      {
        pattern: /[\p{P}0-9a-zA-Z]{8,32}/,
        msg: "密码格式错误，请重新输入",
      },
    ],
  };

  const validate = (value, rule, callback) => {
    validator(value, rule).then(
      (res) => {},
      (err) => {
        callback(err);
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isActiveSubmitButton) {
      return;
    }
    // console.log(data);

    doRequest({
      url: "/login.php?phase=1",
      data: {
        username: data.email,
        password: data.password,
      },
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    }).then(
      (res) => {
        // console.log("res", res);
        if (res && res.status === 0) {
            navigate("/code", {state: { token: res.data?.token || "fake token" }});
        }
      },
      (err) => {
        
        // navigate("/code", {state: { token: "fake token" }});
      }
    );
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => {
      return {
        ...data,
        [name]: value,
      };
    });

    timerRef.current && clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      validate(value, rules[name], (msg) => {
        setErr((state) => {
          return {
            ...state,
            [name]: msg,
          };
        });
      });
    }, 100);
  };

  useEffect(() => {
    setIsActiveButton(
      Object.values(err).every((item) => !!item === false && item !== null)
    );
  }, [err]);

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormItem
        iconSrc={pcEmail}
        placeholder="请输入邮箱"
        name="email"
        value={data.email}
        rule={rules.email}
        onChange={handleChange}
        err={err.email}
      />

      <FormItem
        type="password"
        iconSrc={pcPassword}
        placeholder="请输入密码"
        name="password"
        value={data.password}
        rule={rules.password}
        onChange={handleChange}
        err={err.password}
      />

      <FormButton
        className={isActiveSubmitButton ? "active" : "disabled"}
        type="submit"
      >
        下一步
      </FormButton>
    </FormContainer>
  );
}
