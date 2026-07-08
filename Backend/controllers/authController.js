const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log("Username:",username);
        console.log("Password:", password);

    

        const result = await db.query(
            "SELECT * FROM users WHERE username = $1",
            [username]
        );
        console.log("DB Result:",result.rows);

        if (result.rows.length === 0) {
            return res.status(401).json({
                message: "Invalid username or password"
            });
        }

        const user = result.rows[0];

        console.log("Stored Hash:", user.password);

        const validPassword = await bcrypt.compare(password, user.password);

        console.log("Password Match:", validPassword);

        if (!validPassword) {
            return res.status(401).json({
                message: "Invalid username or password"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                username: user.username
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        res.json({
            message: "Login Successful",
            token
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Server Error"
        });
    }
};

module.exports = { login };