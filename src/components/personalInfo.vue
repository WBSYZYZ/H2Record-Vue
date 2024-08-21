<template>
    <el-dialog v-model="addVisible" :draggable="true" class="personalInfoDialog" @close="updateUserBasicInfo()">
        <div class="card" data-state="#about">
            <div class="card-header">
                <div class="card-cover" :style="{ 'background-image': 'url(' + avatarUrl + ')' }">
                </div>
                <div class="card-avatar">
                    <div class="avatar-edit">
                        <input type='file' id="imageUpload" accept=".png, .jpg, .jpeg" @change="avatarChange($event)" />
                        <label for="imageUpload"></label>
                    </div>
                    <div class="avatar-preview">
                        <div id="imagePreview" :style="{ 'background-image': 'url(' + avatarUrl + ')' }">
                        </div>
                    </div>
                </div>
                <h1 class="card-fullname" @click="ShowInputText($event, 'nickName')">{{ nickName }}</h1>
                <h2 class="card-jobtitle" @click="ShowInputText($event, 'post')">{{ post }}</h2>
            </div>
            <div class="card-main">
                <div class="card-section is-active" id="about">
                    <div class="card-content">
                        <div class="card-subtitle">ABOUT</div>
                        <p class="card-desc" @click="ShowInputTextArea($event, 'intro')">{{ intro }}
                        </p>
                    </div>
                    <div class="card-social">
                        <a href="#"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M15.997 3.985h2.191V.169C17.81.117 16.51 0 14.996 0c-3.159 0-5.323 1.987-5.323 5.639V9H6.187v4.266h3.486V24h4.274V13.267h3.345l.531-4.266h-3.877V6.062c.001-1.233.333-2.077 2.051-2.077z" />
                            </svg></a>
                        <a href="#"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path
                                    d="M512 97.248c-19.04 8.352-39.328 13.888-60.48 16.576 21.76-12.992 38.368-33.408 46.176-58.016-20.288 12.096-42.688 20.64-66.56 25.408C411.872 60.704 384.416 48 354.464 48c-58.112 0-104.896 47.168-104.896 104.992 0 8.32.704 16.32 2.432 23.936-87.264-4.256-164.48-46.08-216.352-109.792-9.056 15.712-14.368 33.696-14.368 53.056 0 36.352 18.72 68.576 46.624 87.232-16.864-.32-33.408-5.216-47.424-12.928v1.152c0 51.008 36.384 93.376 84.096 103.136-8.544 2.336-17.856 3.456-27.52 3.456-6.72 0-13.504-.384-19.872-1.792 13.6 41.568 52.192 72.128 98.08 73.12-35.712 27.936-81.056 44.768-130.144 44.768-8.608 0-16.864-.384-25.12-1.44C46.496 446.88 101.6 464 161.024 464c193.152 0 298.752-160 298.752-298.688 0-4.64-.16-9.12-.384-13.568 20.832-14.784 38.336-33.248 52.608-54.496z" />
                            </svg></a>
                        <a href="#"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M301 256c0 24.852-20.148 45-45 45s-45-20.148-45-45 20.148-45 45-45 45 20.148 45 45zm0 0" />
                                <path
                                    d="M332 120H180c-33.086 0-60 26.914-60 60v152c0 33.086 26.914 60 60 60h152c33.086 0 60-26.914 60-60V180c0-33.086-26.914-60-60-60zm-76 211c-41.355 0-75-33.645-75-75s33.645-75 75-75 75 33.645 75 75-33.645 75-75 75zm86-146c-8.285 0-15-6.715-15-15s6.715-15 15-15 15 6.715 15 15-6.715 15-15 15zm0 0" />
                                <path
                                    d="M377 0H135C60.562 0 0 60.563 0 135v242c0 74.438 60.563 135 135 135h242c74.438 0 135-60.563 135-135V135C512 60.562 451.437 0 377 0zm45 332c0 49.625-40.375 90-90 90H180c-49.625 0-90-40.375-90-90V180c0-49.625 40.375-90 90-90h152c49.625 0 90 40.375 90 90zm0 0" />
                            </svg></a>
                        <a href="#"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M23.994 24v-.001H24v-8.802c0-4.306-.927-7.623-5.961-7.623-2.42 0-4.044 1.328-4.707 2.587h-.07V7.976H8.489v16.023h4.97v-7.934c0-2.089.396-4.109 2.983-4.109 2.549 0 2.587 2.384 2.587 4.243V24zM.396 7.977h4.976V24H.396zM2.882 0C1.291 0 0 1.291 0 2.882s1.291 2.909 2.882 2.909 2.882-1.318 2.882-2.909A2.884 2.884 0 002.882 0z" />
                            </svg></a>
                    </div>
                </div>
                <div class="card-section" id="experience">
                    <div class="card-content">
                        <div class="card-subtitle">经 历</div>
                        <div class="card-timeline">
                            <div class="card-item" v-for="item in experience" :key="item.year">
                                <div class="card-item-data-year" :data-year="item.year" @click="ShowInputTimeText($event)">
                                </div>
                                <div class="card-item-title" @click="ShowInputText($event)">{{ item.company }}
                                </div>
                                <div class="card-item-desc" @click="ShowInputTextArea($event)">{{ item.description }}</div>
                            </div>
                        </div>
                        <div class="card-item">
                            <div class="card-item-data-year" data-year="新增" @click="pushNewExperience"></div>
                            <input class="card-item-data-year-input" placeholder="时间" maxlength="4" v-model="addTime">
                            <input class="card-item-title-input" placeholder="公司" maxlength="20" v-model="addCompany">
                            <textarea class="card-item-desc-textarea" placeholder="描述" maxlength="100"
                                v-model="addDescription"></textarea>
                        </div>
                    </div>
                </div>
                <div class="card-section" id="contact">
                    <div class="card-content">
                        <div class="card-subtitle">联系方式</div>
                        <div class="card-contact-wrapper">
                            <div class="card-contact">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                                <p @click="ShowInputTextArea($event, 'address')">{{ address }}</p>
                            </div>
                            <div class="card-contact">
                                <svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 24 24" fill="none"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path
                                        d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                                </svg>
                                <p @click="ShowInputText($event, 'phone')">{{ phone }}</p>
                            </div>
                            <div class="card-contact">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                    <path d="M22 6l-10 7L2 6" />
                                </svg>
                                <p @click="ShowInputText($event, 'email')">{{ email }}</p>
                            </div>
                            <button class="contact-me">与我一起</button>
                        </div>
                    </div>
                </div>
                <div class="card-buttons">
                    <button data-section="#about" class="is-active">关于我</button>
                    <button data-section="#experience">经历</button>
                    <button data-section="#contact">联系方式</button>
                </div>
            </div>
        </div>
    </el-dialog>
