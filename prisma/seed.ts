import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

function generatePicsumUrl(width: number, height: number): string {
    return `https://picsum.photos/${width}/${height}`;
}

async function seedClassrooms() {
    console.log('Seeding Classrooms...');
    const classrooms = [];
    for (let i = 0; i < 100; i++) {
        const classroom = await prisma.classroom.create({
            data: {
                name: faker.word.adjective() + ' ' + faker.word.noun(),
                subject: faker.word.noun(),
                image: generatePicsumUrl(800, 600),
            },
        });
        classrooms.push(classroom);
        console.log(`Created Classroom with ID: ${classroom.id}`);
    }
    console.log('Finished seeding Classrooms.');
    return classrooms;
}

async function seedStudents(classroomIds: number[]) {
    console.log('Seeding Students...');
    const students = [];
    for (let i = 0; i < 100; i++) {
        const student = await prisma.student.create({
            data: {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                image: generatePicsumUrl(400, 400),
                classroomId: faker.helpers.arrayElement(classroomIds),
            },
        });
        students.push(student);
        console.log(`Created Student with ID: ${student.id}, assigned to Classroom ID: ${student.classroomId}`);
    }
    console.log('Finished seeding Students.');
    return students;
}

async function seedSchedules(classroomIds: number[]) {
    console.log('Seeding Schedules...');
    const schedules = [];
    for (let i = 0; i < 100; i++) {
        const schedule = await prisma.schedule.create({
            data: {
                dateTime: faker.date.future(),
                classroomId: faker.helpers.arrayElement(classroomIds),
            },
        });
        schedules.push(schedule);
        console.log(`Created Schedule with ID: ${schedule.id}, for Classroom ID: ${schedule.classroomId}`);
    }
    console.log('Finished seeding Schedules.');
    return schedules;
}

async function main() {
    console.log('Start seeding...');

    const classrooms = await seedClassrooms();
    const classroomIds = classrooms.map(c => c.id);

    await seedStudents(classroomIds);
    await seedSchedules(classroomIds);

    console.log('Seeding finished');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
