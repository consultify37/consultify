import Axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Multumire() {
  Cookies.get("recupereaza_parola");

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [repass, setRepass] = useState("");
  const resetPass = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    let user = Cookies.get("user");
    console.log(user);
    Axios.get("https://api.inspiredconsulting.ro/users/recupereaza_parola", {
      params: {
        parola: pass,
        confirma_parola: repass,
        vkey: user,
      },
    })
      .then(function (response) {
        console.log(response);
        toast.success("Parola ta a fost schimbată cu succes!");
        setTimeout(() => {
          // window.location.href='/';
        }, 3000);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };
  return (
    <form
      onSubmit={resetPass}
      className="my-40 max-w-[500px] mx-6 sm:mx-auto rounded-3xl border-[2px] border-[#F2F4FF] flex flex-col items-center"
    >
      <h1 className="lg:text-2xl text-xl text-center border-[#F2F4FF] w-full py-6 border-b-2 mb-6 text-[#260056] font-semibold">
        Resetează-ți parola
      </h1>
      <input
        type="password"
        className="border-2 w-full my-4 border-[#8717F8] p-3 max-w-[370px] rounded-[28.5px]"
        placeholder="parola"
        required
        name="password"
        onChange={(e) => setPass(e.target.value)}
      />
      <input
        type="password"
        className="border-2 w-full my-4 border-[#8717F8] p-3 max-w-[370px] rounded-[28.5px]"
        placeholder="confirma parola"
        name="confirma-parola"
        onChange={(e) => setRepass(e.target.value)}
      />
      <button className="py-4 w-full bg-[#8717F8] mt-4 mb-24 h-auto text-white rounded-[28px] max-w-[370px] font-medium px-14 text-center text-sm md:text-[16px]">
        resetează parola
      </button>
    </form>
  );
}
