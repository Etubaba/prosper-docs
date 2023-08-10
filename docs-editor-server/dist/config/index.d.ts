declare const _default: () => {
    app: {
        environment: string;
        port: number;
        host: string;
        name: string;
        url: string;
        global_url_prefix: string;
        client_url: string;
        full_url: string;
    };
    jwt: {
        access: {
            secret: string;
            signInOptions: {
                expiresIn: string;
            };
        };
        refresh: {
            secret: string;
            signInOptions: {
                expiresIn: string;
            };
        };
    };
    mail: {
        pass: string;
        user: string;
    };
    cors: {
        origin: string;
        methods: string;
        headers: string;
    };
};
export default _default;
