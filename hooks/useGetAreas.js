import axios from "axios";
import useSWR from "swr";

const useGetAreas = () => {
    const fetcher = url => axios.get(url).then(res=> res.data);
    const {data = []} = useSWR("/api/admin/items/area", fetcher);


    return data;
};

export default useGetAreas;