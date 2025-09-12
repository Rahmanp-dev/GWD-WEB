import SmoothCursor from "@/components/ui/smooth-cursor";

export default function SmoothCursorDemo() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-900 text-white">
      <span className="hidden md:block">Move your mouse around to see the smooth cursor</span>
      <span className="block md:hidden">Tap anywhere to see the cursor</span>
      <SmoothCursor />
    </div>
  );
}
