import { FC, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import ReturnIcon from "@/components/ui/return-icon";
import { UserDetailsDto } from "@/types/api";
import _ from "lodash";
import { ConfirmDialog } from "@/components/ConfirmDialog";

interface InformationSectionProps {
  user: UserDetailsDto;
  updateUserStatusMutation: any;
}

const formSchema = z.object({
  id: z.number(),
  username: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  isActive: z.boolean(),
  roles: z.array(z.string()),
});

export const InformationSection: FC<InformationSectionProps> = ({
  user,
  updateUserStatusMutation,
}) => {
  const [showChangeConfirm, setShowChangeConfirm] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const initialValues = useMemo(
    () => ({
      id: user.id,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      isActive: user.isActive,
      roles: user.roles,
    }),
    [user]
  );

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setShowChangeConfirm(true);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...initialValues,
    },
  });

  const onChangeConfirm = () => {
    updateUserStatusMutation.mutate({ id: user.id, isActive: !user.isActive });
    setShowChangeConfirm(false);
  };

  useEffect(() => {
    form.reset(initialValues);
  }, [form, initialValues]);

  return (
    <div className="container mx-auto py-6">
      <ReturnIcon />
      <h1 className="text-3xl font-bold mb-10 mt-4">User Details</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex justify-end">
            {!user.roles.includes("ADMIN") && (
              <Button
                type="submit"
                variant={user.isActive ? "destructive" : "secondary"}
              >
                {user.isActive ? "Deactivate" : "Activate"}
              </Button>
            )}
          </div>
          <div className="grid grid-cols-2 grid-rows-2 gap-4">
            {/* Username Field */}
            <div>
              <FormField
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Username"
                        {...field}
                        disabled={!isEditable}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Status Field */}
            <div>
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="h-full flex flex-col">
                    <FormLabel className="h-fit">Status</FormLabel>
                    <FormControl className="flex-grow">
                      <Input
                        placeholder="Status"
                        {...field}
                        value={field.value ? "Active" : "Inactive"}
                        disabled={!isEditable}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Firstname Field */}
            <div>
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem className="h-full flex flex-col">
                    <FormLabel className="h-fit">Firstname</FormLabel>
                    <FormControl className="flex-grow">
                      <Input
                        placeholder="Firstname"
                        {...field}
                        disabled={!isEditable}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Lastname Field */}
            <div>
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem className="h-full flex flex-col">
                    <FormLabel className="h-fit">Lastname</FormLabel>
                    <FormControl className="flex-grow">
                      <Input
                        placeholder="Lastname"
                        {...field}
                        disabled={!isEditable}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/**Roles fields */}
            <div>
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem className="h-full flex flex-col">
                    <FormLabel className="h-fit">Roles</FormLabel>
                    <FormControl className="flex-grow">
                      <Input
                        placeholder="Roles"
                        {...field}
                        value={_.join(user.roles, ", ")}
                        disabled={!isEditable}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>

      <ConfirmDialog
        showConfirmDialog={showChangeConfirm}
        setShowConfirmDialog={setShowChangeConfirm}
        handleConfirm={onChangeConfirm}
      />
    </div>
  );
};
