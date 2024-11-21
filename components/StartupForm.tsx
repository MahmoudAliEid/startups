"use client";

import { useState, useActionState } from "react";

// ** UI
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import MdEditor from "@uiw/react-md-editor";
import { formSchema } from "@/lib/validation";

import { z } from "zod";
import { Notify } from "@/lib/utils";
import { createPitch } from "@/lib/actions";
import { useRouter } from "next/navigation";

const StartupForm = () => {
  const [error, setError] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("*hello world!*");

  const router = useRouter();

  const handleSubmit = async (
    prevState: { error: string; status: string } | undefined,
    formData: FormData
  ) => {
    const state = prevState || { error: "", status: "idle" };

    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch,
      };

      // Validate form values
      await formSchema.parseAsync(formValues);

      console.log(formValues);
      const res = await createPitch(state, formData, pitch);

      if (res.status === "success") {
        Notify({ message: "Startup created successfully", type: "success" });
        router.push(`/startup/${res?._id}`);
        console.log(res);

        return { ...state, error: "", status: "success" };
      } else {
        Notify({ message: "Something went wrong", type: "error" });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const filedErrors = error.flatten().fieldErrors;
        setError(filedErrors as unknown as Record<string, string>);

        Notify({ message: "Please fill the form correctly", type: "error" });
        return { ...state, error: "Validation Error", status: "error" };
      }
      Notify({ message: "Something went wrong", type: "error" });

      return { ...state, error: "Something went wrong", status: "error" };
    }
  };

  const initialState = {
    error: "",
    status: "idle",
  };

  const [, formAction, isPending] = useActionState(handleSubmit, initialState);

  return (
    <>
      <form className="startup-form" action={formAction}>
        <div>
          <label htmlFor="title" className="startup-form_label">
            Title
          </label>
          <Input
            type="text"
            id="title"
            name="title"
            placeholder="startup title"
            required
            className="startup-form_input"
          />
          {error.title && <p className="startup-form_error">{error.title}</p>}
        </div>

        <div>
          <label htmlFor="description" className="startup-form_label">
            Description
          </label>
          <Textarea
            id="description"
            name="description"
            placeholder="startup description"
            required
            className="startup-form_textarea"
          />
          {error.description && (
            <p className="startup-form_error">{error.description}</p>
          )}
        </div>

        <div>
          <label htmlFor="category" className="startup-form_label">
            Category
          </label>
          <Input
            type="text"
            id="category"
            name="category"
            placeholder="startup category (e.g. Tech, Health...)"
            required
            className="startup-form_input"
          />
          {error.category && (
            <p className="startup-form_error">{error.category}</p>
          )}
        </div>

        {/* TODO:change it to uploading image */}
        <div>
          <label htmlFor="link" className="startup-form_label">
            Image URL
          </label>
          <Input
            type="text"
            id="link"
            name="link"
            placeholder="startup image URL"
            required
            className="startup-form_input"
          />
          {error.link && <p className="startup-form_error">{error.link}</p>}
        </div>

        <div data-color-mode="light">
          <label htmlFor="pitch" className="startup-form_label">
            Pitch
          </label>
          <MdEditor
            value={pitch}
            onChange={(value) => setPitch(value as string)}
            id={"pitch"}
            preview="edit"
            style={{ borderRadius: 20, overflow: "hidden" }}
            height={300}
            textareaProps={{
              placeholder:
                "describe your idea, and why it's unique , what problem does it solve?",
              required: true,
            }}
            previewOptions={{
              disallowedElements: ["style"],
            }}
          />
          {error.pitch && <p className="startup-form_error">{error.pitch}</p>}
        </div>

        <Button
          type="submit"
          className="startup-form_btn text-white my-4"
          disabled={isPending}
        >
          {isPending ? "Submitting..." : "Submit"}
          <Send className="ml-2 size-6" />
        </Button>
      </form>
    </>
  );
};

export default StartupForm;
