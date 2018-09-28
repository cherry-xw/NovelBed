<!-- 入口的app.vue没有template -->
<script>
import qcloud from 'wafer2-client-sdk'
import config from './config'
export default {
  async created () {
    qcloud.setLoginUrl(config.loginUrl)
  }
}
</script>

<style lang="stylus" scoped>

</style>
