declare module "index" {
    export = ReplacerRenderer;
    class ReplacerRenderer {
        static get configKey(): string;
        static defaultConfig(): object;
        static validateConfig(config: {
            configKey: object;
        }, _context: object): void;
        static register(context: {
            hooks: {
                on: Function;
            };
            config: {
                events: object;
            };
        }): void;
        static renderContent(content: string, context: {
            config: object;
        }): string;
        static renderCollection(collection: object[], context: {
            config: object;
        }): object[];
        static render(content: string, config: object): string;
    }
}
