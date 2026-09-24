import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { tryCatch } from "@/hooks/try-catch";
import { lessonSchema, LessonSchemaType } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus } from "lucide-react";
import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { createLesson } from "../actions";
import { toast } from "sonner";

export function NewLessonModal({
  courseId,
  chapterId,
}: {
  courseId: string;
  chapterId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const form = useForm<LessonSchemaType>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      name: "",
      courseId: courseId,
      chapterId: chapterId,
    },
  });

  async function onSubmit(values: LessonSchemaType) {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(createLesson(values));

      if (error) {
        toast.error("An unexpedcted error occurred. PLease try again.");
        return;
      }

      if (result.status === "success") {
        toast.success(result.message);
        form.reset();
        setIsOpen(false);
      } else if (result.status === "error") {
        toast.error(result.message);
      }
    });
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      form.reset();
    }
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-center gap-1"
          >
            <Plus className="size-4" />
            New Lesson
          </Button>
        }
      />

      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle> Create new lesson </DialogTitle>
          <DialogDescription>
            What would you like to name your lesson?
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Name</FieldLabel>

                  <Input
                    {...field}
                    id={field.name}
                    placeholder="Lesson name"
                    aria-invalid={fieldState.invalid}
                    className="py-2 px-2 rounded-lg"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <DialogFooter className="mt-6">
              <Button
                type="submit"
                disabled={pending}
                className="cursor-pointer"
              >
                {pending ? (
                  <>
                    <Loader2 className="size-4 animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  "Save Change"
                )}
              </Button>
            </DialogFooter>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default NewLessonModal;
