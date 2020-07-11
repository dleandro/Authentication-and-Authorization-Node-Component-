class CustomError extends Error {
    constructor(args) {
        super(args)
        this.title=args.title,
        this.detail= args.detail,
        this.status= args.status
    }
}

module.exports = CustomError
