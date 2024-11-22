"use client";
import React from "react";
import { Button } from "./ui/button";
import { DeleteIcon } from "lucide-react";
import DeletePopUp from "./DeletePopUp";

const Delete = ({ title, id }: { title: string; id: string }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button
        className="startup-card_delete"
        asChild
        onClick={() => setOpen(true)}
      >
        <p className="text-16-medium">
          <DeleteIcon className="size-6" />
          Delete
        </p>
      </Button>
      {open && (
        <DeletePopUp open={open} setOpen={setOpen} title={title} id={id} />
      )}
    </>
  );
};

export default Delete;
