import { studentResolver } from './studentResolver';
// Import other resolvers here as they are created
// import { classroomResolver } from './classroomResolver';
// import { scheduleResolver } from './scheduleResolver';

export const resolvers = {
    Query: {
        student: studentResolver.Query.student,
        students: studentResolver.Query.students,
        // Add other queries here as they are created
        // classroom: classroomResolver.Query.classroom,
        // classrooms: classroomResolver.Query.classrooms,
        // schedule: scheduleResolver.Query.schedule,
        // schedules: scheduleResolver.Query.schedules,
    },
    Mutation: {
        createStudent: studentResolver.Mutation.createStudent,
        updateStudent: studentResolver.Mutation.updateStudent,
        deleteStudent: studentResolver.Mutation.deleteStudent,
        // Add other mutations here as they are created
        // createClassroom: classroomResolver.Mutation.createClassroom,
        // updateClassroom: classroomResolver.Mutation.updateClassroom,
        // deleteClassroom: classroomResolver.Mutation.deleteClassroom,
        // createSchedule: scheduleResolver.Mutation.createSchedule,
        // updateSchedule: scheduleResolver.Mutation.updateSchedule,
        // deleteSchedule: scheduleResolver.Mutation.deleteSchedule,
    },
};
