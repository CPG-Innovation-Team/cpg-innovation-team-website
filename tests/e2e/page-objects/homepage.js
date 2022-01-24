module.exports = {
  url: '/',
  commands: [],
  elements: {
    appContainer: '#app',
    languageMenu: '[data-test-id="language-menu"]',
    userMenu: '[data-test-id="user-menu"]',
    userBlogs: '[data-test-id="user-blogs"]',
  },
  sections: {
    header: {
      selector: '.header-container',
      elements: {
        menuExpandIcon: '[data-test-id="menu-expand-icon"]',
        loginBtn: '[data-test-id="login-btn"]',
        countryFlag: '[data-test-id="country-flag"]',
        userAvatar: '[data-test-id="user-avatar"]',
      },
    },
    main: {
      selector: '.v-main',
    },
    footer: {
      selector: 'footer',
    },
  },
};
