import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { tryCatch } from "@/hooks/try-catch";
import { Loader2, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { deleteLesson } from "../actions";
import { toast } from "sonner";

type DeleteLessonProps = {
  chapterId: string;
  courseId: string;
  lessonId: string;
};

export function DeleteLesson({
  chapterId,
  courseId,
  lessonId,
}: DeleteLessonProps) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  async function onSubmit() {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        deleteLesson({ chapterId, courseId, lessonId }),
      );

      if (error) {
        toast.error("An unexpected error occured. Please try again.");
        return;
      }

      if (result.status === "success") {
        toast.success(result.message);
        setOpen(false);
      } else if (result.status === "error") {
        toast.error(result.message);
      }
    });
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <Button variant="ghost" size="icon" className="cursor-pointer">
            <Trash2 className="size-4" />
          </Button>
        }
      />

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            lesson.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <Button
            onClick={onSubmit}
            disabled={pending}
            className="cursor-pointer"
          >
            {pending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span className="ml-2">Deleting...</span>
              </>
            ) : (
              "Continue"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
