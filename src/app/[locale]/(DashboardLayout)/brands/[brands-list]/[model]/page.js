'use client'
import CustomBreadCrumd from "@/app/[locale]/(DashboardLayout)/components/reuseable/CustomBreadCrums";
import useProductStore from "@/store/productStrore";
import Link from "next/link";
import { parseBreadcrumbs } from "@/app/utils/utils";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Tooltip } from "antd";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useRef, useEffect } from "react";
import { CloseCircleOutlined } from "@ant-design/icons";
function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}

            style={{ ...style, display: "block", position: "absolute", background: "#a58e8e",bottom:"5px", right:'-5px',borderRadius:"50%" }}
            onClick={onClick}
        />
    );
}
function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", position: "absolute", background: "#a58e8e", left: '-5px', zIndex: 1 ,borderRadius:"50%"}}
            onClick={onClick}
        />
    );
}
const DetailPage = () => {
    const t = useTranslations();
    const pathname = usePathname();
    const breadcrumbs = parseBreadcrumbs(pathname);
    const { count, items } = useProductStore();
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const sliderRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const settings = {
        dots: false,
        nextArrow:<SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: selectedImageIndex,
        afterChange: (current) => setSelectedImageIndex(current),
        
    };
    const settings1 = {
        dots: false,
        nextArrow:false,
        prevArrow: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: selectedImageIndex,
        afterChange: (current) => setSelectedImageIndex(current),
        
    };

    const handleThumbnailClick = (index) => {
        setSelectedImageIndex(index);
        sliderRef.current.slickGoTo(index);
    };

    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.slickGoTo(selectedImageIndex);
        }
    }, [selectedImageIndex]);

    const handleSliderClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    console.log(items);
    return (
        <>
            <CustomBreadCrumd breadcrumbs={breadcrumbs} />
            <div className="sm:flex gap-3 w-full  relative">
                <div className="sm:w-1/2">
                    <div>
                        {items.gallery.length > 1 ?
                            <Slider ref={sliderRef} {...settings1}  >
                                {items.gallery.map((item, index) => (
                                    <div key={index} onClick={handleSliderClick}>
                                        <img src={item.original} alt="gallery" className="lazy h-auto w-[500px] m-auto object-contain" />
                                    </div>
                                ))}
                            </Slider>
                            :
                            <img src={items.gallery[0].original} alt="gallery" className="lazy h-auto w-[500px] m-auto object-contain" />
                        }
                        <div className="flex justify-center mt-4">

                            {items.gallery.length > 1 ?
                                items.gallery.map((item, index) => (
                                    <div
                                        key={index}
                                        className="mx-2 cursor-pointer"

                                        onClick={() => handleThumbnailClick(index)}
                                    >
                                        <img src={item.original} alt="thumbnail" width={80} height={120} />
                                    </div>
                                )) :
                                <img src={items.gallery[0].original} alt="logo" width={80} height={120} />
                            }
                        </div>
                    </div>
                </div>
                <div className="mt-2 sm:mt-0 flex flex-col gap-2">
                    <Tooltip title={`${items.brand} ${items.slug} ${items.description}`} placement="bottom">
                        <h3 className="bold font-semibold text-xl">{items.brand} {items.slug}</h3>
                    </Tooltip>
                    <hr className="w-[50px] h-2 bg-blue-500 rounded" style={{ opacity: 1 }}></hr>
                    <p>Ex-Showroom Price</p>
                    <p className="font-semibold text-xl">₹{items.min_price} - ₹{items.max_price} {t(`Lakh`)}* <mark className="text-sm">get on Road price</mark></p>
                    <p>Product-Type: {items.product_type}</p>
                    <p>No's of available: {items.quantity}</p>
                    <p>Selling Price: ₹{items.sale_price} Lakh</p>
                </div>
            </div>
                {isModalOpen &&
                    <div className="absolute top-0 w-full bg-slate-50 flex h-full  justify-between opacity-100 bg-transparent  items-center  " >
                    <div className="justify-center m-auto  sm:w-1/2 w-full sm:h-1/2 h-full p-0 rounded-md items-center ">
                        <CloseCircleOutlined className="float-end items-end   p-2 text-end hover:text-gray-500 font-bold" onClick={()=>{setIsModalOpen(!isModalOpen)}} />
                        <div className="w-full p-2 flex flex-col bg-slate-50">
                            
                            <Slider ref={sliderRef} {...settings}  >
                                {items.gallery.map((item, index) => (
                                    <div key={index} onClick={handleSliderClick}>
                                        <img src={item.original} alt="gallery" className="h-[370px] w-screen m-auto object-contain" />
                                    </div>
                                ))}
                            </Slider>
                            <div className="flex">
                            {items.gallery.map((item, index) => (
                                    <div
                                        key={index}
                                        className="mx-2 cursor-pointer"

                                        onClick={() => handleThumbnailClick(index)}
                                    >
                                        <img src={item.original} alt="thumbnail" width={80} height={120} />
                                      
                                    </div>
                                ))
                            }
                              
                            </div>
                        </div>
                    </div>
                </div>
                }
        </>
    );
}

export default DetailPage;
