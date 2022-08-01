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
import util from '../util';

export default {
  components: {
    Editor,
  },
  props: {
    prevContent: {
      type: String,
    },
    toolbar: {
      type: Boolean,
      default: true,
    },
    inCreatePage: {
      type: Boolean,
      default: false,
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
          editor.on('NodeChange Change KeyUp SetContent', () => {
            this.$emit('input', editor.getContent());
            if (this.inCreatePage === true) {
              this.editingContent = editor.getContent();
              clearTimeout(this.timer);
              this.timer = setTimeout(this.saveContent, 1000);
            }
          });
        },
        images_upload_handler: (blobInfo, success, failure) => {
          if (this.checkValidFormat(blobInfo.blob(), failure) && this.checkValidSize(blobInfo.blob(), failure)) {
            const formData = new FormData();
            formData.append('file', blobInfo.blob(), blobInfo.filename());
            util
              .post('https://api.cpgroup.top:8080/admin/object/upload', formData, this.$router)
              .then((res) => {
                success(res.data.data.url);
              })
              .catch(() => {
                if (this.$t('locale') === 'zh-CN') {
                  failure('上传失败');
                } else {
                  failure('Failed to upload');
                }
              });
          }
        },
      },
    };
  },
  created() {
    if (this.toolbar === false) {
      this.init.menubar = false;
      this.init.toolbar = false;
      this.disabled = true;
    }
    // restore blog content from local storage
    if (this.prevContent) {
      this.blogContent = this.prevContent;
    }
  },
  methods: {
    saveContent() {
      localStorage.content = this.editingContent;
    },
    checkValidFormat(img, failure) {
      const formatIsValid = img.type === 'image/jpeg' || img.type === 'image/png' || img.type === 'image/gif';
      if (!formatIsValid) {
        if (this.$t('locale') === 'zh-CN') {
          failure('仅支持jpeg/jpg/png/gif格式');
        } else {
          failure('Only jpeg/jpg/png/gif formats are supported');
        }
        return false;
      }
      return true;
    },
    checkValidSize(img, failure) {
      if (img.size / 1024 / 1024 > 5) {
        if (this.$t('locale') === 'zh-CN') {
          failure('上传失败，图片大小请控制在 5MB 以内');
        } else {
          failure('Failed to upload image, the maximum size supported is 5MB');
        }
        return false;
      }
      return true;
    },
  },
  watch: {
    // watch blog content in async/await (updateBlog and ApproveBlog)
    prevContent(newVal) {
      this.blogContent = newVal;
    },
  },
};
</script>
