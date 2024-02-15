const express = require('express');
const accountRouter = express.Router();
const zod = require ('zod');
const { Account, User } = require ('../database/db');
const { authMiddleware } = require('../middleware/auth');

const createAccountSchema = zod.object({
    userId: zod.string(),
    balance: zod.string()
});

accountRouter.post('/create', authMiddleware, async (req, res) => {
    try {
        const { success } = createAccountSchema.safeParse(req.body);
        if(success) {
            const account = await Account.create(req.body)
            if(account) {
                res.status(200).json({ message: 'Account created successfully'});
            }
            else {
                res.status(400).json({ message: 'Failed to create account'});
            }
        }
        else {
            res.status(400).json({ message: 'Invalid request' });
        }
    }
    catch(error) {
        console.log("create account failure -> ", error);
        res.status(500).json({ message: 'Something went wrong while creating the account' });
    }
})

//pay route
const paySchema = zod.object({
    userId: zod.string(),
    to: zod.string(),
    amount: zod.string()
})

accountRouter.post('/pay', authMiddleware, async(req, res) => {
    try {
        const { success } = paySchema.safeParse(req.body);
        if(success) {
            const payerAccount = await Account.findOne({
                userId: req.body.userId
            });
            const payeeAccount = await Account.findOne({
                userId: req.body.to
            })
            if(!payerAccount) {
                res.status(400).json({ message: 'User not found, Transaction Failed'});
            }
            else if(!payeeAccount) {
                res.status(400).json({ message: 'Payee not found, transaction failed' });
            }
            else {
                const payeeBalance = parseFloat(payeeAccount.balance);
                const payerBalance = parseFloat(payerAccount.balance);
                const amountToTransfer = parseFloat(req.body.amount);

                if(amountToTransfer > payerBalance) {
                    res.status(200).json({ message: 'Transaction Failed. Insufficient Balance' });
                }
                else {
                    await Account.updateOne(
                        { userId: payerAccount.userId },
                        {
                            $set: { balance: "" + (payerAccount.balance - amountToTransfer) }
                        }
                    )

                    await Account.updateOne(
                        { userId: payeeAccount.userId },
                        {   $set: { balance: "" + (payeeBalance + amountToTransfer) }    
                        }
                    )
                    res.status(200).json( {message: 'Transfer successfull.'});
                }
            }
        }
        else {
            res.status(400).json({ message: 'Invalid input. Transaction Failed' });
        }
    }
    catch(error) {
        res.status(500).json({ message: 'API Failure' });
    }
})


//check balance route
const checkBalanceSchema = zod.object({
    userId: zod.string(),
});

accountRouter.get('/checkbalance', authMiddleware, async (req, res) => {
    try {
        const { success } = checkBalanceSchema.safeParse(req.body);
        if(success) {
            const account = await Account.findOne({
                userId: req.body.userId
            });

            if(account) {
                return res.status(200).json({ message: 'Success', balance: account.balance });
            }
            else {
                return res.status(400).json({ message: 'Account not found' });
            }
        }
        else {
            return res.status(400).json({ message: 'Invalid input' });
        }
    }
    catch(error) {
        console.log('API Failure -> ', error);
        return res.status(500).json({ message: 'Something went wrong' })
    }
})

module.exports = { accountRouter }