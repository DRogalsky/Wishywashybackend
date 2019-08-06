const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

var keys = {};
keys.secretOrKey = "superdupersecrethaha";

// Load Data Validation
const validateRegisterWorkerData = require("../validation/registerWorker");
const validateLoginWorkerData = require("../validation/loginWorker");

// Load User model
const db = require("../models");

// @route   POST api/auth/worker/register
// @desc    Register worker
// @access  Public
router.post("/worker/register", (req, res) => {
    const {
        errors,
        isValid
    } = validateRegisterWorkerData(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newWorker = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password
    };

    db.Worker
        .findOne({
            where: {
                email: req.body.email
            }
        })
        .then(worker => {
            if (worker) {
                errors.email = "Email already exists.";
                return res.status(400).json(errors);
            }

            bcrypt.genSalt(10, (err, salt) => {
                if (err) {
                    console.log(err);
                }

                bcrypt.hash(newWorker.password, salt, (err, hash) => {
                    if (err) {
                        throw err;
                    }

                    newWorker.password = hash;


                    db.Worker.create(newWorker).then(function (dbWorker) {
                        res.json(dbWorker);
                    });
                })
            })
        })
})

// @route   GET api/auth/worker/login
// @desc    Login Worker / Returning JWT Token
// @access  Public
router.post("/worker/login", (req, res) => {
    const {
        errors,
        isValid
    } = validateLoginWorkerData(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    // Find workder by email
    db.Worker.findOne({
        where: {
            email: email
        }
    })
        .then(worker => {
            // Check for user
            if (!worker) {
                errors.email = "Worker not found";
                return res.status(404).json(errors);
            }

            // Check Password
            bcrypt.compare(password, worker.password)
                .then(isMatch => {
                    if (isMatch) {
                        // Worker Matched
                        const payload = {
                            id: worker.id,
                            firstName: worker.firstName,
                            lastName: worker.lastName,
                            email: worker.email,
                            isManager: true,
                            isWorker: false
                        }; // Create JWT Payload

                        // Sign Token
                        jwt.sign(
                            payload,
                            keys.secretOrKey, {
                                expiresIn: 3600
                            },
                            (err, token) => {
                                if (err) {
                                    console.log(err);
                                }

                                res.json({
                                    success: true,
                                    token: "Bearer " + token
                                });
                            }
                        )
                    }
                    else {
                        errors.password = "Password incorrect";
                        return res.status(400).json(errors);
                    }
                })
        })
})

module.exports = router
