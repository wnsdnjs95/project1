const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const config = require("./config/key");

const { User } = require("./models/User");

// application/x-www-form-urlencoded 데이터들을 분석
app.use(bodyParser.urlencoded({ extended: true }));
// application/json 데이터들을 분석
app.use(bodyParser.json());

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
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

app.post("/api/login", (req, res) => {
  // 요청된 이메일을 DB에서 찾는다
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다",
      });
    }
    // 요청된 이메일이 DB에 있다면 비밀번호가 맞는지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다",
        });
      // 비밀번호가 맞다면 TOKEN을 생성한다
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // 토큰을 쿠키에 저장한다
      });
    });
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
