interface VideoBackgroundProps {
  src: string;
  opacity?: number;
}

export function VideoBackground({ src, opacity = 0.8 }: VideoBackgroundProps) {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute min-h-full min-w-full object-cover"
        style={{ opacity }}
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-background/40" />
    </div>
  );
}
