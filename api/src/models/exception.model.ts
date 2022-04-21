enum ResponseCodes {
    bad_request = 400,
    unauthorized = 401,
    forbidden = 403,
    not_found = 404,
    method_not_allowed = 405,
    request_timeout = 408,
    conflict = 409,
    unsupported_media_type = 415
}

export default class Exception extends Error {

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