export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center w-full h-full p-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white/80"></div>
    </div>
  );
}
