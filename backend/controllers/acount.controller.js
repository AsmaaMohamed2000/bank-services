const accountService = require('../services/acount.service')

const accountController = {

    createAccount: async (req, res) => {

        try {

            const account =
                await accountService.createAccount(
                    req.body._id
                )

            res.status(201).json({
                success: true,
                message: 'Account created successfully',
                account
            })

        } catch (error) {

            res.status(400).json({
                success: false,
                message: error.message
            })

        }
    },

    getMyAccount: async (req, res) => {

        try {

            const account =
                await accountService.getMyAccount(
                    req.body.id
                )

            res.status(200).json({
                success: true,
                account
            })

        } catch (error) {

            res.status(404).json({
                success: false,
                message: error.message
            })

        }
    }

}

module.exports = accountController