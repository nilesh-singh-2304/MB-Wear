'use client'
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import { FaTshirt } from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";
import { BiSolidOffer } from "react-icons/bi";
import { HiCurrencyRupee } from "react-icons/hi2";
import homep from "../photos/Microbird M.png";
import homep3 from "../photos/hompe3.png";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AOS from "aos"
import "aos/dist/aos.css"
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter()
  const [user, setuser] = useState<Boolean>()
  useEffect(() => {
    AOS.init({});
    if(localStorage.getItem('token')){
      setuser(true)
    }
  }, [])
  return (
    <>
      <Head>
        <title>MBwear.com</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="../public" />
      </Head>
      <div data-theme="dark">
        <div className="min-h-screen">
          <div className="pt-20 flex hidden sm:flex pt-40">
            <div className="w-1/2 flex flex-col justify-center items-center">
              <div data-aos="fade-down"  className="pl-20 font-bold text-5xl">
                Elevate Your Active Lifestyle with{" "}
                <span className="text-green-500">Precision</span> and{" "}
                <span className="text-orange-400">Style</span>
              </div>
              <div data-aos="zoom-in" data-aos-delay="350" className="stats shadow pt-7">
                <div className="stat">
                  <div className="stat-figure text-secondary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block h-8 w-8 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                  <div className="stat-title">Orders</div>
                  <div className="stat-value">31K</div>
                  <div className="stat-desc">Jan 1st - Feb 1st</div>
                </div>

                <div className="stat">
                  <div className="stat-figure text-secondary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block h-8 w-8 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                      ></path>
                    </svg>
                  </div>
                  <div className="stat-title">New Users</div>
                  <div className="stat-value">4,200</div>
                  <div className="stat-desc">↗︎ 400 (22%)</div>
                </div>

                <div className="stat">
                  <div className="stat-figure text-secondary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block h-8 w-8 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                      ></path>
                    </svg>
                  </div>
                  <div className="stat-title">New Registers</div>
                  <div className="stat-value">1,200</div>
                  <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>
              </div>
              <div data-aos="fade-up" className="mockup-browser bg-base-300 mt-5 border">
                <div className="mockup-browser-toolbar">
                  <div className="input">https://mbwear.com</div>
                </div>
                <div className="bg-base-200 flex  justify-center px-4 py-16">
                  <div className="flex-col">
                  <div className="mockup-code">
                    <pre data-prefix="$">
                      <code>Opening MB wear...</code>
                    </pre>
                    <pre data-prefix=">" className="text-warning">
                      <code>Selecting Faishon Wears ..</code>
                    </pre>
                    <pre data-prefix=">" className="text-success">
                      <code>Order Placed !</code>
                    </pre>
                  </div>
                  {!user && < div className="flex mx-20 mt-3">
                  <Link href='/login'> <button className="btn btn-sm mr-2 btn-accent">Login</button></Link>
                  <Link href='/signup'> <button className="btn btn-sm ml-2 btn-secondary">Signup</button></Link>
                  </div>}
                  </div>
                </div>
                
              </div>
            </div>
            <div data-aos="fade-left" data-aos-delay="300" className="w-1/2 flex items-center justify-center py-20 mb-10">
              <Image src={homep3} alt="" height={800} width={800} />
            </div>
          </div>

          <div className=" py-6 sm:py-8 lg:py-12">
            <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
              <div className="mb-10 md:mb-16">
                <h2 className="mb-4 text-center text-2xl pt-14 sm:pt-0 font-bold text-white md:mb-6 lg:text-4xl">
                  Our Collections
                </h2>
              </div>

              <div  className="grid gap-6 sm:grid-cols-2">
                <Link
                data-aos="fade-up"
                  href="tshirt"
                  className="group relative flex h-80 items-end overflow-hidden rounded-lg bg-gray-100 p-4 shadow-lg"
                >
                  <img
                    src="https://img.freepik.com/premium-photo/multi-colored-garment-collection-hanging-modern-boutique-generated-by-ai_188544-20873.jpg?w=1060"
                    loading="lazy"
                    alt="Photo by Fakurian Design"
                    className="absolute inset-0 h-full w-full object-cover object-top transition duration-200 group-hover:scale-110"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>

                  <div className="relative flex flex-col">
                    <span className="text-gray-300">Stylish</span>
                    <span className="text-lg font-semibold text-white lg:text-xl">
                      Tshirts
                    </span>
                  </div>
                </Link>

                <Link
                data-aos="fade-up"
                  href="/hoodies"
                  className="group relative flex h-80 items-end overflow-hidden rounded-lg bg-gray-100 p-4 shadow-lg"
                >
                  <img
                    src="https://img.freepik.com/premium-photo/fashionable-men-clothing-collection-modern-boutique-generated-by-ai_188544-41404.jpg?w=1060"
                    loading="lazy"
                    alt="Photo by Fakurian Design"
                    className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>

                  <div className="relative flex flex-col">
                    <span className="text-gray-300">Dashing</span>
                    <span className="text-lg font-semibold text-white lg:text-xl">
                      Hoodies
                    </span>
                  </div>
                </Link>
                <Link
                data-aos="fade-up"
                  href="/mugs"
                  className="group relative flex h-80 items-end overflow-hidden rounded-lg bg-gray-100 p-4 shadow-lg"
                >
                  <img
                    src="https://img.freepik.com/premium-psd/white-mug-blue-background-mockup_125540-1421.jpg?w=1060"
                    loading="lazy"
                    alt="Photo by Fakurian Design"
                    className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>

                  <div className="relative flex flex-col">
                    <span className="text-gray-300">Modern</span>
                    <span className="text-lg font-semibold text-white lg:text-xl">
                      Mugs
                    </span>
                  </div>
                </Link>
                <Link
                data-aos="fade-up"
                  href="/stickers"
                  className="group relative flex h-80 items-end overflow-hidden rounded-lg bg-gray-100 p-4 shadow-lg"
                >
                  <img
                    src="https://img.freepik.com/free-vector/variety-halloween-labels_23-2147523440.jpg?t=st=1719501135~exp=1719504735~hmac=dc829286762d6e67ce683e85b5f39f77f12a65231191454da2579cdb31b67ed4&w=740"
                    loading="lazy"
                    alt="Photo by Fakurian Design"
                    className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>

                  <div className="relative flex flex-col">
                    <span className="text-gray-300">Funky</span>
                    <span className="text-lg font-semibold text-white lg:text-xl">
                      Stickers
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className=" py-6 sm:py-8 lg:py-12">
            <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
              <div className="mb-10 md:mb-16">
                <h2 className="mb-4 text-center text-2xl pt-14 sm:pt-0 font-bold text-white md:mb-6 lg:text-4xl">
                  Upcoming Stock
                </h2>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <Link
                data-aos="fade-up"
                  href="/"
                  className="group relative flex h-80 items-end overflow-hidden rounded-lg bg-gray-100 p-4 shadow-lg"
                >
                  <img
                    src="https://img.freepik.com/free-photo/still-life-say-no-fast-fashion_23-2149669600.jpg?t=st=1719519602~exp=1719523202~hmac=4c75695f1d527b2029bac9ec69b80d25049a651410463305558f3755dca26687&w=1060"
                    loading="lazy"
                    alt="Photo by Fakurian Design"
                    className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>

                  <div className="relative flex flex-col">
                    <span className="text-gray-300">Stylish</span>
                    <span className="text-lg font-semibold text-white lg:text-xl">
                      Shoes
                    </span>
                  </div>
                </Link>

                <Link
                data-aos="fade-up"
                  href="/"
                  className="group relative flex h-80 items-end overflow-hidden rounded-lg bg-gray-100 p-4 shadow-lg"
                >
                  <img
                    src="https://img.freepik.com/free-photo/high-angle-school-supplies-table-composition_23-2148939214.jpg?t=st=1719519732~exp=1719523332~hmac=f1d5f8c153b85c77832f3e3afb1bbdcfd0df83f5cc0295667c7edcad12056231&w=360"
                    loading="lazy"
                    alt="Photo by Fakurian Design"
                    className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>

                  <div className="relative flex flex-col">
                    <span className="text-gray-300">Modern</span>
                    <span className="text-lg font-semibold text-white lg:text-xl">
                      Watches
                    </span>
                  </div>
                </Link>
                <Link
                data-aos="fade-up"
                  href="/"
                  className="group relative flex h-80 items-end overflow-hidden rounded-lg bg-gray-100 p-4 shadow-lg"
                >
                  <img
                    src="https://img.freepik.com/free-photo/stack-books-black-wooden-table_93675-135415.jpg?t=st=1719519925~exp=1719523525~hmac=dc3f926093c9fa553cf324a3e70d41b636682138745834bfb3cd8b3140938c50&w=1060"
                    loading="lazy"
                    alt="Photo by Fakurian Design"
                    className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>

                  <div className="relative flex flex-col">
                    <span className="text-gray-300">Study</span>
                    <span className="text-lg font-semibold text-white lg:text-xl">
                      Material
                    </span>
                  </div>
                </Link>
                <Link
                data-aos="fade-up"
                  href="/stickers"
                  className="group relative flex h-80 items-end overflow-hidden rounded-lg bg-gray-100 p-4 shadow-lg"
                >
                  <img
                    src="https://img.freepik.com/free-photo/top-view-composition-with-neatly-arranged-organized-sport-items_23-2150275237.jpg?t=st=1719520217~exp=1719523817~hmac=5985688b50c516e34ee25ae13a94ae4e60245d8f76de5de2a33e22fa4eb60283&w=1060"
                    loading="lazy"
                    alt="Photo by Fakurian Design"
                    className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>

                  <div className="relative flex flex-col">
                    <span className="text-gray-300">Sports</span>
                    <span className="text-lg font-semibold text-white lg:text-xl">
                      Accessories
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <div className=" px-4 py-16 mb-8 font-[sans-serif] text-white">
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-x-6 gap-y-12 max-w-6xl mx-auto">
      <div data-aos="fade-right" className="text-center flex-col items-center justify-center border-2 border-gray-600 p-4 rounded-md">
          <div  className="pt-5">
          <FaTshirt className="ml-32 sm:ml-24 pt-2 text-5xl" />
          <p className="text-gray-300 font-semibold mt-4">Unique Designs</p>
          </div>
        </div>
        <div data-aos="fade-right" className="text-center flex-col items-center justify-center border-2 border-gray-600 p-4 rounded-md">
          <div className="pt-5">
          <FaTruckFast className="ml-32 sm:ml-24 pt-2 text-5xl" />
          <p className="text-gray-300 font-semibold mt-4">Free & Fast Shipping</p>
          </div>
        </div>
        <div data-aos="fade-left" className="text-center flex-col items-center justify-center border-2 border-gray-600 p-4 rounded-md">
          <div className="pt-5">
          <BiSolidOffer  className="ml-32 sm:ml-24 pt-2 text-5xl" />
          <p className="text-gray-300 font-semibold mt-4">Exciting Offers</p>
          </div>
        </div>
        <div data-aos="fade-left" className="text-center flex-col items-center justify-center border-2 border-gray-600 p-4 rounded-md">
          <div className="pt-5">
          <HiCurrencyRupee className="ml-32 sm:ml-24 pt-2 text-5xl" />
          <p className="text-gray-300 font-semibold mt-4">Smooth Payment Process</p>
          </div>
        </div>
      </div>
    </div>
        </div>
      </div>
    </>
  );
}
