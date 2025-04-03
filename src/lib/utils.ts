import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
// Frasi statistiche ironiche per SPRNLTT
export const funFacts: string[] = [
  "Hai più probabilità di essere morso da uno squalo in una piscina.",
  "C'è più possibilità che ti cada un satellite in testa.",
  "È più facile trovare un Picasso in soffitta.",
  "Hai più possibilità di vincere se giochi i numeri della tua ex.",
  "Anche il Bambino Bendato ha perso la speranza.",
  "Potresti vivere 300 vite e non vedere mai un 6.",
  "Hai più possibilità di diventare Papa. Due volte.",
  "Il sistema non è truccato. È solo disperato.",
	"Il barista ha più possibilità di vincere servendoti un caffè.",
  "Hai più probabilità di rincontrare il tuo primo amore… in Groenlandia.",
  "Hai più chance se giochi mentre piove e ascolti Chopin.",
  "Non preoccuparti, anche la speranza è sopravvalutata."
]

export function getRandomFunFact(): string {
  return funFacts[Math.floor(Math.random() * funFacts.length)]
}
