import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const inputState = atom({
    key: "input",
    default: "",
    effects_UNSTABLE: [persistAtom],
})

export const pageState = atom({
    key: "currentPage",
    default: 1,
    effects_UNSTABLE: [persistAtom],
})