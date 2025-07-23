import f1 from "../pics/set1/f1.jpeg";
import f2 from "../pics/set1/f2.jpeg";
import fotopro from "../pics/fotopro.jpeg"
import fotopro2 from "../pics/fotopro2.jpeg"
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import lorangvid from "../pics/lorangvid.mp4";

export default function Banner() {
    return (
        <div className="absolute flex items-center justify-center right-[20px] md:right-[20px] top-0 h-[calc(100vh-51px)] w-[calc(33vw-20px)] md:w-[calc(33vw-20px)] z-40" style={{ borderRadius: '0.5rem', overflow: 'hidden' }}>
            <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 3000 }}
                pagination={{ clickable: true }}
                loop={true}
                className="w-full h-full"
            >
                <SwiperSlide>
                    <video
                        src={lorangvid}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full"
                        style={{ height: '100%', objectFit: 'cover', borderRadius: '0.5rem' }}
                    />
                </SwiperSlide>
            </Swiper>
        </div>
    );
}