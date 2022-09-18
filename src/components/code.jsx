import styledComponents from "styled-components";
import { FormItem } from "./formItem";
import avatar from "../assets/iphone_tx.png";
import pcPassword from "../assets/pc_password.png";
import { useState, useEffect, useRef } from "react";
import { validator } from "../../packages/utils";
import doRequest from "../../packages/apis";
import { useLocation } from "react-router-dom";

const AvatarWrapper = styledComponents.div`
    text-align: center;
    width: 100%;
    margin-top: 32px;

    .avatar {
        height: 72px;
        width: 72ppx;
        object-fit: contain;
    }
`;

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
    margin-top: 24px;
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

export function Code() {
  const location = useLocation();
  const token = location.state.token;

  const [data, setData] = useState({
    code: "",
  });
  const [err, setErr] = useState({
    code: null,
  });

  const [isActiveSubmitButton, setIsActiveButton] = useState(false);

  const rules = {
    code: [
      {
        pattern: /^[0-9]{6}$/,
        msg: "验证码格式不正确",
      },
    ],
  };

  const timerRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isActiveSubmitButton) {
      return;
    }
    // console.log(data);

    doRequest({
      url: "/login.php?phase=2",
      data: {
        tfa: data.code,
        "Bearer Token": token,
      },
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    }).then(
      (res) => {
        if (res && res.status === 0) {
          window.location.href = "https://www.lizhi.io";
        }
      },
      (err) => {
        console.log("err", err);
      }
    );
  };

  const validate = (value, rule, callback) => {
    validator(value, rule).then(
      (res) => {},
      (err) => {
        callback(err);
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
    <>
      <AvatarWrapper>
        <img className="avatar" src={avatar} alt="avatar" />
      </AvatarWrapper>
      <FormContainer onSubmit={handleSubmit}>
        <FormItem
          iconSrc={pcPassword}
          placeholder="请输入你的两步认证验证码"
          name="code"
          value={data.code}
          rule={rules.code}
          onChange={handleChange}
          err={err.code}
        />
        <FormButton
          className={isActiveSubmitButton ? "active" : "disabled"}
          type="submit"
        >
          确定
        </FormButton>
      </FormContainer>
    </>
  );
}
