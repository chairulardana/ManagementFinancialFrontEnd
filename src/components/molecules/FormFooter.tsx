import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";

export const ContactForm = ({ onClose }: { onClose: () => void }) => (
  <Card className="max-w-md mx-auto bg-blue-900 border border-blue-700 relative">
    <button
      onClick={onClose}
      className="absolute top-3 right-3 text-blue-300 hover:text-white transition-colors"
      aria-label="Close form"
    >
      <X size={20} />
    </button>

    <CardHeader>
      <CardTitle className="text-center text-white">Berikan Saran</CardTitle>
    </CardHeader>
    
    <CardContent>
      <form
        action="https://formspree.io/f/xyzjabll"
        method="POST"
        className="space-y-4"
      >
        <div>
          <input
            type="email"
            name="email"
            required
            placeholder="Email Anda"
            className="w-full p-3 bg-blue-800 border border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 text-base text-white placeholder-blue-400"
          />
        </div>

        <div>
          <input
            type="text"
            name="subject"
            placeholder="Subjek Pesan"
            className="w-full p-3 bg-blue-800 border border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 text-base text-white placeholder-blue-400"
          />
        </div>

        <div>
          <textarea
            name="message"
            required
            rows={4}
            placeholder="Tulis pesan Anda..."
            className="w-full p-3 bg-blue-800 border border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 text-base resize-none text-white placeholder-blue-400"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white py-3 rounded-lg font-medium text-base transition duration-200 shadow-lg"
        >
          Kirim Pesan
        </button>
      </form>
    </CardContent>
  </Card>
);