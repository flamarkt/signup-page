import Mithril from 'mithril';

declare global {
    const m: Mithril.Static;

    interface FlarumExports {
        core: {
            compat: any,
        },
        extensions: {
            [id: string]: any
        }
    }

    const flarum: FlarumExports
}
