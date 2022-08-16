import app from 'flarum/forum/app';
import AbstractShopLayout from 'flamarkt/core/forum/layouts/AbstractShopLayout';
import SignUpForm from '../components/SignUpForm';

let AbstractLayout = AbstractShopLayout

// If Flamarkt isn't installed, this class won't be used
// We'll just extend a generic class to prevent any error
if (!AbstractLayout) {
    AbstractLayout = class {
    };
}

export default class SignUpLayout extends AbstractLayout {
    className(): string {
        return 'SignUpPage';
    }

    title() {
        return app.translator.trans('core.forum.sign_up.title');
    }

    content() {
        return SignUpForm.component();
    }
}
