import { DeleteCreation, SubmitCreation } from "@/actions/creations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

export function useSubmitCreationMutation() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const userId = session.user.id;

  const mutation = useMutation({
    mutationFn: SubmitCreation,
    onSuccess: async (data) => {
      if (!data.success) {
        toast.error(data.error);
        return;
      }
      const newCreation = data.newCreation;
      const queryKey = ["creations", userId];

      await queryClient.cancelQueries(queryKey);
      queryClient.setQueryData(queryKey, (oldData) => {
        if (!oldData) return oldData;
        const firstPage = oldData.pages[0];
        if (firstPage) {
          return {
            pageParams: oldData.pageParams,
            pages: [
              {
                nextCursor: firstPage.nextCursor,
                creations: [newCreation, ...firstPage.creations],
              },
              ...oldData.pages.slice(1),
            ],
          };
        }
      });
    },
  });
  return mutation;
}

export function useUpdateCreationMutation() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const userId = session.user.id;

  const mutation2 = useMutation({
    mutationFn: SubmitCreation,
    onSuccess: async (data) => {
      if (!data.success) {
        toast.error(data.error);
        return;
      }
      const updatedCreation = data.newCreation;
      const queryKey = ["creations", userId];

      await queryClient.cancelQueries(queryKey);
      queryClient.setQueryData(queryKey, (oldData) => {
        if (!oldData) return oldData;
        return {
          pageParams: oldData.pageParams,
          pages: oldData.pages.map((page) => ({
            nextCursor: page.nextCursor,
            creations: page.creations.map((c) => {
              if (c._id === updatedCreation._id) {
                return {
                  ...updatedCreation,
                };
              }
              return c;
            }),
          })),
        };
      });
    },
  });
  return mutation2;
}

export function useDeleteCreationMutation() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const userId = session.user.id;

  const mutation = useMutation({
    mutationFn: DeleteCreation,
    onSuccess: async (data) => {
      if (!data.success) {
        toast.error(data.error);
        return;
      }
      const deletedCreation = data.deletedCreation;
      const queryKey = ["creations", userId];

      await queryClient.cancelQueries(queryKey);
      queryClient.setQueryData(queryKey, (oldData) => {
        if (!oldData) return oldData;
        return {
          pageParams: oldData.pageParams,
          pages: oldData.pages.map((page) => ({
            nextCursor: page.nextCursor,
            creations: page.creations.filter(
              (c) => c._id !== deletedCreation._id
            ),
          })),
        };
      });
      toast.success("Creation deleted successfully");
    },
  });
  return mutation;
}
