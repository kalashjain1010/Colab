// import Image from "next/image";
// import Container from "@/components/Container";
// import { TiTick } from "react-icons/ti";
// import Heading from "@/components/Heading";
// import Button from "@/components/Button";
// import { useRouter } from "next/navigation";
import HomeClient from "./HomeClient";

export default function Home() {
  return (
    // <Container>
    //   <div className="flex items-center justify-center h-full">
    //     <div
    //       className="
    //   grid grid-cols-1 md:grid-cols-2 gap-x-2"
    //     >
    //       <div className="flex flex-col gap-y-3 p-5 items-start justify-center">
    //         <Heading>
    //           <div className="text-5xl font-semibold mb-10">
    //             Discover <span className="text-blue-700">infinite</span>
    //             <br /> possibilities
    //           </div>
    //         </Heading>
    //         <Heading icon={TiTick}>
    //           <div className="text-xl mb-2">
    //             Connect with talented professionals
    //           </div>
    //         </Heading>
    //         <Heading icon={TiTick}>
    //           <div className="text-xl mb-2">
    //             Collaborate on meaningful projects
    //           </div>
    //         </Heading>
    //         <Heading icon={TiTick}>
    //           <div className="text-xl mb-2">Create a successful future</div>
    //         </Heading>
    //         <Button className="w-fit text-white bg-blue-700 mt-3">
    //           Get Started
    //         </Button>
    //       </div>
    //       <div className="p-5">
    //         <Image
    //           className="shadow-lg shadow-slate-200"
    //           src="/images/Splash Image.svg"
    //           alt="splash image"
    //           width={600}
    //           height={500}
    //         />
    //       </div>
    //     </div>
    //   </div>
    // </Container>
    <HomeClient />
    
  );
}
