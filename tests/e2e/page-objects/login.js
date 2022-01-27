module.exports = {
  url: '/login',
  elements: {},
  sections: {
    loginForm: {
      selector: '[data-test-id="login-form"]',
      elements: {
        userNameInput: '[type="username"]',
        passwordInput: '[type="password"]',
        loginSubmit: 'button',
      },
    },
  },
};
