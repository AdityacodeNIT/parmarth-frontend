export default function ProductGallery({ image, name }) {
  return (
    <div className="relative flex justify-center aspect-square max-w-[420px] mx-auto">
      <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-violet-500/10 via-transparent to-cyan-500/10 blur-2xl" />

      <img
        src={image || "/placeholder.png"}
        alt={name}
        className="
          relative
          w-full h-full
          object-contain
          transition-transform duration-500
          hover:scale-[1.04]
        "
      />
    </div>
  );
}
