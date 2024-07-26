<template>
  <div class="container">
    <div class="login-box">
      <el-tabs v-model="activeName" >
        <el-tab-pane label="Login" name="first" style="font-weight: bold;">
          <el-form :model="form" :rules="rules" ref="ruleForm">
            <el-form-item label="Name" prop="name" class="item-class">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="Password" prop="password" class="item-class">
              <el-input v-model="form.password" show-password></el-input>
            </el-form-item>
            <div class="btn" @click="login('ruleForm')" style="margin-top: 40%;font-weight: bold;">
              <a @click="login('ruleForm')"> Login </a>
            </div>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="Register" name="second" style="font-weight: bold;">
          <el-form :model="regForm" :rules="regRules" ref="ruleRegForm" class="item-class">
            <el-form-item label="Name" prop="reg_name">
              <el-input v-model="regForm.reg_name"></el-input>
            </el-form-item>
            <el-form-item label="Password" prop="reg_password" class="item-class">
              <el-input v-model="regForm.reg_password" show-password></el-input>
            </el-form-item>
            <el-form-item label="Confirm Password" prop="confirm_password" class="item-class">
              <el-input v-model="regForm.confirm_password" show-password></el-input>
            </el-form-item>
            <div class="btn" @click="register('ruleRegForm')"
              style="margin-top: 8.6vh;font-weight:bold;">
              <a @click="register('ruleRegForm')"> Register </a>
            </div>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang='ts' setup>
import axios from 'axios';
import { getCurrentInstance, onMounted, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import conf from './Utils/config';

// const url = 'http://192.168.1.33:81/main-page';
// const url = 'http://10.99.150.100:81/main-page';
const activeName = 'first';
const form = ref({
  name: 'abc',
  password: '123',
});
const regForm = ref({
  reg_name: '',
  reg_password: '',
  confirm_password: '',
});
const rules = {
  name: [{ required: true, message: 'Please input name', trigger: 'blur' }],
  password: [{ required: true, message: 'Please input password', trigger: 'blur' }],
};
const regRules = {
  reg_name: [{ required: true, message: 'Please input name', trigger: 'blur' }],
  reg_password: [{ required: true, message: 'Please input password', trigger: 'blur' }],
  confirm_password: [{ required: true, message: 'Please input password', trigger: 'blur' }],
};

const rf = ref();
const router = useRouter();

onMounted(() => {
  rf.value = getCurrentInstance();
  console.log(rf.value);
});
function login(formName: any) {
  rf.value.refs[formName].validate((valid: any) => {
    if (valid) {
      axios
        .post(
          `${conf.url}/login`,
          {
            username: form.value.name,
            password: form.value.password,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        .then((res) => {
          console.log(res, '//////');
          rf.value.proxy.$message.closeAll();
          if (res.data.accessToken != null) {
            localStorage.setItem('token', res.data.accessToken);
            // set username
            localStorage.setItem('username', form.value.name);
            ElMessage({
              message: 'Login success!',
              type: 'success',
            });
            router.push({
              name: 'about',
              // params: {
              //   username: form.value.name,
              //   token: res.data.accessToken,
              // },
            });
          } else {
            ElMessage({
              message: 'Login fail! Please check info!',
              type: 'warning',
            });
          }
        });
    } else {
      console.log('error submit!!');
      return false;
    }
  });
}
function register(formName: any) {
  rf.value.refs[formName].validate((valid: any) => {
    if (valid) {
      if (regForm.value.reg_password !== regForm.value.confirm_password) {
        rf.value.proxy.$message.closeAll();
        ElMessage({
          message: 'password not same!',
          type: 'warning',
        });
      } else {
        axios
          .post(`${conf.url}/register`, {
            username: regForm.value.reg_name,
            password: regForm.value.reg_password,
          })
          .then((res) => {
            console.log(res);
            rf.value.proxy.$message.closeAll();
            if (res.data[0].msg === 'OK') {
              ElMessage({
                message: 'Register success!',
                type: 'success',
              });
            } else {
              ElMessage({
                message: res.data[0].msg,
                type: 'warning',
              });
            }
          })
          .catch((error) => {
            ElMessage({
              message: error.response.data.msg,
              type: 'warning',
            });
          });
      }
    } else {
      return false;
    }
  });
}
</script>

<style scoped>
.container {
  background-image: linear-gradient(to left bottom, #002976, #0059a3, #0089c8, #00bbe6, #66ecff);
  display: flex;
  align-items: center;
  height: 100vh;
}

.login-box {
  width: 350px;
  height: 400px;
  margin: 120px auto;
  margin-top: 20vh;
  border: 1px solid #dcdfe6;
  padding: 20px;
  border-radius: 20px;
  background-color: aliceblue;
  box-shadow: 0 0 30px 10px rgba(0, 0, 0, .3);
}

.login-title {
  text-align: center;
}

:v-deep .el-input__inner {
  border-radius: 10px;
}

.item-class {
  margin-top: 30px;
  margin-bottom: 0px;
}

.btn {
  width: 100px;
  height: 40px;
  margin-left: 67%;
  margin-bottom: 20px;
  font-size: 16px;
  color: #525252;
  border-radius: 13px;
  background: #ffffff;
  box-shadow: 2px 2px 3px #e3e7f1, 2px 2px 3px #e3e7f1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn:active {
  transform: scale(0.96);
}
</style>
