import {Vnode, VnodeDOM} from 'mithril';
import app from 'flarum/forum/app';
import Component from 'flarum/common/Component';
import SignUpModal from 'flarum/forum/components/SignUpModal';
import LogInButtons from 'flarum/forum/components/LogInButtons';

export default class SignUpForm extends Component {
    modalState: SignUpModal = new SignUpModal;

    oninit(vnode: Vnode) {
        super.oninit(vnode);

        const params = m.route.param();

        // We copy the parent vnode so we have something valid to pass to the modal oninit
        // The other properties of the vnode probably don't matter because no other lifecycle method is ever called with it
        const modalVnode: Vnode = {
            ...vnode,
            attrs: params.social && app.flamarktSignUpSocialPayload ? app.flamarktSignUpSocialPayload : {},
        };

        this.modalState.oninit(modalVnode);

        if (app.session.user) {
            this.redirectAfterLogin();
        }
    }

    oncreate(vnode: VnodeDOM) {
        super.oncreate(vnode);

        if (this.modalState.attrs.username && !this.modalState.attrs.email) {
            this.$('[name=email]').select();
        } else {
            this.$('[name=username]').select();
        }
    }

    view() {
        return m('form.SignUpForm', {
            method: 'POST', // This prevents the password from ending up in the URL in case onsubmit doesn't work
            onsubmit: this.onsubmit.bind(this),
        }, [
            m('.SignUpForm-social', this.modalState.attrs.token ? m('p', app.translator.trans('flamarkt-signup-page.forum.complete-social-login')) : LogInButtons.component()),
            m('.SignUpForm-fields', this.modalState.fields().toArray()),
            m('.SignUpForm-footer', this.modalState.footer()),
        ]);
    }

    onsubmit(event: Event) {
        event.preventDefault();

        this.modalState.loading = true;

        const body = this.modalState.submitData();

        app.request({
            url: app.forum.attribute('baseUrl') + '/register',
            method: 'POST',
            body,
        }).then(() => {
            this.redirectAfterLogin();
        }, this.modalState.loaded.bind(this.modalState));
    }

    redirectAfterLogin() {
        const params = m.route.param();

        if (params.redirect && !app.forum.attribute('flamarktSignUpForceRedirect')) {
            const url = new URL(params.redirect, window.location.href);

            // Only redirect internal URLs for now
            // If an external URL is passed only the path will be kept and used as internal path
            window.location.href = url.pathname;
            return;
        }

        const redirect = app.forum.attribute('flamarktSignUpRedirect');

        if (redirect) {
            window.location.href = redirect;
            return;
        }

        window.location.href = '/';
    }
}
