
const Authentication = (req, res, next) => {
    const isAuthenticated = req.body.isAuthenticated;
    if (isAuthenticated) {
        console.log("Authenticated");
        next();
    }
    else {
        console.log("inValid User -> Authentication Failed");
        res.status(401).send({ messege: "inValid User -> Authentication Failed" })
    }
}

exports.Authentication = Authentication;