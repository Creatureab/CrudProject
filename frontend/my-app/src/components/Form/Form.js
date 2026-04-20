import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createPostAsync, updatePostAsync } from "../../redux/postsSlice";

const emptyPost = {
  creator: "",
  title: "",
  message: "",
  tags: [],
  selectedFile: "",
};

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState(emptyPost);
  const [tagsInput, setTagsInput] = useState("");
  const [formError, setFormError] = useState("");
  const post = useSelector((state) =>
    currentId ? state.posts.find((memory) => memory._id === currentId) : null
  );
  const dispatch = useDispatch();
  const isEditing = Boolean(currentId && post);

  useEffect(() => {
    if (currentId && !post) {
      setCurrentId(null);
      setPostData(emptyPost);
      setTagsInput("");
      setFormError("");
      return;
    }

    if (post) {
      const normalizedTags = Array.isArray(post.tags)
        ? post.tags.filter(Boolean)
        : String(post.tags || "")
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean);

      setPostData({
        creator: post.creator || "",
        title: post.title || "",
        message: post.message || "",
        tags: normalizedTags,
        selectedFile: post.selectedFile || "",
      });
      setTagsInput(normalizedTags.join(", "));
      setFormError("");
      return;
    }

    setPostData(emptyPost);
    setTagsInput("");
    setFormError("");
  }, [currentId, post, setCurrentId]);

  const clearForm = () => {
    setCurrentId(null);
    setPostData(emptyPost);
    setTagsInput("");
    setFormError("");
  };

  const updateField = (field, value) => {
    setFormError("");
    setPostData((currentPost) => ({
      ...currentPost,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      creator: postData.creator.trim(),
      title: postData.title.trim(),
      message: postData.message.trim(),
      tags: tagsInput
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      selectedFile: postData.selectedFile,
    };

    if (!payload.creator || !payload.title || !payload.message) {
      setFormError("Creator, title, and message are required.");
      return;
    }

    if (isEditing) {
      await dispatch(updatePostAsync({ id: currentId, post: payload }));
    } else {
      await dispatch(createPostAsync(payload));
    }

    clearForm();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormError("");
      setPostData((currentPost) => ({
        ...currentPost,
        selectedFile: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <Card className="sticky top-6 w-full border border-white/70 bg-white/88 shadow-[0_18px_55px_rgba(15,23,42,0.12)] backdrop-blur">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-slate-950">
          {isEditing ? `Editing "${post.title}"` : "Create a memory"}
        </CardTitle>
        <CardDescription className="leading-6 text-slate-600">
          Add the person, moment, story, tags, and an optional image. You can switch between
          create and edit mode from the timeline.
        </CardDescription>
      </CardHeader>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {formError ? (
            <div className="rounded-2xl border border-destructive/20 bg-destructive/8 px-4 py-3 text-sm font-medium text-destructive">
              {formError}
            </div>
          ) : null}
          <div className="space-y-2">
            <label htmlFor="creator" className="text-sm font-medium leading-none text-slate-700">
              Creator
            </label>
            <input
              id="creator"
              name="creator"
              placeholder="Who was part of this moment?"
              className="flex h-12 w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm text-slate-900 shadow-sm transition-colors placeholder:text-slate-400 focus:border-primary/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/15"
              value={postData.creator}
              onChange={(e) => updateField("creator", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium leading-none text-slate-700">
              Title
            </label>
            <input
              id="title"
              name="title"
              placeholder="Give the memory a short name"
              className="flex h-12 w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm text-slate-900 shadow-sm transition-colors placeholder:text-slate-400 focus:border-primary/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/15"
              value={postData.title}
              onChange={(e) => updateField("title", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium leading-none text-slate-700">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="What happened, and why does it matter?"
              className="flex min-h-[140px] w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm text-slate-900 shadow-sm transition-colors placeholder:text-slate-400 focus:border-primary/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/15"
              value={postData.message}
              onChange={(e) => updateField("message", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="tags" className="text-sm font-medium leading-none text-slate-700">
              Tags
            </label>
            <input
              id="tags"
              name="tags"
              placeholder="travel, family, celebration"
              className="flex h-12 w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm text-slate-900 shadow-sm transition-colors placeholder:text-slate-400 focus:border-primary/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/15"
              value={tagsInput}
              onChange={(e) => {
                setTagsInput(e.target.value);
                setFormError("");
              }}
            />
          </div>
          <div className="space-y-2 mb-5">
            <label htmlFor="file-upload" className="text-sm font-medium leading-none text-slate-700">
              Upload image
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="block w-full text-sm text-slate-500 file:mr-4 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-primary-foreground hover:file:bg-primary/90"
            />
            {postData.selectedFile && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={postData.selectedFile}
                alt="Selected memory preview"
                className="h-40 w-full rounded-2xl object-cover"
              />
            )}
          </div>
        </CardContent>
        <div className="flex flex-col gap-3 p-6 pt-0">
          <button
            type="submit"
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {isEditing ? "Update memory" : "Save memory"}
          </button>
          <button
            type="button"
            onClick={clearForm}
            className="inline-flex h-12 w-full items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            Clear form
          </button>
        </div>
      </form>
    </Card>
  );
};

export default Form;
