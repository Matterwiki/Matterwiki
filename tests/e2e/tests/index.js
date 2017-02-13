import { LoginPage, HomePage, NewArticlePage, ArticlePage } from '../page-models';

const loginPage = new LoginPage();

fixture `Create article`
    .page('http://localhost:5000/#/login')
    .beforeEach(async t => {
        await loginPage.performLogin(t);
    });

const homePage       = new HomePage();
const newArticlePage = new NewArticlePage();
const articlePage    = new ArticlePage();

test('basic', async t => {
    await t.click(homePage.navbar.newArticleLink)
        .typeText(newArticlePage.title, 'title')
        .typeText(newArticlePage.editor, 'content')
        .click(newArticlePage.createArticleBtn)
        .expect(newArticlePage.articlePublishedModal.message.textContent).eql('Yayyyy!')
        .expect(newArticlePage.articlePublishedModal.details.textContent).eql('Your article has been published');
});

test('validation', async t => {
    await t.click(homePage.navbar.newArticleLink)
        .click(newArticlePage.createArticleBtn)
        .expect(newArticlePage.alert.textContent).contains('Article Body, Title and Topic Information is required.');
});

test('view article', async t => {
    await t.click(homePage.articleTitle)
        .expect(articlePage.articleTitle.textContent).contains('title');
});
