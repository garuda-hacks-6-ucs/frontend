import axios from "axios";

export const BACKEND_API = import.meta.env.VITE_BACKEND_API;

export async function getAIDescription(file) {
  try {
    const res = await axios.post(`${BACKEND_API}/ai/summarize-pdf`, {
      proposal_pdf: file,
    });
    return res.data;
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function getProfiles() {
  try {
    const res = await axios.get(`${BACKEND_API}/profiles`);
    return res.data;
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function getGovernmentProposal() {
  try {
    const res = await axios.get(`${BACKEND_API}/projects`);
    return res.data;
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function getVendorProposal(id) {
  try {
    const res = await axios.get(`${BACKEND_API}/projects/${id}/proposals`);
    return res.data;
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function getVendorProfile(wallet) {
  try {
    const res = await axios.get(`${BACKEND_API}/profiles/${wallet}`);
    return res.data;
  } catch (error) {
    console.error(error);
    return;
  }
}
