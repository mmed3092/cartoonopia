import loaderIMG from "../assets/loading.png"

export default function LoadingIMG({ className }: { className?: string }) {
  return (
    <img
      className={`animate-spin ${className}`}
      src={loaderIMG}
      alt="Loading"
    />
  )
}
