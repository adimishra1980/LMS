"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { ArrowLeft, Loader2, PlusIcon, SparkleIcon } from "lucide-react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  courseCategories,
  courseLevels,
  courseSchema,
  CourseSchemaType,
  courseStatus,
} from "@/lib/zodSchema";
import slugify from "slugify";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { RichTextEditor } from "@/components/rich-text-editor/Editor";
import { Uploader } from "@/components/file-uploader/Uploader";

export default function CourseCreationPage() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<CourseSchemaType>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      description: "",
      fileKey: "",
      price: 1,
      duration: 0,
      level: "Beginner",
      category: "Development",
      smallDescription: "",
      slug: "",
      status: "Draft",
    },
  });

  function onSubmit(values: CourseSchemaType) {
    console.log(values);
  }

  return (
    <>
      <div className="flex items-center gap-4">
        <Link
          href="/admin/courses"
          className={buttonVariants({
            variant: "outline",
            size: "icon",
          })}
        >
          <ArrowLeft className="size-4" />
        </Link>

        <h1 className="text-2xl font-bold">Create Courses</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>
            Provide basic Information about the course
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FieldGroup>
              <Controller
                control={form.control}
                name="title"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Title</FieldLabel>

                    <Input
                      {...field}
                      id={field.name}
                      placeholder="Enter Title"
                      aria-invalid={fieldState.invalid}
                      className="py-2 px-2 rounded-lg"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <div className="flex items-end gap-4">
                <Controller
                  control={form.control}
                  name="slug"
                  render={({ field, fieldState }) => (
                    <Field className="w-full" data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Slug</FieldLabel>

                      <Input
                        {...field}
                        id={field.name}
                        placeholder="Enter Slug"
                        aria-invalid={fieldState.invalid}
                        className="py-2 px-2 rounded-lg"
                      />

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Button
                  type="button"
                  className="w-fit"
                  onClick={() => {
                    const titleValue = form.getValues("title");

                    const slug = slugify(titleValue);

                    form.setValue("slug", slug, {
                      shouldValidate: true,
                    });
                  }}
                >
                  Generate Slug
                  <SparkleIcon className="ml-1" size={16} />
                </Button>
              </div>

              <Controller
                control={form.control}
                name="smallDescription"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Small Description
                    </FieldLabel>

                    <Textarea
                      {...field}
                      id={field.name}
                      placeholder="Enter Small Description"
                      className="min-h-30"
                      aria-invalid={fieldState.invalid}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="description"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Description</FieldLabel>

                    <RichTextEditor field={field} />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="fileKey"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Thumbnail Image
                    </FieldLabel>

                    <Uploader
                      onChange={field.onChange}
                      value={field.value}
                      // fieldTypeAccepted="image"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Controller
                  control={form.control}
                  name="category"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Category</FieldLabel>

                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger
                          id={field.name}
                          className="w-full"
                          aria-invalid={fieldState.invalid}
                        >
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>

                        <SelectContent>
                          {courseCategories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  control={form.control}
                  name="level"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Level</FieldLabel>

                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger
                          id={field.name}
                          className="w-full"
                          aria-invalid={fieldState.invalid}
                        >
                          <SelectValue placeholder="Select Level" />
                        </SelectTrigger>

                        <SelectContent>
                          {courseLevels.map((level) => (
                            <SelectItem key={level} value={level}>
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  control={form.control}
                  name="duration"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        Duration (hours)
                      </FieldLabel>

                      <Input
                        {...field}
                        id={field.name}
                        placeholder="Enter duration"
                        type="number"
                        aria-invalid={fieldState.invalid}
                        onChange={(event) =>
                          field.onChange(Number(event.target.value))
                        }
                      />

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  control={form.control}
                  name="price"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Price ($)</FieldLabel>

                      <Input
                        {...field}
                        id={field.name}
                        placeholder="Enter price"
                        type="number"
                        aria-invalid={fieldState.invalid}
                        onChange={(event) =>
                          field.onChange(Number(event.target.value))
                        }
                      />

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>

              <Controller
                control={form.control}
                name="status"
                render={({ field, fieldState }) => (
                  <Field className="w-full" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Status</FieldLabel>

                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger
                        id={field.name}
                        className="w-full"
                        aria-invalid={fieldState.invalid}
                      >
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>

                      <SelectContent>
                        {courseStatus.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  Creating...
                  <Loader2 className="animate-spin ml-1" />
                </>
              ) : (
                <>
                  Create Course
                  <PlusIcon className="ml-1" size={16} />
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
