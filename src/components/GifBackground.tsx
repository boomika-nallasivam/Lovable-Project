interface GifBackgroundProps {
  src: string;
  opacity?: number;
}

export function GifBackground({ src, opacity = 0.85 }: GifBackgroundProps) {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <img
        src={src}
        alt=""
        className="absolute min-h-full min-w-full object-cover"
        style={{ opacity }}
      />
      <div className="absolute inset-0 bg-background/30" />
    </div>
  );
}
