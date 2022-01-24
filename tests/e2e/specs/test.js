module.exports = {
  beforeEach: (browser) => browser.init(),
  'E2E test: Login and create blog': (browser) => {
    const homepage = browser.page.homepage();
    const { header } = homepage.section;

    header.click('@loginBtn');
    browser.expect.url().to.endWith('/login');

    const login = browser.page.login();
    const { loginForm } = login.section;

    loginForm.expect.element('@userNameInput').to.be.visible;
    loginForm.updateValue('@userNameInput', 'test');
    loginForm.updateValue('@passwordInput', 'test');
    loginForm.click('@loginSubmit');

    browser.expect.url().to.endWith('/');
    header.expect.element('@loginBtn').to.not.be.present;
    header.expect.element('@userAvatar').to.be.visible;
    homepage.expect.element('@userMenu').to.not.be.present;

    header.click('@userAvatar');
    homepage.expect.element('@userMenu').to.be.visible;

    homepage.click('@userBlogs');
    browser.expect.url().to.endWith('/admin/profile');

    const admin = browser.page.admin();
    const { navigationDrawer, createBlogPage } = admin.section;
    navigationDrawer.expect.element('@blogs').to.be.visible;

    navigationDrawer.click('@blogs');
    browser.expect.url().to.endWith('/admin/blogs');
    admin.expect.element('@newBlogButton').to.be.visible;

    admin.click('@newBlogButton');
    browser.expect.url().to.endWith('/admin/blogs/create');

    createBlogPage.updateValue('@blogTitleInput', `Test blog ${new Date().toLocaleString()}`);

    createBlogPage.updateValue(
      '@blogContentInput',
      'This is a test blog!\nThis blog is created by automatic testing program'
    );
    createBlogPage.click('@createBlogSubmit');
    admin.expect.element('@dialogPopup').to.be.visible;
    admin.expect.element('@dialogPopup').text.to.contain('提交成功，进入审核状态');
    admin.click('@confirmButton');
    browser.expect.url().to.endWith('/admin/blogs');

    browser.end();
  },
};
