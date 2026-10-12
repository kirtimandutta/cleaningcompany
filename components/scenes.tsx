export type SceneKind = "tile" | "hob" | "sofa";

export function MaterialScene({ kind, state }: { kind: SceneKind; state: "before" | "after" }) {
  if (kind === "hob") return <Hob state={state} />;
  if (kind === "sofa") return <Sofa state={state} />;
  return <Tile state={state} />;
}

function Tile({ state }: { state: "before" | "after" }) {
  const dirty = state === "before";
  return (
    <div className={`absolute inset-0 ${dirty ? "bg-[#241e18]" : "bg-[#e7e1d4]"}`}>
      <div
        className="absolute left-1/2 top-[6%] h-[160%] w-[190%]"
        style={{
          transform: "translateX(-50%) perspective(780px) rotateX(63deg)",
          backgroundColor: dirty ? "#6a5a49" : "#f6f2ea",
          backgroundImage: dirty
            ? "linear-gradient(rgba(28,20,14,0.78) 2px, transparent 2px), linear-gradient(90deg, rgba(28,20,14,0.78) 2px, transparent 2px), radial-gradient(circle at 28% 38%, rgba(42,24,12,0.9), transparent 24%), radial-gradient(circle at 70% 58%, rgba(92,46,16,0.75), transparent 20%), radial-gradient(circle at 46% 76%, rgba(18,14,10,0.6), transparent 26%)"
            : "linear-gradient(rgba(176,164,144,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(176,164,144,0.55) 1px, transparent 1px), radial-gradient(ellipse at 18% 24%, rgba(255,255,255,0.95), transparent 36%), radial-gradient(ellipse at 72% 64%, rgba(210,198,176,0.55), transparent 34%)",
          backgroundSize: "88px 88px, 88px 88px, auto, auto, auto",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25" />
    </div>
  );
}

function Hob({ state }: { state: "before" | "after" }) {
  const dirty = state === "before";
  return (
    <div className="absolute inset-0 bg-[#161311]">
      <div className="absolute inset-x-0 top-0 h-[34%] bg-gradient-to-b from-[#3d342c] to-[#161311]" />
      <div className="absolute inset-x-[7%] top-[30%] h-3 rounded-full bg-black/40 blur-sm" />
      <div
        className={`absolute inset-x-[8%] top-[34%] bottom-[9%] overflow-hidden rounded-[28px] border ${
          dirty ? "border-amber-900/40 bg-[#100e0c]" : "border-white/15 bg-[#070707]"
        }`}
      >
        <div
          className="absolute inset-0"
          style={{
            background: dirty
              ? "radial-gradient(circle at 24% 36%, rgba(140,78,18,0.7), transparent 26%), radial-gradient(circle at 72% 62%, rgba(90,48,12,0.8), transparent 28%), linear-gradient(160deg, #2c241b, #090807 64%)"
              : "linear-gradient(150deg, rgba(255,255,255,0.2), transparent 30%), radial-gradient(circle at 84% 0%, rgba(16,185,129,0.2), transparent 34%), linear-gradient(165deg, #2c2c2c, #040404 60%)",
          }}
        />
        <div className="absolute inset-[10%] grid grid-cols-2 grid-rows-2 gap-[8%]">
          {Array.from({ length: 4 }).map((_, index) => (
            <span
              key={index}
              className="rounded-full border-2"
              style={{ borderColor: dirty ? "rgba(146,96,42,0.85)" : "rgba(255,255,255,0.62)" }}
            />
          ))}
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
    </div>
  );
}

function Sofa({ state }: { state: "before" | "after" }) {
  const dirty = state === "before";
  return (
    <div className={`absolute inset-0 ${dirty ? "bg-[#cbb79d]" : "bg-[#f3ecdf]"}`}>
      <div className="absolute inset-x-0 bottom-0 h-[28%] bg-[#b7a48b]/70" />
      <div
        className="absolute inset-x-[8%] top-[20%] bottom-[12%] rounded-[34px]"
        style={{
          background: dirty ? "#8b7262" : "#fbf7f1",
          boxShadow: "0 28px 50px rgba(40, 28, 18, 0.18)",
        }}
      />
      <div
        className="absolute top-[24%] right-[12%] left-[12%] h-[30%] rounded-[24px]"
        style={{ background: dirty ? "#7a6354" : "#fffdf9" }}
      />
      <div className="absolute right-[14%] bottom-[20%] left-[14%] grid grid-cols-2 gap-3">
        <span className="h-16 rounded-[20px]" style={{ background: dirty ? "#6d5648" : "#f1ebe2" }} />
        <span className="h-16 rounded-[20px]" style={{ background: dirty ? "#645043" : "#f7f2ea" }} />
      </div>
      {dirty ? (
        <span className="absolute top-[46%] left-[20%] h-20 w-28 rounded-full bg-[#3f2a20]/55 blur-md" />
      ) : (
        <span className="absolute top-[28%] right-[16%] h-14 w-14 rounded-full bg-[#10B981]/15" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/10" />
    </div>
  );
}
