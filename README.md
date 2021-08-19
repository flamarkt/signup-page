# Sign Up Page

Moves Sign Up to a dedicated page instead of the default modal.

This extension can be used with or without Flamarkt installed.
With Flamarkt enabled, Flamarkt's layout system is used for the page design.
If Flamarkt is disabled, the login form is inserted into a blank page with no special styling.

Most extensions that add new fields to the SignUp modal should work with this extension as well.

This extension also handles social registration with the custom page.

A `?redirect=/path` parameter can be added to the Sign Up page. It must be an internal URL.
If the "force redirect" option is disabled in the settings, the current page will automatically be set as `redirect` value before opening the Sign Up page.

A default redirect can be defined in the settings.
The default redirect can be an external URL.
