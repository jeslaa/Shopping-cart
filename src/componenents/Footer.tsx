import '../styles/footer.scss'

type Props = {
  viewCart: boolean
}

// Defining the Footer component
const Footer = ({ viewCart }: Props) => {

  const pageContent = viewCart
  ? <p className="year"></p>
  : (
    <>
      
    </>
  )

  const content = (
    <footer className="footer">
      {pageContent}
    </footer>
  )
  return content // Return the footer content
}

export default Footer