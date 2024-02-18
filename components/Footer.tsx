import Container from "@/components/Container";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="bg-black py-2 text-white/40">
      <Container className="flex justify-between gap-x-4">
        <span>Liana © {currentYear}</span>
        <a href="mailto:info@liana.com">info@liana.com</a>
      </Container>
    </div>
  );
}
