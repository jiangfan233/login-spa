import styledComponents from "styled-components";
import { Form } from "../components/form";
import { Code } from "../components/code";
import pcBanner from "../assets/pc_banner.png"; 
import { Routes, Route } from "react-router-dom";



const LoginPage = styledComponents.div`
    display: flex;
    background-color: #F4F4FC;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
`

const Banner = styledComponents.img `
    height: 100%;
    object-fit: contain;
`

const ContentWrapper = styledComponents.div`
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-width: 400px;
    min-height: 480px;
    background: #FFFFFF;
    box-shadow: 0 0 20px 0 rgba(187,191,196,0.30);
    border-radius: 12px;
    padding: 40px 40px 24px;
    box-sizing: border-box;
`

const Content = styledComponents.div`
    
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
`

const Footer = styledComponents.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;

    .footer-divider {
        width: 100%;
        border: 1px solid #D0D3D6;
    }

    .footer-button {
        font-size: 14px;
        color: #3371FF;
        letter-spacing: 0;
        font-weight: 400;
        background-color: transparent;
        cursor: pointer;
    }
`

const Title = styledComponents.p`
    font-size: 28px;
    color: #333333;
    letter-spacing: 0;
    font-weight: 500;
    margin: 0;
`

export function Login() {

    return (
        <LoginPage>

            <Banner src={pcBanner} alt="banner"></Banner>

            <ContentWrapper>
                <Content>
                    <Title>DIGITALYCHEE</Title>

                    {/* 路由 */}
                    {/* <Form /> */}
                    {/* <Code /> */}

                    <Routes>
                        <Route path="/" element={<Form setToken />} />
                        <Route path="/code" element={<Code token />} />
                    </Routes>

                </Content>
                <Footer>
                    <div className="footer-divider"></div>
                    <button type="button" className="footer-button">其他方式登录</button>
                </Footer>
            </ContentWrapper>

        </LoginPage>
        
    )

}