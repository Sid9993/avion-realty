"use client";
import Navbar from "@/components/dashboard/Navbar";
import useAgents from "@/hooks/useAgents";
import useGetAreas from "@/hooks/useGetAreas";
import useGetDevelopers from "@/hooks/useGetDevelopers";
import useGetProperties from "@/hooks/useGetProperties";
import useUser from "@/hooks/useUser";

const AddOffPlan = () => {
  const properties = useGetProperties();
  const areas = useGetAreas();
  const developers = useGetDevelopers();
  const agents = useAgents();
  const user = useUser();
  console.log(user);
  return (
    <div>
      <Navbar title="Add Off-Plan Property" />
      {/* add off plan form */}
      <form className="mt-16 space-y-8 mr-8 ">
        <div className="flex justify-between w-full gap-12 ">
          {/* title */}
          <div className="w-3/5">
            <label>Title</label>
            <br />
            <input
              type="text"
              name="title"
              placeholder="write listing title"
              className="bg-black text-xs p-2 rounded-md mt-1 w-full border border-dotted border-gray-500 "
            />
          </div>

          {/* starting price AED */}
          <div className="w-2/5">
            <label>Starting Price AED</label>
            <br />
            <input
              type="number"
              name="price"
              placeholder="write property price"
              className="bg-black text-xs p-2 rounded-md mt-1 w-full border border-dotted border-gray-500 "
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-12 ">
          {/* property type */}
          <div>
            <label>Property Type</label>
            <br />
            <select
              name="propertyType"
              className="bg-black text-xs p-3 rounded-md mt-1 w-full border border-dotted border-gray-500 my-2"
            >
              <option value="" disabled selected>
                Select Property type
              </option>
              {properties.map((property) => (
                <option key={property._id} value={property.propertyName}>
                  {property.propertyName}
                </option>
              ))}
            </select>
          </div>

          {/* area */}
          <div>
            <label>Area</label>
            <br />
            <select
              name="area"
              className="bg-black text-xs p-3 rounded-md mt-1 w-full border border-dotted border-gray-500 my-2"
            >
              <option value="" disabled selected>
                Select Property location
              </option>
              {areas.map((area) => (
                <option key={area._id} value={area.itemName}>
                  {area.itemName}
                </option>
              ))}
            </select>
          </div>

          {/* developer */}
          <div>
            <label>Developer</label>
            <br />
            <select
              name="developer"
              className="bg-black text-xs p-3 rounded-md mt-1 w-full border border-dotted border-gray-500 my-2"
            >
              <option value="" disabled selected>
                Developer name
              </option>
              {developers.map((developer) => (
                <option key={developer._id} value={developer.devName}>
                  {developer.devName}
                </option>
              ))}
            </select>
          </div>

          {/* bedroom */}
          <div>
            <label>Bedrooms</label>
            <br />
            <div className="bg-black text-xs p-2 rounded-md mt-1 w-full border border-dotted border-gray-500 flex justify-between">
              <span>BR</span>
              <input
                type="number"
                min="1"
                max="7"
                defaultValue="1"
                name="bedroom"
                className="bg-transparent outline-none w-12"
              />
            </div>
          </div>

          {/* Starting Area Sq.ft. */}
          <div>
            <label>Starting Area Sq.ft.</label>
            <br />
            <input
              type="number"
              name="areaSqFt"
              placeholder="write property area (sq.ft.)"
              className="bg-black text-xs p-2 rounded-md mt-1 w-full border border-dotted border-gray-500 "
            />
          </div>

          {/* Estimated Completion */}
          <div>
            <label>Estimated Completion</label>
            <br />
            <input
              type="text"
              name="completion"
              placeholder="write completion"
              className="bg-black text-xs p-2 rounded-md mt-1 w-full border border-dotted border-gray-500 "
            />
          </div>

          {/* Views */}
          <div>
            <label>Views</label>
            <br />
            <input
              type="text"
              name="views"
              placeholder="Eg. (Sea View)"
              className="bg-black text-xs p-2 rounded-md mt-1 w-full border border-dotted border-gray-500 "
            />
          </div>

          {/* only for admin role */}
          {user.data.role === "admin" && (
            <div>
              <label>Select Agent</label>
              <br />
              <select
                name="agent"
                placeholder="Select agent"
                className="bg-black text-xs p-2 rounded-md mt-1 w-full border border-dotted border-gray-500 "
              >
                <option value="" disabled selected>
                  Select agent
                </option>
                {agents.map((agent) => (
                  <option key={agent._id} value={agent.email}>
                    {agent.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* <div className="flex justify-end mt-6">
          <input
            type="submit"
            value="Save Changes"
            className="bg-[#835C00] hover:cursor-pointer px-8 py-2 rounded-md"
          />
        </div> */}
      </form>
    </div>
  );
};

export default AddOffPlan;
