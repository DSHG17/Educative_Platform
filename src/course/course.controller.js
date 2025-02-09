import User from '../user/user.model.js';
import Course from './course.model.js';


export const saveCourse = async (req, res) => {
    try {   
        const data = req.body;
        const user = await User.findOne({ email: data.email });
        

        

        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: 'Maestro no encontrado' 
            });
        }

        if(user.role != "TEACHER_ROLE"){
            return res.status(403).json({
                message: 'Solo un profesor puede crear cursos'
            })
        }
        const course = new Course({
            ...data,
            teacher: user._id,
        });
        

        await course.save();

        res.status(200).json({
            success: true,
            course
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al guardar el curso',
            error: error.message
        
            
        })
        
    }
}

export const getCoursesByTeacher = async (req, res) => {
    try {
        const teacher = await User.findOne({ email: req.params.email });

        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: "Profesor no encontrado"
            });
        }

        if (teacher.role !== "TEACHER_ROLE") {
            return res.status(403).json({
                success: false,
                message: "El usuario no es un profesor"
            });
        }

        const courses = await Course.find({ teacher: teacher._id, status: true });

        if (courses.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No se encontraron cursos activos"
            });
        }

        return res.status(200).json({
            success: true,
            courses
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener los cursos",
            error: error.message
        });
    }
};


export const updateCourse = async (req, res) => {
    try {
        const data = req.body
        const teacher = await User.findOne({ email: data.email })

        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: "Profesor no encontrado"
            });
        }

        if (teacher.role !== "TEACHER_ROLE") {
            return res.status(403).json({
                success: false,
                message: "El usuario no es un profesor"
            });
        }

        const course = await Course.findOne({ _id: data.courseId, teacher: teacher._id });

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Curso no encontrado o no pertenece al profesor"
            });
        }

        course.title = data.title || course.title;
        course.description = data.description || course.description

        await course.save();

        return res.status(200).json({
            success: true,
            course
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar el curso",
            error: error.message
        });
    }
}

export const deleteCourse = async (req, res) => {
    try {
        const data = req.body;

        const teacher = await User.findOne({ email: data.email });

        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: "Profesor no encontrado"
            });
        }

        if (teacher.role !== "TEACHER_ROLE") {
            return res.status(403).json({
                success: false,
                message: "El usuario no es un profesor"
            });
        }

        const course = await Course.findOne({ _id: data.courseId, teacher: teacher._id });

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Curso no encontrado o no pertenece al profesor"
            });
        }

        course.status = false;
        await course.save();

        await User.updateMany(
            { coursesAssigned: course._id },
            { $pull: { coursesAssigned: course._id } }
        );

        // Asegurarse de que los cambios se reflejan en la base de datos
        const studentsUpdated = await User.find({ coursesAssigned: { $in: [course._id] } });

        return res.status(200).json({
            success: true,
            message: "Curso desactivado con éxito y eliminado de los estudiantes asignados",
            studentsUpdated
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al desactivar el curso",
            error: error.message
        });
    }
};



export const assignStudentToCourse = async (req, res) => {
    try {
        const data = req.body
        const course = await Course.findById(data.courseId)
        const student = await User.findOne({ email: data.email })

        if (!course || !student) {
            return res.status(404).json({
                success: false,
                message: "Curso o Estudiante no encontrado"
            })
        }

        if (!student.coursesAssigned) {
            student.coursesAssigned = []
        }

        if (student.coursesAssigned.length >= 3) {
            return res.status(400).json({
                success: false,
                message: "Un alumno solo puede tener 3 cursos"
            })
        }

        if (course.students.includes(student._id)) {
            return res.status(400).json({
                success: false,
                message: "El estudiante ya está asignado a este curso"
            })
        }

        course.students.push(student._id)
        student.coursesAssigned.push(course._id)

        await course.save()
        await student.save()

        const populatedStudent = await User.findById(student._id).populate('coursesAssigned')

        res.status(200).json({
            success: true,
            message: "Estudiante asignado al curso correctamente",
            student: populatedStudent
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al asignar el estudiante al curso",
            error: error.message
        })
    }
}
