import { Tables } from "@/lib/api/types";
import { useQuery } from "@tanstack/react-query";
import { studentFns, studentKeys } from "@/query/students";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import DataTable from "@/components/tables/data-table";
import Loader from "@/components/Loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
type Student = Tables<"students">;

export default function Students() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    data: students,
    error,
    isLoading,
  } = useQuery({
    queryKey: studentKeys.getStudents(),
    queryFn: studentFns.getStudentsFn,
  });
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredStudents = useMemo(() => {
    const normalizedQuery = searchQuery.toLowerCase().trim();
    return students?.filter((student) => {
      const fullname = [
        student.first_name,
        student.middle_name,
        student.last_name,
      ]
        .filter(Boolean) // remove empty or null parts
        .join(" ")
        .toLowerCase();
      return fullname.includes(normalizedQuery);
    });
  }, [students, searchQuery]);

  // Method to remove student record
  const removeStudent = async (id: string) => {
    const { error } = await supabase.from("students").delete().eq("id", id);
    if (error) {
      toast({
        title: "Error occurred",
        description: "Error occurred while deleting student, please try again.",
      });
    }
    navigate(0);
  };

  // Defining columns for our datatable
  const columns: ColumnDef<Student>[] = [
    {
      accessorKey: "gr_no",
      header: () => <p className="pl-4">GR NO.</p>,
      cell: ({ row }) => <p className="pl-4">{row.original.gr_no}</p>,
    },
    {
      accessorKey: "Full Name",
      header: "Full Name",
      cell: ({ row }) => {
        const name = `${row.original.first_name} ${row.original.middle_name} ${row.original.last_name}`;
        return (
          // Add avatar here later
          <div className="flex items-center gap-4">
            <Avatar className="w-8 h-8">
              <AvatarImage src={row.original.avatar_url || ""} />
              <AvatarFallback>
                {row.original.first_name[0]}
                {row.original.last_name[0]}
              </AvatarFallback>
            </Avatar>
            <p>{name}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "date_of_birth",
      header: () => <p>Date of Birth</p>,
      cell: ({ row }) => (
        <div className="">
          {new Date(row.original.date_of_birth).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </div>
      ),
    },
    {
      accessorKey: "gender",
      header: () => <p>Gender</p>,
      cell: ({ row }) => <p>{row.original.gender}</p>,
    },
    {
      accessorKey: "admission_date",
      header: () => <p>Admission Date</p>,
      cell: ({ row }) => (
        <div className="">
          {new Date(row.original.admission_date).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </div>
      ),
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const student = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open Menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => {
                  navigate(`/students/${student.id}`);
                }}
              >
                View Student Details
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  navigate(`/students/edit/${student.id}`);
                }}
              >
                Edit Student Details
              </DropdownMenuItem>
              {/* <DropdownMenuItem> */}
              <Dialog>
                <DialogTrigger
                  className={cn(
                    "w-full hover:bg-neutral-100 dark:hover:bg-neutral-800 relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0"
                  )}
                >
                  Delete Student Record
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="mb-4">
                      Are you absolutely sure?
                    </DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently remove
                      student records from our servers.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant={"ghost"} type="button">
                        Cancel
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button
                        variant={"destructive"}
                        type="button"
                        onClick={() => removeStudent(student.id)}
                      >
                        Delete
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              {/* </DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  return (
    <>
      <div className="flex items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">Students</h1>
        <Input
          onChange={(e) => setSearchQuery(e.currentTarget.value)}
          className="ml-auto max-w-72"
          placeholder="Search Records"
        />
        <Button
          onClick={() => navigate("add")}
          className=""
          variant={"default"}
        >
          <PlusIcon />
          Add New Student
        </Button>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {error ? (
            <div className="w-full h-full flex items-center justify-center">
              Something went wrong. Please try again
            </div>
          ) : (
            <DataTable columns={columns} data={filteredStudents!} />
          )}
        </>
      )}
    </>
  );
}
