// src/app/loading.js
export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen p-10 bg-black text-white">
      <div className="text-center">
        <div className="text-lg font-semibold mb-4">Loading...</div>
        {/* //Loader */}
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white mx-auto" />
      </div>
    </div>
  );
}
