import { Card, CardContent } from "./ui/card"

const Footer = () => {
  const currentYear = new Date().getFullYear() // Obtém o ano atual

  return (
    <footer>
      <Card>
        <CardContent className="px-5 py-6">
          <p className="text-sm text-gray-400">
            © {currentYear} Copyright{" "}
            <span className="font-bold">Daniel Ortega Pereira</span>
          </p>
        </CardContent>
      </Card>
    </footer>
  )
}

export default Footer
