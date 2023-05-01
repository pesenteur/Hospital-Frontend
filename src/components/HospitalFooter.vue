<template>
    <div class="footer">
        <el-divider/>
        <div>
            声明：本网站为北京航空航天大学软件学院2023年秋季学期软件工程基础课程的大作业，本网站所有功能仅供展示
        </div>
        <div>
            本项目于Github开源，网址为：
            <a href="https://github.com/BUAA-Software-Engineering-2023/Hospital-Frontend">
                https://github.com/BUAA-Software-Engineering-2023/Hospital-Frontend
            </a>
        </div>
        <div>
            <div class="area">
                <div class="title">项目贡献者</div>
                <div class="details">
                    <div class="type">
                        <div>前端</div>
                        <a href="https://github.com/orgs/BUAA-Software-Engineering-2023/people/BienBoy">BienBoy</a>
                        <a href="https://github.com/orgs/BUAA-Software-Engineering-2023/people/Tony15246">Tony15246</a>
                        <a href="https://github.com/orgs/BUAA-Software-Engineering-2023/people/Erreurist">Erreurist</a>
                    </div>
                    <div class="type">
                        <div>后端</div>
                        <a href="https://github.com/orgs/BUAA-Software-Engineering-2023/people/pesenteur">pesenteur</a>
                        <a href="https://github.com/orgs/BUAA-Software-Engineering-2023/people/Thebearcoding">Thebearcoding</a>
                    </div>
                </div>
            </div>
            <div class="area">
                <div class="title">开源工具</div>
                <div class="details">
                    <div class="type">
                        <div>前端</div>
                        <a href="https://vuejs.org/">Vue</a>
                        <a href="https://element-plus.org/">Element-Plus</a>
                    </div>
                    <div class="type">
                        <div>后端</div>
                        <a href="https://docs.djangoproject.com/">Django</a>
                        <a href="https://www.mysql.com/">MySQL</a>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>

</script>

<style scoped>
.footer {
    color: #333;
    justify-content: center;
    opacity: 0.5;
}

.footer > div {
    display: flex;
    justify-content: center;
    height: 40px;
}

.footer div a {
    text-decoration: none;
    color: #333;
}

.title {
    display: flex;
    justify-content: center;
}

.area {
    display: flex;
    flex-direction: column;
    margin: 0 20px;
}

.type {
    display: flex;
    flex-direction: column;
    text-align: center;
}

.type a {
    display: block;
    margin: 10px 20px;
}

.details {
    display: flex;
}

.type div {
    margin: 10px;
}
</style>