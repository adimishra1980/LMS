import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { adminGetCourses } from "@/app/data/admin/admin-get-courses";
import { AdminCourseCard } from "./_components/AdminCourseCard";
import { RenderEmptyState } from "@/components/general/EmptyState";

export default async function CoursesPage() {
  const courses = await adminGetCourses();
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className=" text-3xl font-bold">Your Courses</h1>

        <Link href="/admin/courses/create" className={buttonVariants()}>
          Create Courses
        </Link>
      </div>

      {courses.length === 0 ? (
        <RenderEmptyState
          title="No courses found"
          description="Create your first course to get started"
          buttonText="Create Course"
          href="/admin/courses/create"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-7">
          {courses.map((course) => (
            <AdminCourseCard data={course} key={course.id} />
          ))}
        </div>
      )}
    </>
  );
}
