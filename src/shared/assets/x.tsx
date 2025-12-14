export default function X({
  className = "",
  onClick
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none" className={className} onClick={onClick}>
      <path d="M19.5 1.5L1.5 19.5" stroke="#CCCCCC" stroke-width="3" stroke-linecap="round" />
      <path d="M1.5 1.5L19.5 19.5" stroke="#CCCCCC" stroke-width="3" stroke-linecap="round" />
    </svg>
  )
}



