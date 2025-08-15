import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  index?: number;
  totalItems?: number;
};

function StackContainer({
  children,
  className,
  index = 0,
}: Props) {
  const zIndex = index + 1;

  const isBlackBackground = className?.includes("bg-black");

  const gridColor = isBlackBackground
    ? "rgba(255, 255, 255, 0.1)"
    : "rgba(0, 0, 0, 0.05)";
  const gridStyle = {
    backgroundImage: `
      linear-gradient(${gridColor} 1px, transparent 1px),
      linear-gradient(90deg, ${gridColor} 1px, transparent 1px)
    `,
    backgroundSize: "60px 60px",
  };

  return (
    <div
      style={{
        zIndex,
        ...gridStyle,
      }}
      className={cn(
        "relative flex flex-col items-center justify-center h-screen w-full snap-start",
        className
      )}
    >
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
}

export default StackContainer;
