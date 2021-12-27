module.exports = {
  url: '/admin',
  commands: [],
  elements: {
    newBlogButton: '[href="/admin/blogs/create"]',
    dialogPopup: '.v-dialog',
    confirmButton: '[data-test-id="confirm-button"]',
  },
  sections: {
    navigationDrawer: {
      selector: '.v-navigation-drawer',
      elements: {
        profile: '[href="/admin/profile"]',
        dashboard: '[href="/admin/dashboard"]',
        blogs: '[href="/admin/blogs"]',
        users: '[href="/admin/users"]',
      },
    },
    createBlogPage: {
      selector: '[data-test-id="create-blog-page"]',
      elements: {
        blogTitleInput: '[data-test-id="blog-title-input"]',
        blogCoverInput: '[data-test-id="blog-cover-input"]',
        blogTagInput: '[data-test-id="blog-tag-input"]',
        blogContentInput: '[data-test-id="blog-content-input"]',
        createBlogSubmit: '[data-test-id="create-blog-submit"]',
      },
    },
  },
};
