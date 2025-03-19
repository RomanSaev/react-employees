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
        res.status(500).json(error/*{ message: "Что-то пошло не так" }*/)
    }
}

module.exports = {
    getAll,
    add,
}