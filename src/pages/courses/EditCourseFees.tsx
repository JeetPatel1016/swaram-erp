import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { TablesUpdate } from "@/lib/api/types";
import { supabase } from "@/lib/supabase";
import { feeFns, feeKeys } from "@/query/fees";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type FeeStructure = TablesUpdate<"fee_structures">;

export default function EditCourseFees() {
  const { id: courseId } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const {
    data: feeData,
    error,
    isLoading,
  } = useQuery({
    queryKey: feeKeys.getFeeStructureByCourseFn(courseId as string),
    queryFn: () => feeFns.getFeeStructureByCourseFn(courseId!),
  });

  const [feePayload, setFeePayload] = useState<FeeStructure[]>([]);
  const [updateDiff, setUpdateDiff] = useState(false);
  useEffect(() => {
    if (feeData) {
      const payload: FeeStructure[] = feeData.map((fee) => ({
        id: fee.id,
        year_number: fee.year_number,
        total_fee: fee.total_fee,
        course_id: fee.course_id,
      }));

      setFeePayload(payload);
    }
  }, [feeData]);

  const updateFeePayload = (index: number, value: string) => {
    const updatedPayload = [...feePayload];
    updatedPayload[index].total_fee = parseInt(value);
    setFeePayload(updatedPayload);
    if (!updateDiff) setUpdateDiff(true);
  };

  const submitPayload = async () => {
    // validate fee amounts are valid
    const invalidAmounts = feePayload.some(
      (fee) => !fee.total_fee || fee.total_fee <= 0
    );
    if (invalidAmounts) {
      toast({
        variant: "destructive",
        title: "Invalid Amounts",
        description:
          "Please ensure all fee amounts are valid and greater than zero.",
      });
      return;
    }
    const { error } = await supabase.from("fee_structures").upsert(feePayload);
    if (error) {
      toast({
        variant: "destructive",
        title: "Error occurred",
        description:
          "Error occurred while updating fee structure, please try again.",
      });
      return;
    }
    navigate("/courses");
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {error ? (
            <div className="w-full h-full flex items-center justify-center">
              Something went wrong. Please try again
            </div>
          ) : (
            <>
              {feeData && (
                <>
                  <div className="flex gap-4 items-center mb-4">
                    <ChevronLeft
                      onClick={() => {
                        navigate(-1);
                      }}
                      className="font-bold cursor-pointer text-muted-foreground hover:text-secondary-foreground "
                    />
                    <h1 className="text-3xl font-medium">
                      Fee Structure - {feeData[0].courses?.name}
                    </h1>
                  </div>
                  <Table className="max-w-md">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-1/2">Year</TableHead>
                        <TableHead>Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {feePayload.map((fee, index) => (
                        <TableRow key={fee.id}>
                          <TableCell>{fee.year_number}</TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              value={fee.total_fee!}
                              onChange={(e) =>
                                updateFeePayload(index, e.currentTarget.value)
                              }
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="flex gap-4 mt-4 justify-end">
                    {updateDiff && (
                      <Button onClick={submitPayload}>Save</Button>
                    )}
                    <Button variant={"secondary"}>Cancel</Button>
                  </div>
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
