import ScrollStopBigImage from "@/components/chemistry/ScrollStopBigImage";
import Container from	"@/components/chemistry/Container";

export default function ClippingWithScrollStop(){
  return(<><section className="relative">
    <ScrollStopBigImage src={"https://images.pexels.com/photos/1209521/pexels-photo-1209521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}/>
    <Container className="grid grid-cols-12 gap-x-10 bg-[#4D7C9C]">
      <div className="col-span-4">
        <h1 className="text-3xl text-white">This is the title of my fake section</h1>
      </div>
      <div className="col-span-4 big-image-target h-[80vh]">
        {/* <img src={'https://images.pexels.com/photos/1209521/pexels-photo-1209521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'} alt="" width="1109" height="739" className="big-image-target" /> */}
      </div>
      <div className="flex flex-col justify-between col-span-4">
        <p>If you read this you are very cool</p>
        <div className="p-10 h-[20%] bg-white rounded-3xl">
          <h2 className="text-xl text-purple">Cool box</h2>
          <p>Very interesting paragraph</p>
        </div>
      </div>
    </Container>
  </section>
    <span>Things to consider:</span>
  <ul>
    <li>You are stopping people from scrolling to content they might know where to find</li>
    <li>How do you handle reversing the animation? Do you ever go back to the initial state? If so how/when?</li>
    <li>What do you do if your initial image is on top of other content? Do you still 'force' a minimum section height?</li>
    <li>To Calculate the values for the timeline, you now have to keep in mind the difference in height between 100vh and the target size.</li>
    <li>You can now control the easing of the animation better</li>
  </ul>
  </>)
}
  