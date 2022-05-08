<template>
  <div>
    <editor
      apiKey="ze4be1i4t0rjy9pd5jmsfo4lhhmk39ok66qpxhs4cqhsg7b0"
      :init="init"
      v-model="blogContent"
      :disabled="disabled"
    />
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue';

export default {
  props: {
    content: {
      type: String,
    },
    editorBool: {
      type: Boolean,
    },
    inCreate: {
      type: Boolean,
    },
  },
  data() {
    return {
      blogContent: '',
      disabled: false,
      hasChange: false,
      timer: null,
      editingContent: '',
      init: {
        height: 500,
        language: this.$t('locale') === 'zh-CN' ? 'zh_CN' : 'en',
        menubar: true,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen image',
          'insertdatetime media table paste code help wordcount',
        ],
        toolbar:
          'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image | removeformat | help',
        init_instance_callback: (editor) => {
          if (this.value) {
            editor.setContent(this.value);
          }
          this.hasInit = true;
          editor.on('NodeChange Change KeyUp SetContent', () => {
            this.hasChange = true;
            this.$emit('input', editor.getContent());
            if (this.inCreate === true) {
              this.editingContent = editor.getContent();
              clearTimeout(this.timer);
              this.timer = setTimeout(this.saveContent, 2000);
            }
          });
        },
      },
    };
  },
  components: {
    Editor,
  },
  created() {
    if (this.editorBool === false) {
      this.init.menubar = false;
      this.init.toolbar = false;
      this.disabled = true;
    }
    if (this.content) {
      this.blogContent = this.content;
    }
  },
  methods: {
    saveContent() {
      localStorage.content = this.editingContent;
    },
  },
  watch: {
    content(newVal) {
      this.blogContent = newVal;
    },
  },
};
</script>
