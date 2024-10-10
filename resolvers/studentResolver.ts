import prisma from "../prismaConfig";

export const studentResolver = {
    Query: {
        student: async (_: any, { id }: { id: number }) => {
            try {
                const student = await prisma.student.findUnique({
                    where: { id },
                    include: { enrolledClass: true },
                });
                if (!student) {
                    throw new Error("Student not found");
                }
                return student;
            } catch (error) {
                console.error('Error fetching student:', error);
                throw new Error('An error occurred while fetching the student');
            }
        },
        students: async () => {
            try {
                return prisma.student.findMany({
                    include: { enrolledClass: true },
                });
            } catch (error) {
                console.error('Error fetching students:', error);
                throw new Error('An error occurred while fetching students');
            }
        },
    },
    Mutation: {
        createStudent: async (_: any, { name, email, classroomId }: { name: string; email: string; classroomId: number }) => {
            try {
                return prisma.student.create({
                    data: {
                        name,
                        email,
                        enrolledClass: { connect: { id: classroomId } },
                    },
                    include: { enrolledClass: true },
                });
            } catch (error) {
                console.error('Error creating student:', error);
                throw new Error('An error occurred while creating the student');
            }
        },
        updateStudent: async (_: any, { id, name, email, classroomId }: { id: number; name?: string; email?: string; classroomId?: number }) => {
            try {
                return prisma.student.update({
                    where: { id },
                    data: {
                        name,
                        email,
                        enrolledClass: classroomId ? { connect: { id: classroomId } } : undefined,
                    },
                    include: { enrolledClass: true },
                });
            } catch (error) {
                console.error('Error updating student:', error);
                throw new Error('An error occurred while updating the student');
            }
        },
        deleteStudent: async (_: any, { id }: { id: number }) => {
            try {
                await prisma.student.delete({ where: { id } });
                return true;
            } catch (error) {
                console.error('Error deleting student:', error);
                throw new Error('An error occurred while deleting the student');
            }
        },
    },
};
