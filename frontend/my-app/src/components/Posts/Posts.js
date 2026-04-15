import Post from "./Post/Post";
import { useSelector } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";

const Posts = ({ currentId, setCurrentId }) => {
  const posts = useSelector((state) => state.posts || []);
  const orderedPosts = [...posts].sort(
    (firstPost, secondPost) =>
      new Date(secondPost.createdAt || 0).getTime() -
      new Date(firstPost.createdAt || 0).getTime()
  );

  return (
    <section className="space-y-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
            Timeline
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
            {orderedPosts.length ? `${orderedPosts.length} saved memories` : "No memories yet"}
          </h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-slate-600">
          Recent entries stay at the top. Pick any memory to edit it from the form panel.
        </p>
      </div>

      {orderedPosts.length ? (
        <div className="grid gap-5 md:grid-cols-2">
          {orderedPosts.map((post) => (
            <Post
              key={post._id}
              post={post}
              setCurrentId={setCurrentId}
              isSelected={currentId === post._id}
            />
          ))}
        </div>
      ) : (
        <Card className="border border-dashed border-slate-300/80 bg-white/65 shadow-none">
          <CardContent className="space-y-3 py-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
              Empty state
            </p>
            <h3 className="text-2xl font-semibold text-slate-950">
              Start with your first memory
            </h3>
            <p className="mx-auto max-w-lg text-sm leading-6 text-slate-600">
              Add a title, describe the moment, attach a photo, and save it. The new memory
              will appear here immediately.
            </p>
          </CardContent>
        </Card>
      )}
    </section>
  );
};

export default Posts;
