const validator = {
    validateTypeOf: (value, property, type) => {
        if (typeof value !== type) {
            toastr.error(property + ' is not of type ' + type);
            throw new Error(property + ' is not of type ' + type);
        }
    },
    validateIfEmptyString: (value, property) => {
        if (value === '') {
            toastr.error(property + ' is Empty');
            throw new Error(property + ' is Empty');
        }
    },
    validateIfNumber: (value, property) => {
        if (Number.isNaN(Number(value))) {
            toastr.error(property + ' is not a Number');
            throw new Error(property + ' is not a Number');
        }
    },
    validateIfUndefinedOrNull: (value, property) => {
        if (typeof value === 'undefined' || value === null) {
            toastr.error(property + ' is undefined or null');
            throw new Error(property + ' is undefined or null');
        }
    },
    validateUrl: (url) => {
        if (!url || url.length === 0) {
            throw new Error('Invalid url length');
        }

        const regex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;

        if (!regex.test(url)) {
            toastr.error('Invalid Image Url');
            throw new Error('Invalid url');
        }
    },
    validateEmail: (email) => {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!regex.test(email)) {
            toastr.error('Invalid Email');
            throw new Error('Invalid Email');
        }
    },
    validatePhone: (phone) => {
        const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

        if (!regex.test(phone)) {
            toastr.error('Invalid Phone');
            throw new Error('Invalid Phone');
        }
    },
    validatePassword: (password) => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        if (!regex.test(password)) {
            toastr.error('Password has to be Minimum 8 characters at least 1 Alphabet and 1 Number');
            throw new Error('Password has to be Minimum 8 characters at least 1 Alphabet and 1 Number');
        }
    },
    validateUsername: (username) => {
        const regex = /^[A-Za-z0-9_-]*[A-Za-z0-9][A-Za-z0-9_-]{3,}$/;

        if (!regex.test(username)) {
            toastr.error('Username must be at least 4 symbols and all should be valid');
            throw new Error('Username must be at least 4 symbols and all should be valid');
        }
    }
};

export { validator };