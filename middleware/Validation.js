// Desc: Validation of data
// only name is required field res are optional

const Validation = (req, res, next) => {
    const { name, age, email, gender, number, password, cnic, address, university, isAuthenticated, isAuthorized } = req.body;
    if (
        (typeof (name) == 'string' && name.length > 0 && name.length < 20)
        && (age === undefined || typeof (age) == "number" && age > 10 && age < 100)
        && (email === undefined || typeof (email) == 'string' && email.includes('@') && email.endsWith('.com'))
        && (gender === undefined || typeof (gender) == "string")
        && (number === undefined || typeof (number) == "number" && number.length == 11 && number[0] == 0)
        && (password === undefined || typeof (password) == 'string' && password.length > 0 && password.length < 20)
        && (cnic === undefined || typeof (cnic) == 'string' && cnic.length == 13)
        && (address === undefined || typeof (address) == "string" && address.length > 0 && address.length < 100)
        && (university === undefined || typeof (university) == "string" && university.length > 0 && university.length < 100)
        && (isAuthenticated === undefined || typeof (isAuthenticated) == "boolean")
        && (isAuthorized === undefined || typeof (isAuthorized) == "boolean")
    ) {
        next();
    }
    else {
        res.status(404).json({ message: "invalid data" })
    }
}

module.exports = { Validation }