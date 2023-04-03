const authorModel = require("../models/authorModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const dotENV = require('dotenv');
dotENV.config();



// //<-------------This API used for Create Authors---------------->//
exports.createAuthor = async (req, res) => {
    try {

        let author = req.body;
        let { name, userName, password } = req.body;

        if (name.trim().length == 0 || userName.trim().length == 0 || password.trim().length == 0) return res.status(400).send({ status: false, msg: "please provide SignUp details" });

        let validateEmail = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
        let validatepassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

        if (!name) return res.status(400).send({ msg: " Name is required " });

        if (!userName) return res.status(400).send({ msg: " User-Name is required " });
        if (!validateEmail.test(userName) == true) return res.status(400).send({ status: false, msg: "email is not valid", });

        if (!password) return res.status(400).send({ msg: " password is required " });
        if (!validatepassword.test(password) == true) return res.status(400).send({ status: false, msg: "Password is not valid" })

        const checkEmail = await authorModel.findOne({ userName: userName })
        if (checkEmail) return res.status(400).send({ status: false, msg: "Already Register User", });

        author.password = await bcrypt.hash(author.password, 10)

        let authorCreated = await authorModel.create(author)

        return res.status(201).send({ data: authorCreated })

    } catch (error) {
        return res.status(500).send({ msg: error.message })
    }
}


//<--------------This API used for Log in Author------------------>// 
exports.login = async (req, res) => {
    try {

        let author = req.body;

        let { userName, password } = author;

        if (userName.trim().length == 0 || password.trim().length == 0) return res.status(400).send({ status: false, msg: "please provide login details" });

        if (!userName) return res.status(400).send({ msg: " email is required " })
        if (!password) return res.status(400).send({ msg: "  password is required " })

        let loggedAuthor = await authorModel.findOne({ userName: userName })
        if (!loggedAuthor) return res.status(400).send({ msg: "Email is Incorrect!" })


        const checkpasword = await bcrypt.compare(password.trim(), loggedAuthor.password);
        if (!checkpasword) return res.status(400).send({ msg: "password is Incorrect!" });

        let token = jwt.sign(
            {
                authorId: loggedAuthor._id.toString(),
                batch: "lithium",
                project: "Blog-Project"
            },
            process.env.AcessSecretKey, { expiresIn: '12h' }
        )

        const UserId = loggedAuthor['_id'];

        return res.status(201).send({ msg: "User logged in successfully!", loggedAuthor, token, UserId })
    } catch (error) {
        return res.status(500).send({ msg: error.message })
    }
}




