import { writeContract } from "wagmi/actions";
import { TOKENRAKYAT_ADDRESS } from "../data/address";
import token_rakyat from "../builds/token_rakyat.json";
import { config } from "../App";

export async function delegate(hash) {
  try {
    const result = await writeContract(config, {
      abi: token_rakyat,
      address: TOKENRAKYAT_ADDRESS,
      functionName: "delegate",
      args: [hash],
    });
    return result;
  } catch (error) {
    console.error(error);
    return;
  }
}
