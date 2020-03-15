module.exports=function(router){
    const auth=require("./auth")
    const data=require("./data")
    router.get('/',homepage)
    router.get('/comments',comments)
    router.get('/files',files)
    router.get('/books',books)

    function homepage(req,res){
        res.write('<a href="/comments">Comments</a> \n')
        res.write('<a href="/files">Files</a> \n')
        res.write('<a href="/books">Books</a>')
        res.end()
    }

    function comments(req,res){
        if(auth.hasPermissions(req)){
            res.end("User has permisions")
        }
        else{
            res.end("User doesn't have permissions")
        }
    }

    function files(req,res){
        if(auth.hasPermissions(req)){
            res.end("User has permisions")
        }
        else{
            res.end("User doesn't have permissions")
        }
    }

    function books(req,res){
        if(auth.hasPermissions(req)){
            res.end(data.getBooks())
        }
        else{
            res.end("User doesn't have permissions")
        }
    }
}