import Clipping from '@/components/chemistry/Clipping'
import CoolSection from '@/components/chemistry/Coolsection'
import ClippingWithScrollStop from '@/components/chemistry/ClippingWithScrollStop'

export default function Page(){ 
  return <section>
    <div className="flex justify-center items-center h-[80vh]">
      <h1 className="font-bold text-7xl">Introduction to image clip section</h1>
    </div>
    <Clipping />
    <div style={{paddingTop: '150vh'}} />
    <ClippingWithScrollStop />
    <div style={{paddingTop: '150vh'}}/>
    <CoolSection />
  </section>
}