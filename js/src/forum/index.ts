import {extend, override} from 'flarum/common/extend';
import app from 'flarum/forum/app';
import HeaderSecondary from 'flarum/forum/components/HeaderSecondary';
import ForumApplication from 'flarum/forum/ForumApplication';
import LogInModal from 'flarum/forum/components/LogInModal';
import LinkButton from 'flarum/common/components/LinkButton';
import SignUpPage from './pages/SignUpPage';
import {forum} from './compat';

export {forum};

app.initializers.add('flamarkt-signup-page', () => {
    app.routes['flamarkt.signup'] = {
        path: '/signup',
        component: SignUpPage,
    };

    extend(HeaderSecondary.prototype, 'items', function (items) {
        if (items.has('signUp')) {
            items.setContent('signUp', LinkButton.component({
                className: 'Button Button--link',
                href: app.route('flamarkt.signup'),
            }, app.translator.trans('core.forum.header.sign_up_link')));
        }
    });

    extend(LogInModal.prototype, 'signUp', function () {
        const data: any = {};

        // We don't add the current URL to the redirect parameter if we know it's going to be ignored anyway
        if (!app.forum.attribute('flamarktSignUpForceRedirect')) {
            const params = m.route.param();

            data.redirect = params.redirect || m.route.get();
        }

        m.route.set(app.route('flamarkt.signup'), data);
    });

    override(ForumApplication.prototype, 'authenticationComplete', function (original: any, payload: any) {
        if (payload.loggedIn) {
            original(payload);
        } else {
            // We store the social payload in a global variable
            // We could pass it via the URL but it wouldn't very pretty and the user might think they could edit it
            app.flamarktSignUpSocialPayload = payload;

            m.route.set(app.route('flamarkt.signup'), {
                social: '1',
            }, {
                state: {
                    key: Date.now(), // Force re-creating the signup page if we were already on it
                },
            });
        }
    });
});
