<template>
  <div class="login-box">
    <h1>版权所有-金渡教育-违者必究《后台管理系统》</h1>
    <div class="login-box-modal">
      <el-form label-width="80px" :model="form" ref="formRef" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="doLogin(formRef)">提交</el-button>
          <el-button @click="reset(formRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref , getCurrentInstance } from "vue";
export default defineComponent({
  setup() {

      // 获取组件实例
      const { proxy } = getCurrentInstance();

    // 响应式的内容
    const form = reactive({
      username: "",
      password: ""
    });
    // 约束规则
    const rules = reactive({
      username: [{ required: true, message: "必须输入用户名" }],
      password: [
        { required: true, message: "必须输入密码" },
        { min: 3, max: 10, message: "长度必须在3-10位数" }
      ]
    });
    // 获取页面元素
    const formRef = ref();
    // 提交验证
    const doLogin = formEl => {
      formEl.validate(async (valid, fields) => {
        if (valid) {
            
            const res = await proxy.$ajax.post('/login',form);
            console.log(res,',login');
          
        } else {
          console.log("error submit!", fields);
        }
      });
    };
    // 重置
    const reset = formEl => {
      if (!formEl) return;
      formEl.resetFields();
    };

    return {
      form,
      formRef,
      reset,
      rules,
      doLogin
    };
  }
});
</script>

<style>
</style>