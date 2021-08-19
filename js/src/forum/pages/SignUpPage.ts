import {Vnode} from 'mithril';
import app from 'flarum/forum/app';
import Page from 'flarum/common/components/Page';
import SignUpLayout from '../layouts/SignUpLayout';
import SignUpForm from '../components/SignUpForm';

export default class SignUpPage extends Page {
    oninit(vnode: Vnode) {
        super.oninit(vnode);

        app.setTitle(app.translator.trans('core.forum.sign_up.title'));
        app.setTitleCount(0);
    }

    view() {
        return flarum.extensions['flamarkt-core'] ? SignUpLayout.component() : m('.container.StandaloneSignUpPage', SignUpForm.component());
    }
}
