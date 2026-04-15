import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import memories from "./image/memories.png";
import Image from "next/image";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import { fetchPosts } from "./redux/postsSlice";

const App = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts || []);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const selectedPost = posts.find((post) => post._id === currentId);

  return (
    <main className="relative">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8">
        <section className="grid gap-6 overflow-hidden rounded-[2rem] border border-white/60 bg-white/75 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur md:p-8 xl:grid-cols-[1.4fr_0.9fr]">
          <div className="space-y-5">
            <span className="inline-flex w-fit rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
              Memory Journal
            </span>
            <div className="space-y-3">
              <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                Write the moments you do not want to lose.
              </h1>
              <p className="max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                Keep a lightweight record of trips, milestones, and small wins. Create a
                memory, attach a photo, and update it whenever the story changes.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Total Memories
                </p>
                <p className="mt-2 text-3xl font-semibold text-slate-950">{posts.length}</p>
              </div>
              <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Active Mode
                </p>
                <p className="mt-2 text-lg font-semibold text-slate-950">
                  {selectedPost ? "Editing" : "Creating"}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Selected Memory
                </p>
                <p className="mt-2 text-lg font-semibold text-slate-950">
                  {selectedPost?.title || "None"}
                </p>
              </div>
            </div>
          </div>
          <div className="relative isolate flex items-center justify-center overflow-hidden rounded-[1.75rem] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.9),_rgba(255,255,255,0.15)_50%),linear-gradient(135deg,#103a5d,#d66d4d)] p-8">
            <div className="absolute inset-6 rounded-[1.5rem] border border-white/20" aria-hidden />
            <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/20 blur-3xl" aria-hidden />
            <div className="absolute -bottom-10 -left-8 h-40 w-40 rounded-full bg-amber-200/30 blur-3xl" aria-hidden />
            <div className="relative text-center text-white">
              <Image
                src={memories}
                alt="Memories illustration"
                width={180}
                height={180}
                className="mx-auto h-auto w-40 object-contain drop-shadow-2xl sm:w-48"
                priority
              />
              <p className="mt-5 text-sm uppercase tracking-[0.32em] text-white/70">
                Personal archive
              </p>
              <p className="mt-3 max-w-sm text-base leading-7 text-white/85">
                Browse the latest memories on the left and keep the editor pinned on the right.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,420px)]">
          <Posts currentId={currentId} setCurrentId={setCurrentId} />
          <Form currentId={currentId} setCurrentId={setCurrentId} />
        </section>
      </div>
    </main>
  );
};

export default App;
