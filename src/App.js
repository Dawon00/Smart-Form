import React, { useState } from "react";
import styled from "styled-components";

const Title = styled.h1`
    display: flex;
    justify-content: center;
    @media (max-width: 736px) {
        /* Styles for mobile */
        /* Example: Change font size for mobile */
        padding-top: 100px;
    }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f9f9f9;
    @media (max-width: 736px) {
        /* Styles for mobile */
        /* Example: Change font size for mobile */
        padding-bottom: 100px;
    }
`;

const FormContainer = styled.div`
    width: 40%;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    @media (max-width: 736px) {
        /* Styles for mobile */
        /* Example: Change font size for mobile */
        width: 80%;
    }
`;

const TitleInput = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const InputContainer = styled.div`
    margin-right: 20px;
`;

const SubmitButton = styled.button`
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

const ResultContainer = styled.div`
    margin-top: 20px;
`;

const ResultContent = styled.p`
    font-size: 16px;
    line-height: 2;
`;

const convertLineBreaks = (text) => {
    return text.replace(/\n/g, "<br>");
};

const App = () => {
    const [question, setQuestion] = useState("");
    const [response, setResponse] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true); // 로딩 상태 설정

        fetch("http://localhost:3001/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ question }),
        })
            .then((res) => res.json())
            .then((data) => {
                setResponse(data.output);
                setIsLoading(false); // 로딩 상태 해제
            });
    };

    return (
        <Container>
            <Title>SmartForm ✒️</Title>

            <FormContainer>
                <form onSubmit={handleSubmit}>
                    <InputContainer>
                        <TitleInput
                            placeholder="원하는 양식이 무엇인가요?"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                        />
                    </InputContainer>

                    <SubmitButton type="submit">추천 받기 🚀</SubmitButton>
                </form>
                {isLoading ? (
                    <ResultContainer>
                        <ResultContent>잠시만 기다려주세요...🥹</ResultContent>
                    </ResultContainer>
                ) : (
                    response && (
                        <ResultContainer>
                            <ResultContent
                                dangerouslySetInnerHTML={{
                                    __html: convertLineBreaks(response),
                                }}
                            />
                        </ResultContainer>
                    )
                )}
            </FormContainer>
        </Container>
    );
};

export default App;
