import { LoginPage, HomePage, NewArticlePage, ArticlePage, EditArticlePage } from '../page-models';

import { ClientFunction } from 'testcafe';

const debug = ClientFunction(() => {
    debugger;
});

const loginPage       = new LoginPage();
const homePage        = new HomePage();
const newArticlePage  = new NewArticlePage();
const articlePage     = new ArticlePage();
const editArticlePage = new EditArticlePage();


fixture `Create Article`
    .page('http://localhost:5000/#/login')
    .beforeEach(async t => {
        await loginPage.performLogin(t);
    });


test('successful submission', async t => {
    await t.click(homePage.navbar.newArticleLink)
        .typeText(newArticlePage.title, 'title')
        .typeText(newArticlePage.editor, 'content')
        .click(newArticlePage.createArticleBtn)
        .expect(newArticlePage.articlePublishedModal.message.textContent).eql('Yayyyy!')
        .expect(newArticlePage.articlePublishedModal.details.textContent).eql('Your article has been published');
});

test('denied on validation failure TITLE AND BODY', async t => {
    await t.click(homePage.navbar.newArticleLink)
        .click(newArticlePage.createArticleBtn)
        .expect(newArticlePage.alert.textContent).contains('Article Body, Title and Topic Information is required.');
});

test('denied on validation failure TITLE', async t => {
    await t.click(homePage.navbar.newArticleLink)
        .click(newArticlePage.createArticleBtn)
        .typeText(newArticlePage.editor, 'content')
        .expect(newArticlePage.alert.textContent).contains('Article Body, Title and Topic Information is required.');
});

test('denied on validation failure BODY', async t => {
    await t.click(homePage.navbar.newArticleLink)
        .click(newArticlePage.createArticleBtn)
        .typeText(newArticlePage.title, 'title')
        .expect(newArticlePage.alert.textContent).contains('Article Body, Title and Topic Information is required.');
});

test('present on show page', async t => {
    await t.click(homePage.articleTitle)
        .expect(articlePage.articleTitle.textContent).contains('title');
});


fixture `Edit Article`
        .page('http://localhost:5000/#/home')
        .beforeEach(async t => {
            await loginPage.performLogin(t);
        });

test('present on show page', async t => {
    await t.click(homePage.articleTitle)
        .expect(articlePage.articleTitle.textContent).contains('title');
});

test('successful edit', async t => {
    await t
        .click(homePage.articleTitle)
        .click(articlePage.editButton)
        .typeText(editArticlePage.what_changed, 'hello')
        .typeText(editArticlePage.editor, 'hello')
        .click(editArticlePage.updateButton)
        .expect(editArticlePage.alert.textContent).contains('Article has been successfully saved');
});

test('unsuccessful edit on validation failure WHAT CHANGED', async t => {
    await t
        .click(homePage.articleTitle)
        .click(articlePage.editButton)
        .click(editArticlePage.updateButton)
        .expect(editArticlePage.alert.textContent).contains('Article Body, Title, Topic and Change Info is required');
});


fixture `Delete Article`
        .page('http://localhost:5000/#/home')
        .beforeEach(async t => {
            await loginPage.performLogin(t);
        });

test('successful delete', async t => {
    await t
        .click(homePage.articleTitle)
        .click(articlePage.deleteButton)
        .expect(editArticlePage.alert.textContent).contains('Article has been deleted');
});
