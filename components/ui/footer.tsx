interface FooterProps {
  children: React.ReactNode
}

const Footer = ({ children }: FooterProps) => {
  return (
    <footer className="w-full">
      {children}
    </footer>
  )
}

export default Footer;