import Image from "next/image";
import { fetchCountries } from "@/lib/countries";
import LoginPage from "./login/page";

export default function Home() {
  console.log(fetchCountries)
  return (
  <div>
    <LoginPage/>
  </div>
  );
}
