"use client";

import { deleteStartup } from "@/lib/actions";
import { Notify } from "@/lib/utils";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

import { useRouter } from "next/navigation";

import { FaExclamation } from "react-icons/fa";

export default function DeletePopUp({
  open,
  setOpen,
  title,
  id,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  id: string;
}) {
  const router = useRouter();

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto  ">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 ">
          <DialogPanel
            transition
            className="relative border-[3px] border-black transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                  <FaExclamation
                    aria-hidden="true"
                    className="size-6 text-red-600"
                  />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-base  text-gray-900 font-bold "
                  >
                    Delete Startup
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to{" "}
                      <span className="text-red-500 font-bold ">delete</span>{" "}
                      <span className=" font-bold">{title}</span> startup? This
                      action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <form
                action={async () => {
                  const res = await deleteStartup(id);
                  if (res.status === "success") {
                    Notify({
                      message: "Startup deleted successfully",
                      type: "success",
                    });
                    router.push("/");
                  } else {
                    Notify({
                      message: "Failed to delete startup",
                      type: "error",
                    });
                  }
                }}
              >
                <button
                  type="submit"
                  className="dialog_delete shadow-sm sm:w-auto"
                >
                  Delete
                </button>
              </form>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="dialog_btn sm:w-auto cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
