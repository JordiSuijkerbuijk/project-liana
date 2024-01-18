import clsx from 'clsx';
import Container from "./Container";

const items = [
  {
    title: "Kip Kerrie",
    subtitle: "By my mom",
    image: "https://images.pexels.com/photos/10411161/pexels-photo-10411161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    image2: "https://images.pexels.com/photos/440162/pexels-photo-440162.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    title: "Nasi Goreng",
    subtitle: "By my mom",
    image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    image2: "https://images.pexels.com/photos/6394571/pexels-photo-6394571.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    title: "A filthy burger",
    subtitle: "By Diegos",
    image: "https://images.pexels.com/photos/37347/office-sitting-room-executive-sitting.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    image2: "https://images.pexels.com/photos/827518/pexels-photo-827518.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    title: "Please",
    subtitle: "Mom make me some dinner",
    image: "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    image2: "https://images.pexels.com/photos/2632292/pexels-photo-2632292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  }
]

export default function CoolSection(){
  return (
    <section>
      {items.map((item, key) => {
        const isFirstItem = key === 0;
        const isLastItem = key === items.length - 1;
        const isMiddleItem = !isFirstItem && !isLastItem;

        return(
        <div className={clsx("relative -mb-[100vh] [contain:paint]", isLastItem ? "h-[100vh]" : "h-[200vh]")} key={key}>
        <div className="absolute sticky top-0 w-full h-screen" key={key}>
          <img src={item.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/30 w-full h-full" />
        </div>
        <div className={clsx("absolute z-10 w-full", isFirstItem && "h-[200vh] top-0", isMiddleItem && "h-[300vh] top-[-100vh]", isLastItem && "h-[200vh] top-[-100vh]")}>
        <Container className="sticky top-0 h-[100vh] flex items-center justify-between relative z-10">
          <div className="flex flex-col gap-y-4">
            <h2 className="font-bold text-8xl">{item.title}</h2>
            <span>{item.subtitle}</span>
          </div>
            <div className="aspect-[1/1.25] w-[25%]">
              <img src={item.image2} alt="" className="w-full h-full object-fit"/>
            </div>
          </Container>
        </div>
        </div>
      )}
      )}
      <p>Important stuff!</p>
      <ul>
        <li>
          It's important that you are hiding part of the previous section, but maybe more importantly that you are going to be showing what will be there on the next section at the 'end' of scrolling. 
        </li>
      </ul>
    </section>
  );
}