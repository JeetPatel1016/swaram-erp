import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Tables } from "@/lib/api/types";
import { supabase } from "@/lib/supabase";
import { ChevronLeft } from "lucide-react";
import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import { CgSpinner } from "react-icons/cg";
import { useNavigate, useParams } from "react-router-dom";

type Course = Tables<"courses">;

export default function EditCourse() {
  // Use the id to fetch course details
  const { id } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [courseDetails, setCourseDetails] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // fetching data from "API"
    const fetchCourseDetails = async () => {
      const { data, error } = await supabase
        .from("courses")
        .select()
        .eq("id", id!);
      if (error) {
        toast({
          title: "Error occurred",
          description: "Error occurred while fetching data, please try again",
          variant: "destructive",
        });
        return;
      }
      if (data) setCourseDetails(data[0]);
    };
    fetchCourseDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleInputChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const target = e.currentTarget;
    const { name, value } = target;
    setCourseDetails((courseDetails) => ({
      ...courseDetails!,
      [name as keyof Course]: value,
    }));
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    // Data is updated or error is toasted.
    setIsLoading(true);
    const { error } = await supabase
      .from("courses")
      .update({
        ...courseDetails,
      })
      .eq("id", id!);

    if (error) {
      toast({
        title: "Error Occurred",
        description: "Error occurred adding new course, please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    navigate("/courses");
  };

  return (
    <>
      {courseDetails ? (
        <>
          <div className="flex gap-4 items-center mb-8">
            <ChevronLeft
              className="cursor-pointer"
              onClick={() => navigate(-1)}
            />
            <h1 className="text-3xl font-bold">Edit Course Details</h1>
          </div>
          <form
            onSubmit={handleFormSubmit}
            className="flex flex-col md:w-1/2 lg:w-1/3 gap-4"
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Course Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={courseDetails.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="duration_years">Duration Years</Label>
              <Input
                type="number"
                min={1}
                id="duration_years"
                name="duration_years"
                onChange={handleInputChange}
                value={courseDetails.duration_years}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                onChange={handleInputChange}
                value={courseDetails.description || ""}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="default" type="submit" disabled={isLoading}>
                {isLoading ? <CgSpinner className="animate-spin" /> : "Save"}
              </Button>
              <Button variant="ghost">Cancel</Button>
            </div>
          </form>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}
