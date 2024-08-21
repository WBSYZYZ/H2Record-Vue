<template>
  <el-dialog v-model="addVisible" :draggable="true" class="toDoAddDialog">
    <div class="app-container-add">
      <h1 class="app-header-add">TO DO LIST</h1>
      <div class="add-task">
        <input type="text" autocomplete="off" placeholder="Task Title" v-model="tasks.title" @keyup.enter="newItem"
          class="task-input-title" />
        <input type="text" autocomplete="off" placeholder="Task Details" v-model="tasks.detail" @keyup.enter="newItem"
          class="task-input" />
        <el-date-picker v-model="tasks.exceptDate" type="date" placeholder="Pick a Date" format="YYYY/MM/DD"
          value-format="YYYY-MM-DD" :teleported="false" />
          <el-color-picker v-model="tasks.exceptColor" show-alpha :predefine="predefineColors" color-format='hex' />
        <button value="" class="submit-task-add" @click="newItem" title="Add Task"></button>
      </div>
      <ul class="task-list">
        <li class="task-list-item" v-for="task in tasks" :key="task" :style="{'background-color': task.exceptColor}">
          <label class="task-list-item-label">
            <input type="checkbox" />
            <span>{{task.exceptDate}}:{{task.title}}:{{ task.detail }}</span>
          </label>
          <span @click="delItem(task)" class="delete-btn" title="Delete Task">{{
            task.del
          }}</span>
        </li>
      </ul>
        <button v-if="submitView" value="" class="submit-task-all" @click="submitAll"></button>
    </div>
  </el-dialog>
</template>
<script>
import { onUnmounted, onUpdated } from "vue";
import jquery from "jquery";
import { ElMessage } from 'element-plus';
export default {
  name: "toDoAdd",
  inject: ['reload'],
  data() {
    return {
      addVisible: false,
      submitView: false,
      detail: "",
      task: "",
      title:"",
      tasks: [
      ],
      color:"rgba(255, 69, 0, 0.68)",
      predefineColors:[
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
]
    };
  },
  methods: {
    init() {
      this.addVisible = true;
    },
    newItem: function () {
      if (!this.tasks.title) {
        return;
      }
      this.tasks.push({
        title: this.tasks.title,
        detail: this.tasks.detail,
        exceptDate: this.tasks.exceptDate,
        exceptColor: this.tasks.exceptColor,
        del: "",
      });
      this.submitView= true;
      this.tasks.title = "";
      this.tasks.detail = "";
      this.tasks.exceptDate = "";
      this.tasks.exceptColor= "";
    },
    delItem: function (task) {
      this.tasks.splice(this.tasks.indexOf(task), 1);
      if(this.tasks.length==0){
        this.submitView= false;
      }
    },
    async submitAll(){
      const reponse=await this.$axios.post("/dashBoard/user/submitAll",this.tasks)
    .catch((err) => {
      ElMessage.error(err);
    })
      if(reponse.status==200){
        this.addVisible=false;
        this.tasks=[];
        this.reload();
      }
    },
  },
  setup() {

    let colors = new Array(
      [62, 35, 255],
      [60, 255, 60],
      [255, 35, 98],
      [45, 175, 230],
      [255, 0, 255],
      [255, 128, 0]);

    let step = 0;
    //color table indices for: 
    // current color left
    // next color left
    // current color right
    // next color right
    let colorIndices = [0, 1, 2, 3];

    //transition speed
    let gradientSpeed = 0.002;
    function updateGradient() {
      if (jquery === undefined) return;

      let c0_0 = colors[colorIndices[0]];
      let c0_1 = colors[colorIndices[1]];
      let c1_0 = colors[colorIndices[2]];
      let c1_1 = colors[colorIndices[3]];

      let istep = 1 - step;
      let r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
      let g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
      let b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
      let color1 = "rgb(" + r1 + "," + g1 + "," + b1 + ")";

      let r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
      let g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
      let b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
      let color2 = "rgb(" + r2 + "," + g2 + "," + b2 + ")";

      jquery(".app-container-add")
        .css({
          background:
            "-webkit-gradient(linear, left top, right top, from(" +
            color1 +
            "), to(" +
            color2 +
            "))",
        })
        .css({
          background:
            "-moz-linear-gradient(left, " +
            color1 +
            " 0%, " +
            color2 +
            " 100%)",
        });
        jquery(".toDoAddDialog")
        .css({
          background:
            "-webkit-gradient(linear, left top, right top, from(" +
            color1 +
            "), to(" +
            color2 +
            "))",
        })
        .css({
          background:
            "-moz-linear-gradient(left, " +
            color1 +
            " 0%, " +
            color2 +
            " 100%)",
        });
      step += gradientSpeed;
      if (step >= 1) {
        step %= 1;
        colorIndices[0] = colorIndices[1];
        colorIndices[2] = colorIndices[3];

        //pick two new target color indices
        //do not pick the same as the current one
        colorIndices[1] =
          (colorIndices[1] +
            Math.floor(1 + Math.random() * (colors.length - 1))) %
          colors.length;
        colorIndices[3] =
          (colorIndices[3] +
            Math.floor(1 + Math.random() * (colors.length - 1))) %
          colors.length;
      }
    }
    let updateGradientState = null;
    let updateGradientStateFlag = false;
    onUpdated(() => {
      if (updateGradientStateFlag == false) {
        updateGradientState = setInterval(updateGradient, 10);
        updateGradientStateFlag = true;
      } else {
        clearInterval(updateGradientState);
        updateGradientStateFlag = false
      }
    });
    onUnmounted(() => {
      clearInterval(updateGradientState);
    });
  },
};
</script>
<style scoped>
@import url("./css/todo-style.css");
@import url("../index/css/element-dialog.css");
</style>