import { HTMLAttributes } from "react"

interface SectionProps {
  id: HTMLAttributes<HTMLElement>["id"]
  children: React.ReactNode
  className?: HTMLAttributes<HTMLElement>["className"]
}

const Section = ({ children, id, className }: SectionProps) => {

  return (
    <section id={id} className={`scroll-mt-20 mt-4 ${className}`}>
      {children}
    </section>
  )
}

export default Section;
