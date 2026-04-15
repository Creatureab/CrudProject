import moment from "moment";
import { Heart, Pencil, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { deletePostAsync, likePostAsync } from "@/redux/postsSlice";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const Post = ({ post, setCurrentId, isSelected }) => {
  const dispatch = useDispatch();
  const tags = Array.isArray(post.tags)
    ? post.tags.filter(Boolean)
    : String(post.tags || "")
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this memory?")) {
      dispatch(deletePostAsync(post._id));
    }
  };

  const handleLike = () => {
    dispatch(likePostAsync(post._id));
  };

  return (
    <Card
      className={`overflow-hidden border border-white/70 bg-white/85 shadow-[0_16px_45px_rgba(15,23,42,0.08)] transition-transform duration-200 hover:-translate-y-1 ${
        isSelected ? "ring-2 ring-primary/30" : ""
      }`}
    >
      <div className="relative">
        {post.selectedFile ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.selectedFile}
            alt={post.title || "Memory cover"}
            className="aspect-[4/3] w-full object-cover"
          />
        ) : (
          <div
            className="aspect-[4/3] w-full bg-[linear-gradient(135deg,#123456,#d66d4d)]"
            aria-hidden
          />
        )}
        <div
          className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/15 to-transparent"
          aria-hidden
        />
        <div className="absolute inset-x-0 bottom-0 space-y-2 p-4 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/75">
            {post.creator || "Unknown creator"}
          </p>
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-xl font-semibold leading-tight">
              {post.title || "Untitled memory"}
            </h3>
            <span className="text-xs whitespace-nowrap text-white/70">
              {post.createdAt ? moment(post.createdAt).fromNow() : "Just now"}
            </span>
          </div>
        </div>
      </div>

      <CardContent className="space-y-4 pt-4">
        <p className="line-clamp-4 text-sm leading-6 text-slate-700">
          {post.message || "No description added for this memory yet."}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.length ? (
            tags.map((tag) => (
              <span
                key={`${post._id}-${tag}`}
                className="rounded-full border border-primary/10 bg-primary/8 px-3 py-1 text-xs font-medium text-primary"
              >
                #{tag}
              </span>
            ))
          ) : (
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
              No tags
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="justify-between gap-2 border-slate-200/80 bg-slate-50/75">
        <button
          type="button"
          onClick={handleLike}
          className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-white hover:text-primary"
        >
          <Heart className="h-4 w-4" />
          <span>{post.likeCount ? `Like (${post.likeCount})` : "Like"}</span>
        </button>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCurrentId(post._id)}
            className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-white hover:text-primary"
          >
            <Pencil className="h-4 w-4" />
            <span>Edit</span>
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-white hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
            <span>Delete</span>
          </button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Post;
