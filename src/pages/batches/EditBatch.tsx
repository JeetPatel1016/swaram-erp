import Loader from "@/components/Loader";
import { batchFns, batchKeys } from "@/query/batches";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditBatch() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {data: batchDetails, error, isLoading} = useQuery({
    queryKey: batchKeys.getBatchById(id!),
    queryFn: () => batchFns.getBatchByIdFn(id!)
  })
  return <>{isLoading ? <Loader /> : (
    <>
    {error ? (
      <div className="w-full h-full flex items-center justify-center">
        Something went wrong. Please try again
      </div>
    ) : (
      <div className="flex gap-4 items-center mb-4">
        <ChevronLeft
          onClick={() => {
            navigate(-1);
          }}
          className="font-bold cursor-pointer text-muted-foreground hover:text-secondary-foreground"/>
          <h1 className="text-3xl font-bold">
            Edit Batch - {batchDetails?.name}
          </h1>
      </div>
    )}
    </>
  )}</>;
}
