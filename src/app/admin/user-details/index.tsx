import { FC } from "react";
import { LoadingBlock } from "@/components/loading/loading-block";
import { RequestFail } from "@/components/error/error-message";
import { useParams } from "react-router-dom";
import { useUser } from "@/features/user/api/get-user";
import { useUpdateUserStatus } from "@/features/user/api/update-user-status";
import { Loader2 } from "lucide-react";
import { InformationSection } from "./information-section";

export const AdminUserDetails: FC = () => {
  const { id } = useParams();
  const userQuery = useUser({ id });
  const updateUserStatusMutation = useUpdateUserStatus();
  const isPending = updateUserStatusMutation.isPending;

  if (userQuery.isLoading) return <LoadingBlock />;

  if (userQuery.isError)
    return (
      <RequestFail retryRequest={userQuery.refetch} error={userQuery.error} />
    );

  if (userQuery.data === undefined) return <div>No data</div>;

  return (
    <div className="relative">
      {isPending && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 rounded-lg">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading...</p>
          </div>
        </div>
      )}
      <InformationSection
        user={userQuery.data}
        updateUserStatusMutation={updateUserStatusMutation}
      />
    </div>
  );
};
