import { defineField, defineType } from "sanity";

export const startup = defineType({
  name: "startup",
  title: "Startup",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) =>
        Rule.min(1)
          .max(60)
          .required()
          .error(
            "Title is required and must be between 1 and 60 characters long"
          ),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "author",
      type: "reference",
      to: [{ type: "author" }],
    }),
    defineField({
      name: "views",
      type: "number",
    }),
    defineField({
      name: "description",
      type: "text",
    }),
    defineField({
      name: "category",
      type: "string",
      validation: (Rule) =>
        Rule.min(1)
          .max(20)
          .required()
          .error(
            "Category is required and must be between 1 and 20 characters long"
          ),
    }),
    defineField({
      name: "image",
      type: "url",
      validation: (Rule) =>
        Rule.required().error("Image is required and must be a valid URL"),
    }),
    defineField({
      name: "pitch",
      type: "markdown",
    }),
  ],
});
