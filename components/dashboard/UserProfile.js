import Image from "next/image";
import { useState } from "react";

import { FaUserCircle } from "react-icons/fa";
import { RiEditBoxFill } from "react-icons/ri";
import { PiKeyLight } from "react-icons/pi";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const UserProfile = ({ user }) => {
  const [editBio, setEditBio] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [bio, setBio] = useState('');
  const currentUser = user;

  const dataWithBio = { ...user, bio };


  async function handleChangeBio() {

    try {
      const serverResponse = await axios.put(`http://localhost:3000/api/users?email=${user?.email}`, dataWithBio);

      if (serverResponse.data.success) {
        setEditBio(false);

        toast('Bio Updated',
          {
            icon: '👏',
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          }
        );
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-[#161616] p-8 rounded-2xl ">
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
      <h2 className="text-2xl font-semibold">My Profile</h2>

      {/* profile */}
      <div className="my-8 flex items-center gap-4">
        <div className="w-16  rounded-full ">
          {currentUser?.image ? (
            <Image
              src={currentUser?.image}
              alt={currentUser?.name}
              className="rounded-full"
            />
          ) : (
            <FaUserCircle size={60} />
          )}
        </div>
        <div>
          <h2 className="text-xl font-semibold">{currentUser?.name}</h2>
          <p>Designation</p>
          {/* <input
            type="text"
            name="whatsApp"
            defaultValue={currentUser?.wpNum}
            placeholder="Write your whatsapp number"
            className="bg-black text-xs p-2 rounded-md mt-1 w-full border border-dotted"
          /> */}
        </div>
      </div>

      {/* bio */}
      <div>
        <div className="flex justify-between items-center my-1">
          <h3>Bio</h3>
          <button onClick={() => setEditBio(!editBio)}>
            <RiEditBoxFill />
          </button>
        </div>
        <div>
          <textarea
            onChange={(event) => setBio(event.target.value)}
            defaultValue={currentUser?.bio}
            disabled={!editBio}
            placeholder="Write your bio within 200 letters."
            className={`bg-black ${editBio && "border border-dotted"
              }  rounded-md text-xs w-full p-4`}
          />
          {editBio && <button className="flex justify-end w-full hover:underline" onClick={handleChangeBio}>Save</button>}
        </div>
      </div>

      {/* other information */}
      <div className="my-8 space-y-4 text-sm">
        <div className="space-y-1">
          <h3>Email Address</h3>
          <p className="text-xs bg-black p-2 rounded-md">
            {currentUser?.email || "admin@avionrealty.ae"}
          </p>
        </div>
        <div className="space-y-1">
          <h3>WhatsApp Number</h3>
          <p className="text-xs bg-black p-2 rounded-md">
            {currentUser?.wpNum || "+xxx xx xxx xxxx"}
          </p>
        </div>
        <div className="space-y-1">
          <h3>Languages Speak</h3>
          <p className="text-xs bg-black p-2 rounded-md">
            {currentUser?.languagesSpeak || "English"}
          </p>
        </div>
      </div>

      {/* change password */}
      <div className="text-center">
        <button
          onClick={() => setOpenModal(!openModal)}
          className="text-xs hover:underline text-[#FFD167]"
        >
          Need to Change Password?{" "}
        </button>

        {openModal && (
          <div className="bg-[#161616] p-12 w-1/3 rounded-lg shadow-md shadow-gray-500 absolute top-1/4 left-1/3 text-left">
            <h2 className="mb-6 text-xl font-semibold">
              Change Your Password Here
            </h2>
            <form className=" space-y-3 ">
              <div>
                <label>Old Password</label>
                <br />
                <div className="bg-black rounded-lg mt-1 w-full flex items-center gap-1 border border-dotted">
                  <PiKeyLight className="text-xl rotate-180 ml-2" />
                  <input
                    type="text"
                    name="oldPass"
                    placeholder="Old PassWord"
                    className="bg-black w-full p-2 outline-none"
                  />
                </div>
              </div>
              <div>
                <label>New Password</label>
                <br />
                <div className="bg-black rounded-lg mt-1 w-full flex items-center gap-1 border border-dotted">
                  <PiKeyLight className="text-xl rotate-180 ml-2" />
                  <input
                    type="text"
                    name="newPass"
                    placeholder="New PassWord"
                    className="bg-black w-full p-2 outline-none"
                  />
                </div>
              </div>
              <div>
                <label>Re-type New Password</label>
                <br />
                <div className="bg-black rounded-lg mt-1 w-full flex items-center gap-1 border border-dotted">
                  <PiKeyLight className="text-xl rotate-180 ml-2" />
                  <input
                    type="text"
                    name="re-typeNewwPaa"
                    placeholder="Re-type New Password"
                    className="bg-black w-full p-2 outline-none"
                  />
                </div>
              </div>
              <div className="flex justify-between pt-4">
                <button
                  onClick={() => setOpenModal(!openModal)}
                  className="bg-red-600 px-6 py-2 rounded-md font-semibold"
                >
                  Cancel
                </button>
                <input
                  type="submit"
                  value="Save Changes"
                  className="bg-[#835C00] px-8 py-2 rounded-md"
                />
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
