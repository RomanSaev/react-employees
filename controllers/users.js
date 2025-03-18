const { prisma } = require('../prisma/prisma-client')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

/**
 * @route POST /api/user/login
 * @desc Логин
 * @access Public
 */
const login = async (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json({message: 'Заполните обязательные поля'})
    }
    const user = await prisma.user.findFirst({
        where: {
            email, //email: email,
        }
    })

    const isPasswordCorrect = user && (await bcrypt.compare(password, user.password))
    const secret = process.env.JWT_SECRET


    if (user && isPasswordCorrect && secret) {
        res.status(200);
        res.json({
            id: user.id,
            email: user.email,
            name: user.name,
            token: jwt.sign({
                id: user.id
            }, secret, { expiresIn: '30d'})
        })
    } else {
        return res.status(400).json({ message: 'Неверно введён логин или пароль'})
    }
}

/**
 * @route /api/user/register
 * @desc Регистрация
 * @access Public
 */
const register = async (req, res) => {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
        return res.status(400).json({ message: "Заполните обязательные поля"})
    }

    const registeredUser = await prisma.user.findFirst({
        where: {
            email
        }
    })
    if (registeredUser) {
        return res.status(400).json({ message: "Пользователь с таким email уже зарегистрирован"});
    }


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
        data: {
            email,
            name,
            password: hashedPassword
        }
    })

    const secret = process.env.JWT_SECRET

    if (user && secret) {
        res.status(201).json({
            id: user.id,
            email: user.email,
            name: user.name,
            token: jwt.sign({ id: user.id}, secret, { expiresIn: '30d' })
        })
    } else {
        return res.status(400).js({ message: "Не удалось создать нового пользователя"})
    }
}
const current = async (req, res) => {
    res.send('current');
}

module.exports = {
    login,
    register,
    current,
}