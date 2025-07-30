'use client';

export default function ChatSkeleton({ isUser = false }: { isUser?: boolean }) {
  return (
    <div
      className={`relative max-w-md p-2 rounded shadow text-sm animate-pulse ${
        isUser ? 'bg-blue-100 ml-auto' : 'bg-gray-200'
      }`}
    >

      {/* Text line 1 */}
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2" />

      {/* Text line 2 */}
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />

      {/* Copy button placeholder (invisible but reserves space) */}
      <div className="absolute top-1 right-1 p-1">
        <div className="w-4 h-4 bg-gray-400 rounded" />
      </div>

      {/* Timestamp skeleton */}
      <div className="mt-2 h-3 w-20 bg-gray-300 dark:bg-gray-700 rounded self-end ml-auto" />
    </div>
  );
}