</template>
<script>
import { toRefs, reactive, onMounted, getCurrentInstance, onUpdated, ref } from 'vue';
import { ElMessage } from 'element-plus';
import 'element-plus/es/components/message/style/css';
export default {
    name: "personalInfo",
    data() {
        return {
            addVisible: false,
            addTime: "",
            addDescription: "",
            addCompany: ""
        }
    },
    props: {
        basicVal: {
            type: Object
        }
    },
    setup(props) {
        const instance = getCurrentInstance();
        const axios = instance.appContext.config.globalProperties.$axios;

        onMounted(() => {

        });

        onUpdated(() => {
            const buttons = document.querySelectorAll(".card-buttons button");
            const sections = document.querySelectorAll(".card-section");
            const card = document.querySelector(".card");

            const handleButtonClick = e => {
                const targetSection = e.target.getAttribute("data-section");
                const section = document.querySelector(targetSection);
                targetSection !== "#about" ?
                    card.classList.add("is-active") :
                    card.classList.remove("is-active");
                card.setAttribute("data-state", targetSection);
                sections.forEach(s => s.classList.remove("is-active"));
                buttons.forEach(b => b.classList.remove("is-active"));
                e.target.classList.add("is-active");
                section.classList.add("is-active");
            };

            buttons.forEach(btn => {
                btn.addEventListener("click", handleButtonClick);
            });
        });
        const UserBasicInfoData = reactive({
            phone: props.basicVal.phone,
            post: props.basicVal.post == (""||undefined) ? "职位" : props.basicVal.post,
            nickName: props.basicVal.nickName,
            address: props.basicVal.address == (""||undefined) ? "地址" : props.basicVal.address,
            email: props.basicVal.email == (""||undefined) ? "邮箱" : props.basicVal.email,
            intro: props.basicVal.intro == (""||undefined) ? "简介" : props.basicVal.intro,
            experience: props.basicVal.experience,
            icon: props.basicVal.icon
        });

        const avatarUrl = ref(props.basicVal.icon);
        function avatarChange(event) {
            const reader = new FileReader();
            const file = event.target.files[0];
            reader.readAsDataURL(file);
            reader.onload = async function (e) {
                let base64String = e.target.result;
                const response = await axios.post("/dashBoard/user/uploadAvatarInfo", { icon: base64String })
                    .catch((err) => {
                        ElMessage.error(err);
                    });
                if (response.status == 200) {
                    avatarUrl.value = response.data.data;
                    ElMessage.success("上传成功！")
                } else {
                    ElMessage.error("上传失败！")
                }
            }
        }

        const ShowInputText = (event, col) => {
            const element = event.currentTarget;
            if (element.querySelectorAll("*").length > 0) {
                return;
            }
            const oldhtml = element.innerHTML;
            //创建新的input元素
            const newobj = document.createElement('input');
            //为新增元素添加类型
            newobj.type = 'text';
            newobj.maxLength = 15;
            //为新增元素添加value值
            newobj.value = oldhtml;
            //为新增元素添加光标离开事件
            newobj.onblur = async function () {
                if (col == "nickName") {
                    const val = this.value;
                    let hasExist = true
                    await axios.get("/dashBoard/user/checkUserNickName",
                        {
                            params: {
                                nickName: val
                            }
                        }
                    )
                        .then(function (resp) {
                            if (resp.data.success == false) {
                                ElMessage({
                                    showClose: true,
                                    message: resp.data.errorMsg,
                                    type: "warning",
                                    duration: 3000
                                });
                                hasExist = false;
                            }
                        })
                        .catch((err) => {
                            ElMessage.error(err);
                        });
                    if (hasExist == false) {
                        element.innerHTML = oldhtml
                        return;
                    }
                }
                element.innerHTML = this.value == oldhtml ? oldhtml : this.value;
                //当触发时判断新增元素值是否为空，为空则不修改，并返回原有值
                switch (col) {
                    case "nickName":
                        UserBasicInfoData.nickName = this.value;
                        break;
                    case "post":
                        UserBasicInfoData.post = this.value;
                        break;
                    case "phone":
                        UserBasicInfoData.phone = this.value;
                        break;
                    case "email":
                        UserBasicInfoData.email = this.value;
                        break;
                }
            }
            //设置该标签的子节点为空
            element.innerHTML = '';
            //添加该标签的子节点，input对象
            element.appendChild(newobj);
            //设置选择文本的内容或设置光标位置（两个参数：start,end；start为开始位置，end为结束位置；如果开始位置和结束位置相同则就是光标位置）
            newobj.setSelectionRange(0, oldhtml.length);
            //设置获得光标
            newobj.focus();
        }
        const ShowInputTimeText = (event) => {
            const element = event.currentTarget;
            if (element.querySelectorAll("*").length > 0) {
                element.querySelectorAll("*")[0].setAttribute("style", "");
                element.querySelectorAll("*")[0].setSelectionRange(0, element.getAttribute("data-year").length);
                element.querySelectorAll("*")[0].focus();
                return;
            }
            const oldhtml = element.getAttribute("data-year");
            //创建新的input元素
            const newobj = document.createElement('input');
            //为新增元素添加类型
            newobj.type = 'text';
            newobj.maxLength = 4;
            //为新增元素添加value值
            newobj.value = oldhtml;
            //为新增元素添加光标离开事件
            const oldValue = element.getAttribute("data-year");
            newobj.onblur = function () {
                if (this.value != null && this.value != "") {
                    element.setAttribute("data-year", this.value == oldValue ? oldValue : this.value);
                    //当触发时判断新增元素值是否为空，为空则不修改，并返回原有值 
                }
                this.setAttribute("style", "display:none");
            }
            //设置该标签的子节点为空
            element.innerHTML = '';
            //添加该标签的子节点，input对象
            element.appendChild(newobj);
            //设置选择文本的内容或设置光标位置（两个参数：start,end；start为开始位置，end为结束位置；如果开始位置和结束位置相同则就是光标位置）
            newobj.setSelectionRange(0, oldhtml.length);
            //设置获得光标
            newobj.focus();
        }
        const ShowInputTextArea = (event, col) => {
            const element = event.currentTarget;
            if (element.querySelectorAll("*").length > 0) {
                return;
            }
            const oldhtml = element.innerHTML;
            //创建新的input元素
            const newobj = document.createElement('textarea');
            //为新增元素添加类型
            newobj.className = "text-area-show";
            newobj.maxLength = 100;
            //为新增元素添加value值
            newobj.value = oldhtml;
            //为新增元素添加光标离开事件
            newobj.onblur = function () {
                element.innerHTML = this.value == oldhtml ? oldhtml : this.value;
                //当触发时判断新增元素值是否为空，为空则不修改，并返回原有值 
                switch (col) {
                    case "intro":
                        UserBasicInfoData.intro = this.value;
                        break;
                    case "address":
                        UserBasicInfoData.address = this.value;
                        break;
                }
            }
            //设置该标签的子节点为空
            element.innerHTML = '';
            //添加该标签的子节点，input对象
            element.appendChild(newobj);
            //设置选择文本的内容或设置光标位置（两个参数：start,end；start为开始位置，end为结束位置；如果开始位置和结束位置相同则就是光标位置）
            newobj.setSelectionRange(0, oldhtml.length);
            //设置获得光标
            newobj.focus();
        }
        return {
            ...toRefs(UserBasicInfoData),
            UserBasicInfoData,
            ShowInputText,
            ShowInputTimeText,
            ShowInputTextArea,
            avatarChange,
            avatarUrl,
        };

    },
    methods: {
        init() {
            this.addVisible = true;
        },
        updateUserBasicInfo() {
            let data = {
                phone: this.UserBasicInfoData.phone,
                post: this.UserBasicInfoData.post,
                nickName: this.UserBasicInfoData.nickName,
                address: this.UserBasicInfoData.address,
                email: this.UserBasicInfoData.email,
                intro: this.UserBasicInfoData.intro,
                experience: this.UserBasicInfoData.experience,
            }
            this.$axios.post("/dashBoard/user/updateUserBasicInfo", data)
                .catch((err) => {
                    ElMessage.error(err);
                });
            const pushData = { UserBasicInfoData: this.UserBasicInfoData, avatarUrl: this.avatarUrl }
            this.$emit('pushUserBasicInfo', pushData)
        },
        pushNewExperience() {
            if (this.addDescription != "" && this.addCompany != "" && this.addTime != null) {
                this.UserBasicInfoData.experience.push({
                    description: this.addDescription,
                    company: this.addCompany,
                    year: this.addTime
                })
                this.addDescription = "";
                this.addCompany = "";
                this.addTime = "";
            } else {
                ElMessage.warning("请填写所有内容!");
            }
        },

    },
}
</script>
<style scoped>
@import url("./css/personalInfo-style.css");
@import url("./css/personalInfo-dialog.css");
</style>