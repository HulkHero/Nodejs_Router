const express = require('express')
const router = express.Router()
const fs = require('fs');
const { Authorization } = require('../middleware/Authorization');
const { Authentication } = require('../middleware/Authentication');
const { Validation } = require('../middleware/Validation');


router.get('/', (req, res) => {
    fs.readFile('userData.txt', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).json({ error: 'Error reading data.' });
        } else {
            data = data.toString();
            const entries = data.trim().split('\n');
            const fileData = entries.map((entry) => JSON.parse(entry));
            res.status(200).json(fileData);
        }
    });
})

router.post('/create', Validation, Authentication, Authorization, (req, res) => {

    try {
        const user = {
            ...req.body,
        }
        fs.appendFile('userData.txt', JSON.stringify(user) + '\n', function (err) {
            if (err) {
                res.status(500).json({ error: 'Error writing data.' });
                return;
            };
        });
        res.status(201).send(user);
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ err })
    }
})
router.put('/update/:name', (req, res) => {
    try {
        const name = req.params.name;
        const { age, email, password, gender, university, number, cnic, address } = req.body;
        if (!name) {
            throw 'Please enter name to update user'
        }
        fs.readFile('userdata.txt', (err, data) => {
            if (err) {
                res.status(500).json({ error: 'Error reading data.' });
                return;
            } else {
                data = data.toString();
                const entries = data.trim().split('\n');
                const fileJsonData = entries.map((entry) => JSON.parse(entry));
                const findIndex = fileJsonData.findIndex((data) => data.name == name);
                if (findIndex === -1) {
                    res.status(500).send({ message: 'User not found.' })
                    return;
                }
                const updatedData = fileJsonData.map((user) => {
                    if (user.name == name) {
                        return {
                            ...user,
                            age: age || user.age,
                            email: email || user.email,
                            password: password || user.password,
                            gender: gender || user.gender,
                            university: university || user.university,
                            number: number || user.number,
                            cnic: cnic || user.cnic,
                            address: address || user.address,
                        }
                    }
                    return user;
                })
                const updatedStringData = updatedData.map((entry) => JSON.stringify(entry) + '\n').join('');
                fs.writeFile('userdata.txt', updatedStringData, (err) => {
                    if (err) {
                        res.status(500).json({ message: 'Error updating data.' });
                        return;
                    } else {
                        res.status(200).json({ message: 'User updated.' });
                    }
                });
            }
        });
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ err })
    }
})

module.exports = {
    userRouter: router
}