import { config, fields, collection } from "@keystatic/core";

// GitHub-backed storage. Even during local dev, saves commit directly to the
// GitHub repo (which triggers a Vercel redeploy). The first time you visit
// /keystatic, Keystatic will run a setup wizard that creates a GitHub App
// on your account and writes the OAuth credentials into .env.
// Docs: https://keystatic.com/docs/github-mode
export default config({
  storage: {
    kind: "github",
    repo: {
      owner: "lolzfag",
      name: "seanyu-site",
    },
  },
  ui: {
    brand: { name: "Sean Yu" },
  },
  collections: {
    posts: collection({
      label: "Posts",
      slugField: "title",
      path: "src/content/blog/*",
      format: { contentField: "content" },
      entryLayout: "content",
      columns: ["title", "date"],
      schema: {
        title: fields.slug({
          name: { label: "Title" },
          slug: {
            label: "Slug",
            description: "URL-safe identifier. Used at /blog/{slug}.",
          },
        }),
        description: fields.text({
          label: "Description",
          description:
            "One-line hook. Used for the blog index, OG preview, sitemap, and Article schema.",
          multiline: true,
          validation: { length: { min: 1, max: 300 } },
        }),
        date: fields.date({
          label: "Date",
          defaultValue: { kind: "today" },
        }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value,
        }),
        draft: fields.checkbox({
          label: "Draft",
          description:
            "When checked, the post is hidden from the blog index and sitemap.",
          defaultValue: false,
        }),
        faq: fields.array(
          fields.object({
            question: fields.text({
              label: "Question",
              validation: { length: { min: 1 } },
            }),
            answer: fields.text({
              label: "Answer",
              multiline: true,
              validation: { length: { min: 1 } },
            }),
          }),
          {
            label: "FAQ",
            description:
              "Optional. When present, the post page emits FAQPage JSON-LD — big GEO/SEO value (LLMs and Google love citing FAQs).",
            itemLabel: (props) => props.fields.question.value || "New question",
          },
        ),
        content: fields.mdx({
          label: "Content",
          options: {
            image: {
              directory: "public/posts",
              publicPath: "/posts/",
            },
          },
        }),
      },
    }),
  },
});
