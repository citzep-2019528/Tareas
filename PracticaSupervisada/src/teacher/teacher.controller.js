import Course from '../course/course.model.js'
import Student from '../student/student.model.js'

export function decodeToken(token) {
    let decodedToken;
    try {
        decodedToken = JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
        return null;
    }
}

export const createCourse = async (req, res) => {
    try { 
        const newCourse = await Course.create({
            name: req.body.name,
            description: req.body.description,
            teacher: id
        })
        res.status(201).send({ message: `Curso ${newCourse} creado exitosamente` })

    } catch (error) {
        console.error(error)
        res.status(500).send({ message: 'Error creando curso' })
    }
}


export const updateCourse = async (req, res) => {
    try {
        const course = await Course.findOne({ _id: req.params.id, teacher: req.user.id })
        if (!course) {
            return res.status(404).send({ message: 'Curso no encontrado o no autorizado' })
        }
        course.name = req.body.name || course.name
        course.description = req.body.description || course.description
        await course.save()
        res.status(200).send({ message: `Curso ${course} actualizado existosamente` })
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: 'Error al actualizar el curso' })
    }
}

export const deleteC = async (req, res) => {
    try {
        const course = await Course.findOne({ _id: req.params.id, teacher: req.user.id })
        if (!course) {
            return res.status(404).send({ message: 'Curso no encontrado o no autorizado' })
        }
        await Student.updateMany({ courses: req.params.id }, { $pull: { courses: req.params.id } })
        await course.remove()
        res.status(200).send({ message: 'Curso eliminado exitosamente' })
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: 'Error al eliminar el curso' })

    }
}


export const getCourses = async (req, res) => {
    try {
        const teacherId = req.user._id
        const courses = await Course.find({ teacher: teacherId })
        if (!courses || courses.length === 0) {
            return res.status(404).json({ message: 'No courses found for this teacher.' })
        }
        res.status(200).send(courses)
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: 'Internal server error.' })
    }
}