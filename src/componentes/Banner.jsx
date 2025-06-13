import f1 from "../pics/set1/f1.jpeg";
import f2 from "../pics/set1/f2.jpeg";
import fotopro from "../pics/fotopro.jpeg"
import fotopro2 from "../pics/fotopro2.jpeg"
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Banner() {
    return (
        <div className="absolute flex w-20 overflow-hidden rounded-lg shadow-lg carousel rounded-box md:w-1/4 md:right-15 md:top-12">
            <Swiper
                modules={[Autoplay,  Pagination]}
                autoplay={{ delay: 3000 }}
                pagination={{ clickable: true }}
                loop={true}
                className="w-full"
            >
                <SwiperSlide>
                    <img src={f1} className="w-full " alt="foto" />
                </SwiperSlide>
                
            </Swiper>
        </div>
    );
}