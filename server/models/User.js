const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
