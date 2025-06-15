"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Share2, Briefcase, Settings, User } from "lucide-react"

export default function QRBankingHub() {
  const [notification, setNotification] = useState("")

  const showNotification = (message: string) => {
    setNotification(message)
    setTimeout(() => setNotification(""), 3000)
  }

  const downloadQR = (type: string) => {
    // Simula la descarga - aquí pondrías la lógica real
    showNotification(`Descargando QR de ${type}...`)

    // Para implementar la descarga real, descomenta esto:
    // const link = document.createElement('a')
    // link.download = `qr-${type}.png`
    // link.href = '/path/to/your/qr-image.png' // Ruta a tu imagen QR
    // link.click()
  }

  const shareQR = async (type: string) => {
    const url = window.location.href
    const text = `Código QR para ${type} - Pagos Bancarios`

    if (navigator.share) {
      try {
        await navigator.share({
          title: "QR Banking Hub",
          text: text,
          url: url,
        })
      } catch (err) {
        fallbackShare(url, text)
      }
    } else {
      fallbackShare(url, text)
    }
  }

  const fallbackShare = (url: string, text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${text}\n${url}`).then(() => {
        showNotification("Enlace copiado al portapapeles")
      })
    }
  }

  const qrData = [
    {
      id: "honorarios",
      title: "Honorarios Laborales",
      description: "Para pagos de servicios profesionales, consultorías técnicas y desarrollo de software.",
      icon: Briefcase,
      color: "border-red-500",
      bgColor: "bg-red-500",
      accentColor: "bg-red-50",
    },
    {
      id: "servicios",
      title: "Servicios Técnicos",
      description: "Para pagos de servicios de soporte técnico, mantenimiento de sistemas y proyectos IT.",
      icon: Settings,
      color: "border-orange-500",
      bgColor: "bg-orange-500",
      accentColor: "bg-orange-50",
    },
    {
      id: "personales",
      title: "Pagos Personales",
      description: "Para transferencias personales, reembolsos y pagos entre amigos y familiares.",
      icon: User,
      color: "border-green-500",
      bgColor: "bg-green-500",
      accentColor: "bg-green-50",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-900 text-white">
        <div className="container mx-auto px-6 py-16 text-center">
          <div className="relative">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">🏦 QR Banking Hub</h1>
            <p className="text-xl mb-2 opacity-90">Códigos QR para Pagos Bancarios</p>
            <p className="text-sm opacity-70 italic">Ingeniero de Sistemas - Soluciones de Pago Digital</p>

            {/* Indicador de estado */}
            <div className="absolute top-0 right-0 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {qrData.map((qr, index) => {
            const IconComponent = qr.icon
            return (
              <Card
                key={qr.id}
                className={`relative overflow-hidden border-t-4 ${qr.color} hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white/95 backdrop-blur-sm`}
                style={{
                  animationDelay: `${index * 200}ms`,
                }}
              >
                {/* Status indicator */}
                <div className="absolute top-4 right-4 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>

                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-lg ${qr.bgColor} text-white`}>
                      <IconComponent size={24} />
                    </div>
                    <CardTitle className="text-xl font-semibold text-slate-800">{qr.title}</CardTitle>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">{qr.description}</p>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* QR Code Placeholder */}
                  <div className={`${qr.accentColor} p-6 rounded-xl border-2 border-dashed border-slate-300`}>
                    <div className="w-48 h-48 mx-auto bg-white border-2 border-slate-200 rounded-lg flex items-center justify-center text-center">
                      <div className="text-slate-500 text-sm leading-relaxed">
                        <div className="text-4xl mb-2">📱</div>
                        Reemplaza con tu código QR de {qr.title}
                        <div className="text-xs mt-2 opacity-75">Formato: PNG 200x200px</div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button
                      onClick={() => downloadQR(qr.id)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Download size={16} className="mr-2" />
                      Descargar
                    </Button>
                    <Button
                      onClick={() => shareQR(qr.id)}
                      variant="outline"
                      className="flex-1 border-slate-300 hover:bg-slate-50"
                    >
                      <Share2 size={16} className="mr-2" />
                      Compartir
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-900 text-white">
        <div className="container mx-auto px-6 py-12 text-center">
          <p className="text-lg font-semibold mb-4">
            <strong>Ingeniero de Sistemas</strong> - Soluciones Digitales Profesionales
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {["HTML5", "CSS3", "JavaScript", "React", "Next.js", "Responsive Design"].map((tech) => (
              <span key={tech} className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium">
                {tech}
              </span>
            ))}
          </div>
          <p className="text-sm opacity-75">© 2024 - Todos los derechos reservados</p>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className="fixed top-6 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-in slide-in-from-right">
          ✅ {notification}
        </div>
      )}
    </div>
  )
}
