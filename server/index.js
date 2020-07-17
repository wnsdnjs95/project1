const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const { User } = require("./models/User");

// application/x-www-form-urlencoded 데이터들을 분석
app.use(bodyParser.urlencoded({ extended: true }));
// application/json 데이터들을 분석
app.use(bodyParser.json());

mongoose
  .connect(
    `mongodb+srv://wnsdnjs95:wnsdnjs12!@@cluster123.651dw.mongodb.net/<dbname>?retryWrites=true&w=majority
`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Hello World!123"));

// 회원 가입을 위한 route
app.post("/api/register", (req, res) => {
  // 회원 가입 할 때 필요한 정보들을 client에서 가져오면
  // 그것들을 DB에 넣어준다

  // bodyParser dependency를 이용해 req.body로 클라이언트에 보내는 정보를 받아준다

  const user = new User(req.body);

  user.save((err, usrInfo) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
