interface IExceptionBase {
    status: 'error';
    error: {
        name: string;
        code: number;
        message: string;
    };
}

export class EntityError implements IExceptionBase {

    status: 'error' = 'error';
    error: IExceptionBase['error'];

    constructor(message: string, code?: number) {

        this.error = {
            name: this.constructor.name,
            code: code || 500,
            message
        }
    }
}

export class EntityBadRequest implements IExceptionBase {

    status: 'error' = 'error';
    error: IExceptionBase['error'];

    constructor(message: string, code?: number) {

        this.error = {
            name: this.constructor.name,
            code: code || 400,
            message
        }
    }
}

export class EntityNotFound implements IExceptionBase {

    status: 'error' = 'error';
    error: IExceptionBase['error'];

    constructor(message: string, code?: number) {

        this.error = {
            name: this.constructor.name,
            code: code || 404,
            message
        }
    }
}