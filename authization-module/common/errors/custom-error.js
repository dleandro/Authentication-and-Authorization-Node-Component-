class CustomError extends Error {
    constructor(title,detail,status) {
        super({title,detail,status})
        this.title = title;
        this.message = detail;
        this.status = status;
    }
}

module.exports = CustomError;
