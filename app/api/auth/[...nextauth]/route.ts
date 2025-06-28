// app/api/auth/[...nextauth]/route.ts (ou .js)
import NextAuth from "next-auth"
import { authOptions } from "@/app/_lib/auth" // Verifique se este caminho está correto

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
