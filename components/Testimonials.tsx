import Image from "next/image";

type Variant = "light" | "dark" | "sand";
type Testimonial = { name: string; quote: string; variant: Variant; photo: string };

// Avaliações originais do Google (texto mantido sem edições).
// Trechos entre ** ** são apenas destacados em negrito.
// As fotos são de banco de imagens (Unsplash), ilustrativas.
const testimonials: Testimonial[] = [
  {
    name: "Maisa Quele",
    quote:
      "Estava em busca de **uma pediatra que me ouvisse**, que tivesse atenção as minhas preocupações como mãe , e com Dra Thais **encontrei esse olhar atento** ... Depois de 7 anos em busca de uma pediatra **atenciosa , responsável e humana** , encontrei ❤️🙏🏽",
    variant: "light",
    photo: "/stock/depoimento-1.jpg",
  },
  {
    name: "Leandro Bolivar",
    quote: "Atendimento excelente. Enfim, **uma pediatra que realmente dá atenção e examina o paciente com cuidado**.",
    variant: "dark",
    photo: "/stock/depoimento-2.jpg",
  },
  {
    name: "Miriam Felicio",
    quote:
      "Gostei muito da médica, **muito atenciosa, conversa bastante, tira todas as duvidas**, dá muitas dicas e **avalia toda a criança**. Eu fui para a primeira consulta de RN e eu amei porque pude tirar todas as minhas dúvidas e preocupações que toda mamãe tem, o que a gente quer e ficar tranquila e dra Thaís ajudou. **Recomendo!**",
    variant: "sand",
    photo: "/stock/depoimento-3.jpg",
  },
  {
    name: "Emanuela Dorea Carvalho",
    quote:
      "Dra Thais é **muito atenciosa e acolhedora**, um suporte essencial nos momentos de cuidado com o meu filho. Obrigada, Dra! Deus lhe abençoe!",
    variant: "light",
    photo: "/stock/depoimento-4.jpg",
  },
  {
    name: "Gleisiane Silva",
    quote:
      "A dra é maravilhosa! **Super atenciosa e tem muito conhecimento**. **Minha filha ficou bastante confortável** durante a consulta. Adoramos!",
    variant: "sand",
    photo: "/stock/depoimento-5.jpg",
  },
  {
    name: "Dani Silva",
    quote:
      "Dra Thaís Costa é uma médica maravilhosa e muito atenciosa. Impressiona pela **precisão, sensibilidade e pelo cuidado genuíno com a criança**. Profissional que **transmite segurança e confiança**. Deus te abençoe, Dra. Gratidão 🙏🏼",
    variant: "light",
    photo: "/stock/depoimento-6.jpg",
  },
  {
    name: "Marcia Duarte",
    quote: "Excelente atendimento da Dra. Thais Costa. **Atendimento humano, escuta ativa, tratamento extremamente cuidadoso.**",
    variant: "dark",
    photo: "/stock/depoimento-7.jpg",
  },
  {
    name: "Natiele Mendes",
    quote: "Dr Thais é maravilhosa, **muito atenciosa, bem precisa**. Uma profissional excelente 👏👏.",
    variant: "sand",
    photo: "/stock/depoimento-8.jpg",
  },
];

// Estilos por variante (paleta do projeto)
const tones = {
  light: { box: "bg-white", text: "text-[#174B4B]/90", strong: "text-[#174B4B]", name: "text-[#174B4B]", ring: "ring-[#BD7475]/40" },
  dark: { box: "bg-[#174B4B]", text: "text-[#F0E3D0]", strong: "text-white", name: "text-[#E3AFB0]", ring: "ring-[#E3AFB0]/50" },
  sand: { box: "bg-[#F0E3D0]", text: "text-[#174B4B]", strong: "text-[#0F3A3A]", name: "text-[#8A4546]", ring: "ring-[#BD7475]/40" },
} as const;

function Quote({ text, strongClass }: { text: string; strongClass: string }) {
  return (
    <>
      {text.split("**").map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className={`font-bold ${strongClass}`}>
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}

function Card({ t }: { t: Testimonial }) {
  const tone = tones[t.variant];
  // Depoimentos longos usam fonte menor para caber na altura fixa do card
  const size = t.quote.length > 200 ? "text-base sm:text-lg" : "text-xl sm:text-2xl";
  return (
    <div
      className={`relative mx-1 flex h-[28rem] w-72 shrink-0 flex-col justify-between overflow-hidden rounded-3xl border border-[#174B4B]/10 p-6 shadow-[0_20px_40px_-30px_rgba(23,75,75,0.4)] sm:mx-2 sm:h-[30rem] sm:w-[23rem] sm:p-10 ${tone.box}`}
    >
      <blockquote className={`relative overflow-hidden leading-relaxed ${tone.text} ${size}`}>
        &ldquo;
        <Quote text={t.quote} strongClass={tone.strong} />
        &rdquo;
      </blockquote>
      <div className="relative mt-4 flex items-center gap-3">
        <Image
          src={t.photo}
          alt=""
          width={80}
          height={80}
          className={`h-12 w-12 shrink-0 rounded-full object-cover ring-2 ${tone.ring}`}
        />
        <p className={`text-base font-semibold ${tone.name}`}>{t.name}</p>
      </div>
    </div>
  );
}

// Fileira única: duplica a lista para o loop (-50%) ser contínuo; a cópia fica oculta aos leitores de tela
export default function Testimonials() {
  return (
    <div className="marquee-row relative flex overflow-hidden">
      <div className="marquee-track flex">
        {testimonials.map((t) => (
          <Card key={t.name} t={t} />
        ))}
        <div className="flex" aria-hidden>
          {testimonials.map((t) => (
            <Card key={t.name} t={t} />
          ))}
        </div>
      </div>
    </div>
  );
}
