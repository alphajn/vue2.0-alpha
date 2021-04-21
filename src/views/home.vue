<template>
    <div class="home">
        {{ $t('test.title') }}
        <button @click="changeLang">
            切换语言
        </button>
    </div>
</template>

<script>

export default {
    name: 'Home',
    created() {
        this.getCurrency();
    },
    methods: {
        getCurrency() {
            this.$api.api.getCurrency().then((res) => {
                console.log(res);
            });
        },
        changeLang() {
            const lang = this.$i18n.locale === 'zh-cn' ? 'en-us' : 'zh-cn';

            this.$i18n.setLang(lang, true);
        },
    },
};
</script>
