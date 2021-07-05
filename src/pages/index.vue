<script>
import ModuleLocales from '@/extends/ModuleLocales';

export default {
  extends: ModuleLocales,

  created () {
    console.log('CREATED: INDEX');
    console.log(this.$store.state.layout.font);
    // this.$store.dispatch('layout/font', 'font-123' );
    // console.log(this.$store.getters['layout/font']);
  },

  serverPrefetch () {
    console.log('SERVER-PREFETCH: INDEX');
  }
};
</script>
