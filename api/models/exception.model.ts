enum ResponseCodes {
    ok = 200,
    created = 201,
    no_content = 204,
    bad_request = 400,
    unauthorized = 401,
    not_found = 404
}

export class Exception extends Error {

    protected readonly code: (typeof ResponseCodes)[keyof typeof ResponseCodes];

    constructor(type: keyof typeof ResponseCodes, message: string) {

        super(message);

        this.name = this.nameConstructor(type) + this.constructor.name;

        this.code = ResponseCodes[type];
    }

    protected nameConstructor (name: string): string {

        return name.split('_').map((str) => str.substring(0, 1).toUpperCase() + str.substring(1)).join('');
    }

    getMessage () {

        return this.message;
    }

    getCode () {

        return this.code;
    }
}