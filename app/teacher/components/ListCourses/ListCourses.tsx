import React from 'react'
import { ListCoursesProps } from './ListCourses.types'
import { CourseCard } from './CourseCard'

export function ListCourses({ courses }: ListCoursesProps) {
    if (courses.length === 0) {
        return <p>No hay cursos creados</p>
    }

    return (
        <div className="flex flex-col my-4 mx-6 border rounded-lg bg-white p-4 gap-10">
            {courses.map((course) => (
                <div key={course.id}>
                    <CourseCard course={course}/>
                    <div className="border-t border-gray-200 w-full mt-4" />
                </div>
            ))}
        </div>
    )
}
