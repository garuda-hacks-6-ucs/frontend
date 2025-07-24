import axios from "axios";

export const BACKEND_API = import.meta.env.VITE_BACKEND_API;

export async function getGovernmentProposal() {
  try {
    const res = await axios.get(`${BACKEND_API}/projects`);
    return res.data;
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function getVendorProposal() {
  try {
    const res = await axios.get(`${BACKEND_API}/proposals`);
    return res.data;
  } catch (error) {
    console.error(error);
    return;
  }
}
