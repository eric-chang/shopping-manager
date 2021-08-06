<template>
  <div class="login_container">
    <!-- 登录背景盒子 -->
    <div class="login_box">
      <!-- 登录头像区域 -->
      <div class="login_img">
        <img id="img_login" src="../assets/logo.png" alt="" />
      </div>
      <!-- 登录输入表单区域 -->
      <div id="login_input">
        <el-form
          class="form_region"
          :model="inputForm"
          :rules="loginFormRule"
          ref="inputFormRef"
        >
          <el-form-item prop="username">
            <el-input
              prefix-icon="iconfont icon-user"
              v-model="inputForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              prefix-icon="iconfont icon-3702mima"
              v-model="inputForm.password"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item class="btn">
            <el-button type="primary" @click="Login">登录</el-button>
            <el-button type="info" @click="inputFormReset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputForm: {
        username: "",
        password: "",
      },
      loginFormRule: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    Login() {
      this.$refs.inputFormRef.validate(async (valid) => {
        if (valid) {
          const res = await this.$http.post("login", this.inputForm);
          if (res.data.meta.status !== 200) {
            this.$message.error("登录失败");
            return;
          }
          sessionStorage.setItem("token", res.data.data.token);
          this.$router.push("/home");
        }
      });
    },
    inputFormReset() {
      this.$refs.inputFormRef.resetFields();
    },
  },
};
</script>
<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  background-color: #fff;
  height: 300px;
  width: 450px;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .login_img {
    height: 130px;
    width: 130px;
    border-radius: 50%;
    border: solid 1px #eee;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    background-color: #fff;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    #img_login {
      height: 100%;
      width: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.form_region {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btn {
  display: flex;
  justify-content: flex-end;

  // float: right;
}
</style>