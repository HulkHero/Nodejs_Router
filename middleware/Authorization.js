
const Authorization = (req, res, next) => {
    const isAuthorized = req.body.isAuthorized;
    if (isAuthorized) {
        console.log("Authorized");
        next()
    }
    else {
        console.log("UnAuthorized");
        res.status(401).send({ message: "UnAuthorized" })
    }
}

exports.Authorization = Authorization;