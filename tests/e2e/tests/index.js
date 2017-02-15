import { LoginPage, HomePage, NewArticlePage, ArticlePage, EditArticlePage } from '../page-models';

const loginPage       = new LoginPage();
const homePage        = new HomePage();
const newArticlePage  = new NewArticlePage();
const articlePage     = new ArticlePage();
const editArticlePage = new EditArticlePage();

fixture `Create Article`
    .page('http://localhost:5000/#/login');


test('successful submission', async t => {
    await t.click(homePage.navbar.newArticleLink)
        .typeText(newArticlePage.title, 'title')
        .typeText(newArticlePage.editor, 'content')
        .click(newArticlePage.createArticleBtn)
        .expect(newArticlePage.articlePublishedModal.message.textContent).eql('Yayyyy!')
        .expect(newArticlePage.articlePublishedModal.details.textContent).eql('Your article has been published');
});

test('denied on validation failure', async t => {
    await t.click(homePage.navbar.newArticleLink)
        .click(newArticlePage.createArticleBtn)
        .expect(newArticlePage.alert.textContent).contains('Article Body, Title and Topic Information is required.');
});

test('present on show page', async t => {
    await t.click(homePage.articleTitle)
        .expect(articlePage.articleTitle.textContent).contains('title');
});


fixture `Edit Article`
        .page('http://localhost:5000/#/home');

test('present on show page', async t => {
    await loginPage.performLogin(t);
    await t.click(homePage.articleTitle)
        .expect(articlePage.articleTitle.textContent).contains('title');
});

test('edit denied on validation failure', async t => {
    await loginPage.performLogin(t);
    await t.click(homePage.articleTitle)
        .click(articlePage.editButton)
        .typeText(editArticlePage.what_changed, "hello")
        .click(editArticlePage.updateButton)
        .expect(editArticlePage.alert.textContent).contains('Article Body, Title, Topic and Change Info is required.');
});
