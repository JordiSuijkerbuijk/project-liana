import BigImage from '@/components/chemistry/BigImage';
import Container from '@/components/chemistry/Container';

export default function Clipping(){
  return <section className="relative pt-[200vh]">
    <BigImage src={"https://images.pexels.com/photos/1209521/pexels-photo-1209521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}/>
    <Container className="grid grid-cols-12 gap-x-10">
      <div className="col-span-4">
        <h1 className="text-white text-3xl">This is the title of my fake section</h1>
      </div>
      <div className="col-span-4 big-image-target h-[80vh]">
        {/* <img src={'https://images.pexels.com/photos/1209521/pexels-photo-1209521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'} alt="" width="1109" height="739" className="big-image-target" /> */}
      </div>
      <div className="flex flex-col justify-between col-span-4">
        <p>If you read this you are very cool</p>
        <div className="p-10 h-[20%] bg-white rounded-3xl">
          <h2 className="text-purple text-xl">Cool box</h2>
          <p>Very interesting paragraph</p>
        </div>
      </div>
    </Container>
  </section>
}
