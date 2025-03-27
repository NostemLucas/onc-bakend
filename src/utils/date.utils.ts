export const DateUtil = {
  // Formatear fecha para mostrar
  formatDate(date: Date | string, format: "short" | "long" = "short"): string {
    const parsedDate = typeof date === "string" ? new Date(date) : date;

    if (format === "short") {
      return new Intl.DateTimeFormat("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(parsedDate);
    }

    return new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(parsedDate);
  },

  // Calcular tiempo transcurrido
  timeAgo(date: Date | string): string {
    const parsedDate = typeof date === "string" ? new Date(date) : date;
    const now = new Date();
    const diffMs = now.getTime() - parsedDate.getTime();

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `Hace ${days} día${days !== 1 ? "s" : ""}`;
    if (hours > 0) return `Hace ${hours} hora${hours !== 1 ? "s" : ""}`;
    if (minutes > 0) return `Hace ${minutes} minuto${minutes !== 1 ? "s" : ""}`;
    return "Justo ahora";
  },
};
