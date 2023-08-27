import Container from "@/components/Container";

export default function Typography() {
  return (
    <section className="py-36">
      <Container className="flex justify-center">
        <div className="flex flex-col gap-y-3">
          <h1 className="text-heading-1">This is a heading 1</h1>
          <h2 className="text-heading-2">This is a heading 2</h2>
          <h3 className="text-heading-3">This is a heading 3</h3>
          <h4 className="text-heading-4">This is a heading 4</h4>
          <h5 className="text-heading-5">This is a heading 5</h5>
          <p className="text-body">This is the body text</p>
          <p className="text-small-body">This is the small body text</p>
        </div>
      </Container>
    </section>
  );
}
