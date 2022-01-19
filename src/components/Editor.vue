<template>
  <div>
    <editor apiKey="ze4be1i4t0rjy9pd5jmsfo4lhhmk39ok66qpxhs4cqhsg7b0" :init="init" v-model="blogContent" />
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue';

export default {
  props: {
    content: {
      type: String,
    },
  },
  data() {
    return {
      blogContent: '',
      init: {
        height: 500,
        menubar: false,
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
  watch: {
    content(newVal) {
      this.blogContent = newVal;
    },
  },
};
</script>
