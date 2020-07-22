const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// 10자리인 salt 생성
const saltRounds = 10;

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 50,
    },
    email: {
      type: String,
      trim: true,
      unique: 1,
    },
    password: {
      type: String,
      minlength: 5,
    },
    role: {
      type: Number,
      default: 0,
    },
    image: String,
    token: {
      type: String,
    },
    tokenExp: {
      type: Number,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  var user = this;

  //비밀번호를 바꿀때만 암호화 요청
  if (user.isModified("password")) {
    // salt 를 이용해서 비밀번호를 암호화
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        // hash는 암호된 비밀번호
        next();
      });
    });
  }
  // 아이디, 이메일 등을 바꿀때
  else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  // plainPassword를 암호화해서 암호화된 비밀번호랑 맞는지 확인
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  var user = this;

  // jsonwebtoken을 이용해서 토큰을 생성하기
  var token = jwt.sign(user._id.toHexString(), "secretToken");

  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.statics.findByToken = function (token, cb) {
  var user = this;

  // 토큰을 복호화(Decode) 한다
  jwt.verify(token, "secretToken", function (err, decoded) {
    // 유저 ID를 이용해서 유저를 찾고
    // 클라이언트에서 가져온 Token과 DB에 보관된 토큰이 일치하는지 확인
    user.findOne({ _id: decoded, token: token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
