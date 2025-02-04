"use client";
import axios from "axios";
import useSWR from "swr";
import homeIcon from "@/public/images/root/home.svg";
import Image from "next/image";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import call from "@/public/images/root/call.svg";
import wp from "@/public/images/root/wp.svg";
import profileAlt from "@/public/images/root/male-face.jpg";
import { useState } from "react";
import ListingCard from "@/components/listing/ListingCard";
import Swal from "sweetalert2";

const fetcher = (url) => axios.get(url).then((res) => res.data);
const AgentDetails = ({ params }) => {
  const [showAllAbout, setShowAllAbout] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openInquiry, setOpenInquiry] = useState(false);

  const { data: agent = [] } = useSWR(`/api/users?id=${params.id}`, fetcher);

  const { data: properties = [] } = useSWR(
    `/api/offplans?agent=${agent.email}`,
    fetcher
  );

  setTimeout(() => {
    setLoading(false);
  }, 1000);

  //   handle inquiry
  async function handleInquiry(event) {
    const id = agent._id;
    event.preventDefault();
    const name = event.target.name.value;
    const phone = event.target.phone.value;
    const email = event.target.email.value;

    const dataForBackend = { agent: id, name, email, mobile: phone };

    try {
      const serverResponse = await axios.post(
        `/api/agent/inquiry`,
        dataForBackend
      );

      if (serverResponse.data.success) {
        Swal.fire({
          icon: "success",
          title: "Message sent successfully",
          text: `Dear ${name}, Thank you for your interest. ${agent.name} will contact you shortly.`,
        });

        event.target.reset();
        setOpenInquiry(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (loading) {
    return (
      <>
        <div className="w-[90%] mx-auto my-10 animate-pulse bg-transparent hidden md:flex justify-between  items-center gap-6 p-36 rounded-md shadow-xl ">
          {/* User profile  Skeleton */}
          <div className="mt-8 w-full flex  flex-col justify-center">
            <div className="w-[60%] rounded-lg bg-[#1f2123] h-7 mb-5"></div>
            <div className="w-[100%] rounded-lg bg-[#1f2123] h-5 mb-3"></div>
            <div className="w-[40%] rounded-lg bg-[#1f2123] h-[13px] mb-3"></div>
            <div className="w-[80%] rounded-lg bg-[#1f2123] h-5 mb-3"></div>
            <div className="w-[40%] rounded-lg bg-[#1f2123] h-3 mb-3"></div>
            <div className="w-[20%] rounded-lg bg-[#1f2123] h-2 mb-3"></div>
            <div className="w-[70%] rounded-lg bg-[#1f2123] h-1 mb-3"></div>
            <div className="w-[30%] rounded-lg bg-[#1f2123] h-4 mb-3"></div>
          </div>

          {/* user post skeleton */}
          <div className=" flex ">
            <div className="w-96 h-96 rounded-lg bg-[#1f2123] animate-pulse"></div>
          </div>
        </div>

        <div className=" min-h-screen flex justify-center items-center">
          <div className="w-20 h-20 md:hidden border-l-2 border-green-500 rounded-full flex justify-center items-center animate-[spin_1.8s_linear_infinite]">
            <div className="w-16 h-16  border-b-2 border-indigo-500 rounded-full flex justify-center items-center animate-[spin_1.8s_linear_infinite]">
              <div className="w-10 h-10  border-r-2  border-sky-500 rounded-full animate-[spin_1.8s_linear_infinite]"></div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="min-h-screen">
        {/* Route Definition */}
        <div className="md:px-16 lg:px-20 mt-10 hidden md:block">
          <div className="flex items-center gap-2">
            <Link href={"/"}>
              <Image src={homeIcon} alt="home icon" />
            </Link>
            <Link href={"/agents"} className="hover:underline">
              Agents
            </Link>
            <IoIosArrowForward />
            <Link href={`/agents/${agent._id}`}>
              <p className="hover:cursor-pointer hover:underline">
                {agent?.name}
              </p>
            </Link>
          </div>
        </div>

        <div className="md:mx-36 md:mt-20">
          {/* hero */}
          <div
            className={`md:flex md:gap-20 p-5 ${
              openInquiry && "blur-sm opacity-70"
            }`}
          >
            <div className="w-[70%] hidden md:block">
              <div className="border-b border-[#e4b5499e] pb-8">
                <h1 className="text-3xl">{agent?.name}</h1>
                <h4 className="text-xl text-[#E4B649]">{agent?.designation}</h4>
              </div>
              <div className="mt-10">
                <div className="flex gap-60">
                  <p className="text-[#E4B649]">RERA: </p>
                  <p>{agent?.reraID} </p>
                </div>

                <div className="flex gap-48 mt-8">
                  <p className="text-[#E4B649]">Specialized: </p>
                  <p>{agent?.specializes} </p>
                </div>

                <div className="flex gap-48 mt-8">
                  <p className="text-[#E4B649]">Language: </p>
                  <p>{agent?.languagesSpeak} </p>
                </div>
              </div>

              <div className="flex mt-10 gap-10">
                <Link href={`tel:${agent?.wpNum}`}>
                  {" "}
                  <div className="flex items-center hover:scale-105 transition-all gap-3 border border-[#e4b5499e] px-2 py-1 rounded-3xl">
                    <Image src={call} alt="Phone Icon" />
                    <p>Call Now</p>
                  </div>
                </Link>

                <button
                  onClick={() => setOpenInquiry(true)}
                  className="flex items-center hover:scale-105 transition-all border-[#e4b5499e] gap-3 border px-3 py-1 rounded-3xl"
                >
                  <p>Inquiry</p>
                </button>
                <Link href={`https://wa.me/${agent?.wpNum}`}>
                  <div className="flex items-center hover:scale-105 transition-all gap-3 px-2 py-1 rounded-3xl">
                    <Image src={wp} alt="Phone Icon" />
                    <p>
                      Inquiry on{" "}
                      <span className="text-[#e4b549]">WhatsApp</span>{" "}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
            <div className="w-full md:w-[30%] ">
              <Image
                src={agent.photo ? agent.photo : profileAlt}
                height={120}
                width={150}
                alt="Agent Picture"
                className="w-full"
              />
            </div>
            <div className="mt-3 border-b md:hidden border-[#e4b5499e]">
              <h1 className="text-3xl">{agent?.name}</h1>
              <h4 className="text-xl text-[#E4B649]">{agent?.designation}</h4>
            </div>
          </div>
        </div>

        {/* inquiry */}

        {openInquiry && (
          <div className="w-full absolute top-4 md:top-36 lg:top-52 md:-left-[5px] lg:-left-[70px] z-50 rounded px-5 ">
            <div
              className="md:w-[80%] lg:w-[60%] mx-auto flex justify-end font-semibold"
              onClick={() => setOpenInquiry(false)}
            >
              <span className="cursor-pointer ">Close</span>
            </div>
            <div className="md:w-[80%] lg:w-[60%] mx-auto md:h-48 pt-4 pb-8 lg:py-16 bg-[#000] rounded">
              <h1 className="text-xl md:text-2xl text-center pt-3">
                Get call back for inquiry
              </h1>
              <form onSubmit={handleInquiry} className="px-10 mt-4">
                <div className="md:flex gap-4 space-y-3 md:space-y-0">
                  <input
                    type="text"
                    name="name"
                    id=""
                    placeholder="Name"
                    className="w-full bg-transparent py-2 px-4 border border-[#E4B649] rounded-3xl"
                    required
                  />

                  <input
                    type="number"
                    name="phone"
                    id=""
                    placeholder="Mobile"
                    className="w-full bg-transparent py-2 px-4 border border-[#E4B649] rounded-3xl"
                    required
                  />

                  <input
                    type="text"
                    name="email"
                    id=""
                    placeholder="Email"
                    className="w-full bg-transparent py-2 px-4 border border-[#E4B649] rounded-3xl"
                    required
                  />
                </div>
                <div className="flex w-full justify-center mt-4">
                  <button
                    type="submit"
                    className="py-2 w-full md:w-fit px-3 border border-[#E4B649] text-xl transition-all rounded-3xl hover:bg-[#625129]"
                  >
                    Send Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {agent?.about && (
          <div className="md:mx-36 md:mt-12 p-5">
            <h3 className="text-xl text-[#E4B649] font-semibold mb-2">
              About Me
            </h3>
            <p className="md:hidden">
              {showAllAbout ? agent?.about : agent?.about?.slice(0, 100)}{" "}
              <span
                className="text-[#E4B649] underline"
                onClick={() => setShowAllAbout(!showAllAbout)}
              >
                {showAllAbout ? " Show less" : "Read More..."}
              </span>
            </p>
            <p className="hidden md:block">{agent?.about}</p>
          </div>
        )}

        {/* Agent properties */}
        <div className="md:mx-36 md:mt-12 p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 py-4">
            {properties.map((item) => (
              <ListingCard key={item._id} item={item} status={item.status} />
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default AgentDetails;
