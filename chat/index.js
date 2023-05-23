const OpenAI = require("openai");
const { Configuration, OpenAIApi } = OpenAI;

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { org, apiKey } = require("./secret");
const app = express();
const port = 3001;

const configuration = new Configuration({
    organization: org,
    apiKey: apiKey,
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req, res) => {
    const { question } = req.body;
    console.log("응답 요청");
    const result = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content:
                    "사용자가 양식을 입력할거야. 그 양식에 들어갈 항목들을 잘 정리해서 추천해줘.",
            },
            {
                role: "user",
                content: question,
            },
        ],
    });
    console.log(result.data.choices[0].message.content);

    res.json({
        output: result.data.choices[0].message.content,
    });
});

app.listen(port, () => {
    console.log("Example app port: " + port);
});
