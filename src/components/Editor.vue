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
  },
  data() {
    return {
      blogContent: '',
      disabled: false,
      init: {
        height: 500,
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
  },
  watch: {
    content(newVal) {
      this.blogContent = newVal;
    },
  },
};
</script>
