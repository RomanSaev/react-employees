const { prisma } = require('../prisma/prisma-client')

/**
 * @route GET /api/employees/
 * @desc Получить всех сотрудников
 * @access Private
 */
const getAll = async (req, res, next) => {
    try {
        const employees = await prisma.employee.findMany();
        
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: "Не удалось получить всех сотрудников" })
    }
}

/**
 * @route POST /api/employees/add
 * @desc Создать нового сотрудника
 * @access Private
 */
const add = async (req, res, next) => {
    try {
        const data = req.body;

        if (!data.firstName || !data.lastName || !data.address || !data.age) {
            return res.status(400).json({ message: 'Все поля обязательны' })
        }

        // const user = await prisma.user.update({
        //     where: {
        //         id: req.user.id
        //     },
        //     data: {
        //         createdEmployee: {
        //             create: data
        //         }
        //     }
        // })

        const employee = await prisma.employee.create({
            data: {
                ...data,
                userId: req.user.id
            }
        })

        return res.status(201).json(employee);

    } catch(error) {
        res.status(500).json({ message: "Что-то пошло не так" })
    }
}

/**
 * @route POST /api/employees/remove/:id
 * @desc Удалить сотрудника
 * @access Private
 */
const remove = async (req, res, next) => {
    try {
        //const { id } = req.body;
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Некорректный id сотрудника' })
        }

        await prisma.employee.delete({
            where: {
                id
            }
        })

        res.status(204).json('ok')

    } catch(error) {
        res.status(500).json({ message: "Что-то пошло не так" })
    }
}

/**
 * @route PUT /api/employees/edit/:id
 * @desc Обновление данных сотрудника
 * @access Private
 */
const edit = async (req, res, next) => {
    try {
        const data = req.body;
        const { id } = req.params

        if (!id) {
            return res.status(400).json({ message: 'Некорректный id сотрудника' })
        }

        if (Object.keys(data).length === 0) {
            return res.status(400).json({ message: 'Отсутствуют параметры сотрудника для изменения' })
        }
        
        await prisma.employee.update({
            where: {
                id: id
            },
            data
        })

        res.status(204).json('ok')

    } catch(error) {
        res.status(500).json({ message: "Что-то пошло не так" })
    }
}

/**
 * @route GET /api/employees/:id
 * @desc Получение данных сотрудника
 * @access Private
 */
const getSingle = async (req, res, next) => {
    const { id } = req.params;

    try {
        const employee = await prisma.employee.findUnique({
            where: {
                id
            }
        })

        res.status(200).json(employee);
    } catch(error) {
        res.status(500).json({ message: "Что-то пошло не так" })
    }
}

module.exports = {
    getAll,
    add,
    remove,
    edit,
    getSingle
}