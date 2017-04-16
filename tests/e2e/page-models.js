import { Selector } from 'testcafe';
import testUser from './test-user.json';

class Navbar {
    constructor (containerSelector) {
        this.container = Selector(containerSelector);

        this.adminLink      = this.container.find('a').withText('Admin');
        this.newArticleLink = this.container.find('a').withText('New Article');
        this.logoutLink     = this.container.find('a').withText('Logout');
    }
}

class Modal {
    constructor (selector) {
        this.container = Selector(selector);

        this.header = this.container.find('.modal-header');
        this.body   = this.container.find('.modal-body');
    }
}

class ArticlePublishedModal extends Modal {
    constructor () {
        super('#myModal');

        this.message = this.body.find('h1');
        this.details = this.body.find('h3');
        this.okBtn   = this.body.find('button').withText("That's great");
    }
}

class SetupPage {
    constructor () {
        this.name     = Selector('#inputUserName');
        this.about    = Selector('#inputUserAbout');
        this.email    = Selector('#inputUserEmail');
        this.password = Selector('#inputUserPassword');
        this.setupBtn = Selector('button').withText('Setup My Account');
    }

    async performSetup (t) {
        await t
            .typeText(this.name, testUser.name)
            .typeText(this.about, testUser.about)
            .typeText(this.email, testUser.email)
            .typeText(this.password, testUser.password)
            .click(this.setupBtn);
    }
}

export class LoginPage {
    constructor () {
        this.email    = Selector('#inputEmail');
        this.password = Selector('#inputPassword');
        this.signIn   = Selector('button').withText('Sign in');

        this.userNotFoundAlert = Selector('.s-alert-error', { visibilityCheck: true }).withText('User not found');
    }

    async _tryToLogin (t) {
        await t
            .typeText(this.email, testUser.email)
            .typeText(this.password, testUser.password)
            .click(this.signIn);
    }

    async performLogin (t) {
        // Try to login. If failed, perform setup and login again
        await this._tryToLogin(t);

        if(await this.userNotFoundAlert.exists) {
            const setupPage = new SetupPage();
            const url       = await t.eval(() => window.location.toString());

            await t.navigateTo('./#/setup');
            await setupPage.performSetup(t);
            await t.navigateTo(url);
            await this._tryToLogin(t);
        }
    }
}

class BaseLayoutPage {
    constructor () {
        this.appContainer = Selector('#app');
        this.navbar       = new Navbar('nav.navbar');
        this.alert        = Selector('div.s-alert-wrapper');
    }
}

export class HomePage extends BaseLayoutPage {
    constructor () {
        super();
        this.articleTitle = Selector('.article-item-title a');
    }
}

export class ArticlePage extends BaseLayoutPage {
    constructor () {
        super();
        this.articleTitle = Selector('.single-article-title');
        this.editButton   = this.appContainer.find('a').withText('Edit');
        this.deleteButton = this.appContainer.find('button').withText('Delete');
    }
}


export class NewArticlePage extends BaseLayoutPage {
    constructor () {
        super();

        this.title                 = Selector('.new-article .input-title');
        this.editor                = Selector('trix-editor');
        this.createArticleBtn      = Selector('button').withText('Create Article');
        this.articlePublishedModal = new ArticlePublishedModal();
    }
}

export class EditArticlePage extends BaseLayoutPage {
    constructor () {
        super();
        this.title                 = Selector('.new-article .input-title');
        this.editor                = Selector('trix-editor');
        this.what_changed          = Selector('.what_changed');
        this.updateButton          = Selector('.btn-default');
    }
}
