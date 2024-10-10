import { gql } from 'apollo-server-express';

const rootSchema = gql`
    scalar DateTime

    type Classroom {
        id: Int!
        name: String!
        subject: String!
        students: [Student!]!
        schedules: [Schedule!]!
    }

    type Student {
        id: Int!
        name: String!
        email: String!
        enrolledClass: Classroom!
        classroomId: Int!
    }

    type Schedule {
        id: Int!
        dateTime: DateTime!
        classroom: Classroom!
        classroomId: Int!
    }

    type Query {
        classroom(id: Int!): Classroom
        classrooms: [Classroom!]!
        student(id: Int!): Student
        students: [Student!]!
        schedule(id: Int!): Schedule
        schedules: [Schedule!]!
    }

    type Mutation {
        createClassroom(name: String!, subject: String!): Classroom!
        updateClassroom(id: Int!, name: String, subject: String): Classroom!
        deleteClassroom(id: Int!): Classroom

        createStudent(name: String!, email: String!, classroomId: Int!): Student!
        updateStudent(id: Int!, name: String, email: String, classroomId: Int): Student!
        deleteStudent(id: Int!): Student

        createSchedule(dateTime: DateTime!, classroomId: Int!): Schedule!
        updateSchedule(id: Int!, dateTime: DateTime, classroomId: Int): Schedule!
        deleteSchedule(id: Int!): Schedule
    }
`;

export default rootSchema;
