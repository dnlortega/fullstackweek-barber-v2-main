// _data/get-all-bookings.ts
"use server" // Indica que este código só será executado no lado do servidor.

import { db } from "../_lib/prisma" // Assumindo que 'db' é sua instância do Prisma Client.
// As importações de 'getServerSession' e 'authOptions' não são necessárias aqui,
// pois não estamos filtrando por usuário ou verificando a sessão para esta função específica.
// import { getServerSession } from "next-auth";
// import { authOptions } from "../_lib/auth";

export const getAllBookings = async () => {
  // Não precisamos da sessão do usuário aqui, pois queremos buscar TODOS os agendamentos,
  // independentemente de quem está logado ou se alguém está logado.
  // const session = await getServerSession(authOptions);
  // if (!session?.user) return []; // Esta linha é removida, pois não filtramos por usuário.

  try {
    return await db.booking.findMany({
      // **Atenção:** Removendo a cláusula 'where' para 'userId' e 'date'.
      // Agora, a consulta trará todos os agendamentos sem restrições de usuário ou data (passado/futuro).
      // Se você precisar de algum filtro (ex: apenas confirmados, apenas futuros), adicione-o aqui.
      // Exemplo de como ficaria para incluir filtros:
      // where: {
      //   status: "CONFIRMED", // Apenas agendamentos confirmados
      //   date: {
      //     gte: new Date(), // Apenas agendamentos futuros ou de hoje
      //   },
      // },
      include: {
        service: {
          // Inclui os detalhes do serviço associado a cada agendamento.
          include: {
            barbershop: true, // Inclui os detalhes da barbearia associada a cada serviço.
          },
        },
        user: true, // Inclui os detalhes do usuário que fez o agendamento. ESSENCIAL ao listar todos.
      },
      orderBy: {
        date: "asc", // Ordena os agendamentos pela data em ordem crescente (do mais antigo para o mais recente).
      },
    })
  } catch (error) {
    console.error("Erro ao buscar todos os agendamentos:", error)
    // Em caso de erro, retorna um array vazio para evitar quebrar a aplicação.
    return []
  }
}
