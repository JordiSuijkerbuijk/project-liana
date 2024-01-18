import clsx from 'clsx';
import Container from "./Container";
import CoolSectionItem from './CoolSectionItem';

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
        <CoolSectionItem {...item} isFirstItem={isFirstItem} isLastItem={isLastItem} isMiddleItem={isMiddleItem} key={key} />
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