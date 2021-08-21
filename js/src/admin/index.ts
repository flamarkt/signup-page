app.initializers.add('flamarkt-signup-page', () => {
    app.extensionData.for('flamarkt-signup-page')
        .registerSetting({
            setting: 'flamarkt-signup-page.redirect',
            label: app.translator.trans('flamarkt-signup-page.admin.settings.redirect'),
            placeholder: '/',
        })
        .registerSetting({
            type: 'switch',
            setting: 'flamarkt-signup-page.forceRedirect',
            label: app.translator.trans('flamarkt-signup-page.admin.settings.forceRedirect'),
        });
});
