<template>
  <div class="login-box">
    <h1>shop</h1>
    <el-tabs type="border-card" stretch=true>
      <el-tab-pane label="Login"  style="text-align: center">

          <el-form label-width="80px" :model="form" ref="formRef" :rules="rules">
            <el-form-item label="username" prop="username">
              <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="password" prop="password">
              <el-input v-model="form.password"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button @click="doLogin(formRef)">summit</el-button>
              <el-button @click="reset(formRef)">reset</el-button>
            </el-form-item>
          </el-form>
      </el-tab-pane>

      <el-tab-pane label="Register">
        <el-form label-width="100px" :model="form" ref="formRef" :rules="rules">
          <el-form-item label="Username" prop="username">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="password" prop="password">
            <el-input v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item label="emai" prop="userEmail">
            <el-input v-model="form.userEmail"></el-input>
          </el-form-item>

          <el-form-item label="address" prop="address">
            <el-input v-model="form.address"></el-input>
          </el-form-item>

          <el-form-item label="adminKey" prop="adminCheck">
            <el-input v-model="form.adminCheck"></el-input>
          </el-form-item>

          <el-form-item label="check">
            <el-row>
              <el-button type="primary" @click="checkIdentifyCode" plain>
                CheckCode
              </el-button>
            </el-row>
          </el-form-item>



          <el-form-item>
            <el-button @click="doRegister(formRef)">summit</el-button>
            <el-button @click="reset(formRef)">reset</el-button>
          </el-form-item>


        </el-form>
      </el-tab-pane>
    </el-tabs>


  </div>
</template>

<script>
import {defineComponent, reactive, ref, getCurrentInstance} from "vue";
import {useRouter} from 'vue-router'

export default defineComponent({
  setup() {

    // ??????????????????
    const {proxy} = getCurrentInstance();
    console.log(proxy.$ajax, '???????????????ajax');
    console.log(proxy.$route, 'vue-router');
    console.log(proxy.$store, 'vuex');


    // ??????????????????
    const form = reactive({
      username: "",
      password: ""
    });
    // ????????????
    const rules = reactive({
      username: [{required: true, message: "necessary"}],
      password: [
        {required: true, message: "necessary"},
        {min: 3, max: 10, message: "lenth:3-10"}
      ]
    });
    // ??????????????????
    const formRef = ref();
    //?????????????????????router??????
    const router = useRouter()
    // ????????????

    //???????????? ????????????
    const doLogin = formEl => {
      formEl.validate(async (valid, fields) => {
        if (valid) {
          const res = await proxy.$ajax.post('/demo/login', form);
          //axios???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????server???res
          alert(JSON.stringify(res));

          console.log('????????????', res.data.code);
          //????????????
          if (res.data.code === 1) {
            sessionStorage.setItem("userName", form.username);
            await router.push('Index');
          } else {
            alert(res.data.msg)
          }

        } else {
          console.log("error submit!", fields);
        }
      });
    };
    //???????????? ????????????
    const doRegister = formEl => {
      formEl.validate(async (valid, fields) => {
        if (valid) {
          //??????????????????,????????????????????????0
          form.productId = 0;
          form.voucherId = 0;
          const res = await proxy.$ajax.post('/demo/register', form);

          console.log('????????????', res.data.code);
          //??????
          if (res.data.code === 1) {
            sessionStorage.setItem("userName", form.username);
            alert('register success');
          } else {
            alert(res.data.msg)
          }

        } else {
          console.log("error submit!", fields);
        }
      });
    };

    // ??????
    const reset = formEl => {
      if (!formEl) return;
      formEl.resetFields();
    };

    // ????????????
    function checkIdentifyCode()  {
      if(form.adminCheck === "ELEC5619"){
        form.admin = true;
        alert("valid key")
      }else{
        form.admin = false;
        alert("invalid key");
      }
    };





    return {
      form,
      formRef,
      reset,
      rules,
      doLogin,
      doRegister,
      checkIdentifyCode
    };
  }
});
</script>

<style>

body{
  margin:0;
  padding:0;
}

.login-box {
  display: flex;
  flex-direction: column;
  background-image: url("../assets/imgs/login.jpg");
  background-size: 100% 100%;
  background-attachment: fixed;

  width: 100%;
  height: 100%;
  min-width: 900px;
  min-height: 1000px;

  justify-content: center;
  align-items: center;
}



</style>