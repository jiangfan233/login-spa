import styledComponents from "styled-components";

const FormItemWrapper = styledComponents.div`
    display: flex;
    flex-direction: column;

    .form-item-error {
        font-size: 12px;
        color: #FB797A;
        letter-spacing: 0;
        font-weight: 400;
        line-height: 12px;
    }

    .no-error {
        height: 12px;
        visibility: hidden;
    }

    .msg {
        margin-top: 8px;
    }
`;

const FormItemStyle = styledComponents.div`
    padding: 11px 16px;
    display: flex;
    gap: 12px;
    align-items: center;
    border: 1px solid #D0D3D6;
    border-radius: 6px;
`;

const FormIcon = styledComponents.img`
    object-fit: contain;
    width: 20px;
    height: 18px;
`;

const FormInput = styledComponents.input`
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #3B3C3D;
    letter-spacing: 0;
    font-weight: 400;
    border: 0;
    padding: 0;
    outline: none;
`;

export function FormItem({
  iconSrc,
  iconAlt = "icon",
  value,
  name,
  placeholder,
  onChange,
  err,
  type = "text"
}) {

  return (
    <FormItemWrapper>
      <FormItemStyle>
        <FormIcon src={iconSrc} alt={iconAlt}></FormIcon>
        <FormInput
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          type={type}
        ></FormInput>
      </FormItemStyle>
      <label className={err ? "form-item-error msg" : "no-error msg"}>{err}</label>
    </FormItemWrapper>
  );
}
