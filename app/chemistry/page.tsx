import Clipping from '@/components/chemistry/Clipping'
import CoolSection from '@/components/chemistry/Coolsection'

export default function Page(){ 
  return <section>
    <div className="flex justify-center items-center h-[80vh]">
      <h1 className="text-7xl font-bold">Introduction to image clip section</h1>
    </div>
    <Clipping />
    <div>
      Difficulties
      <ul>
        <li>Aligning the aniation with the "end position"</li>
        <li>If using 2 images, perfectly aligning.</li>
        <li>Calculating the changes in size betweeen start and end</li>
        <li>Making the component not restrict the following section</li>
      </ul>
    </div>
    <div style={{paddingTop: '150vh'}}/>
    <CoolSection />
  </section>
}